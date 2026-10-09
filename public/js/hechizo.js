/* ============================================================
   hechizo.js — revela quién está detrás del mago.

   El avatar de cada integrante es un mago ilustrado. Al tocar el botón
   suena un arpegio y la imagen se transforma en su retrato real.

   Cada perfil configura lo suyo desde el HTML, en el propio botón:
     data-real      imagen que se revela
     data-alt-real  texto alternativo de esa imagen
     data-volver    texto del botón una vez revelado
     data-acorde    las cuatro notas del hechizo, en hercios

   Así el mecanismo se escribe una sola vez y, aun así, el hechizo de
   cada mago suena distinto.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const boton = document.querySelector('.reveal-button');
  const marco = document.querySelector('#profile-img');
  if (!boton || !marco) return;

  const foto = marco.querySelector('img');
  const texto = boton.querySelector('.reveal-text');
  if (!foto) return;

  const imagen = { mago: foto.getAttribute('src'), real: boton.dataset.real };
  const alterno = { mago: foto.getAttribute('alt'), real: boton.dataset.altReal || '' };
  const rotulo = { mago: texto ? texto.innerHTML : '', real: boton.dataset.volver || 'Volver al personaje' };
  const tamanosMago = {
    srcset: foto.getAttribute('srcset'),
    sizes: foto.getAttribute('sizes')
  };
  let fotoRealLista;

  // La foto real no forma parte del primer render. Se descarga apenas termina
  // la carga inicial para que el destello no tenga que esperar a la red.
  function prepararFotoReal() {
    if (fotoRealLista) return fotoRealLista;

    const precarga = new Image();
    // Se solicita tras `load`, por lo que ya no compite con el avatar LCP.
    // Alta prioridad acorta la espera si el usuario revela enseguida la foto.
    if ('fetchPriority' in precarga) precarga.fetchPriority = 'high';
    fotoRealLista = new Promise(resolve => {
      precarga.onload = () => precarga.decode().catch(() => {}).finally(resolve);
      precarga.onerror = resolve;
      precarga.src = imagen.real;
    });
    return fotoRealLista;
  }

  window.addEventListener('load', prepararFotoReal, { once: true });

  function restaurarMago() {
    const temaOscuro = document.documentElement.dataset.theme === 'dark';

    if (tamanosMago.sizes) foto.sizes = tamanosMago.sizes;

    if (foto.dataset.srcsetLight && foto.dataset.srcsetDark) {
      foto.srcset = temaOscuro ? foto.dataset.srcsetDark : foto.dataset.srcsetLight;
    } else if (tamanosMago.srcset) {
      foto.srcset = tamanosMago.srcset;
    }

    foto.src = temaOscuro ? foto.dataset.srcDark : foto.dataset.srcLight;
    foto.dataset.showingReal = 'false';
  }

  // Do mayor por defecto; cada perfil pisa las notas con data-acorde.
  const acorde = (boton.dataset.acorde || '523.25,659.25,783.99,1046.50')
    .split(',')
    .map(Number)
    .filter(n => n > 0);

  /* El sonido se sintetiza con la Web Audio API: cuatro osciladores
     encadenados con 70 ms de diferencia, cada uno con su envolvente de
     volumen. No hay archivos de audio ni licencias de terceros. */
  function sonarHechizo() {
    const Audio = window.AudioContext || window.webkitAudioContext;
    if (!Audio) return;

    const ctx = new Audio();
    const inicio = ctx.currentTime;

    acorde.forEach((frecuencia, i) => {
      const osc = ctx.createOscillator();
      const volumen = ctx.createGain();
      const t = inicio + i * 0.07;

      osc.type = 'triangle';
      osc.frequency.value = frecuencia;
      volumen.gain.setValueAtTime(0, t);
      volumen.gain.linearRampToValueAtTime(0.16, t + 0.02);
      volumen.gain.exponentialRampToValueAtTime(0.0001, t + 0.9);

      osc.connect(volumen).connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.95);
    });

    setTimeout(() => ctx.close(), 1400);
  }

  function transformar(destino, eraMago) {
    sonarHechizo();
    marco.classList.remove('is-conjuring');
    void marco.offsetWidth;      // reinicia la animación si se toca dos veces seguidas
    marco.classList.add('is-conjuring');

    // El cambio ocurre en el pico del destello, con la imagen velada.
    setTimeout(() => {
      if (destino === 'real') {
        foto.dataset.showingReal = 'true';
        foto.removeAttribute('srcset');
        foto.removeAttribute('sizes');
        foto.src = imagen.real;
      } else {
        restaurarMago();
      }
      if (alterno[destino]) foto.alt = alterno[destino];
    }, 400);

    boton.setAttribute('aria-pressed', String(eraMago));
    if (texto) texto.innerHTML = rotulo[destino];
  }

  boton.addEventListener('click', () => {
    const eraMago = boton.getAttribute('aria-pressed') === 'false';
    const destino = eraMago ? 'real' : 'mago';

    if (destino === 'real') {
      boton.disabled = true;
      prepararFotoReal().finally(() => {
        boton.disabled = false;
        transformar(destino, eraMago);
      });
      return;
    }
    transformar(destino, eraMago);
  });

  marco.addEventListener('animationend', () => marco.classList.remove('is-conjuring'));
});
