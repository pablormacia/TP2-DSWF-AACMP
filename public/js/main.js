const menuButton = document.querySelector('.menu-button');
const mainNav = document.querySelector('.main-nav');
if (menuButton && mainNav) {
  menuButton.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });
  mainNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  }));
}

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));

/* Bitácora: al tocar una entrada, el diamante responde con un brillo breve.
   Se usa click (toque confirmado) para no reaccionar al arrastrar con el dedo;
   con mouse alcanza el :hover del CSS. */
document.querySelectorAll('.log-entry').forEach(entry => {
  let pointerType = 'mouse';
  let timer;
  entry.addEventListener('pointerdown', event => { pointerType = event.pointerType; });
  entry.addEventListener('click', () => {
    if (pointerType === 'mouse') return;
    clearTimeout(timer);
    entry.classList.add('is-pressed');
    timer = setTimeout(() => entry.classList.remove('is-pressed'), 220);
  });
});

const teamGrid = document.querySelector('#team-grid');
const memberCards = teamGrid ? [...teamGrid.querySelectorAll('.member-card')] : [];

/* ---------- Ficha ampliada en mobile/touch ----------
   La misma consulta que usa el CSS decide el modo: pantallas angostas o
   dispositivos táctiles sin hover. En desktop la tarjeta completa sigue siendo
   un enlace al perfil y la cara frontal no se muestra.
   En este modo, tocar una tarjeta abre #member-sheet (un único <dialog>): se
   completa con los datos de esa tarjeta, vuela desde su posición al centro
   (técnica FLIP) y gira para mostrar el dorso. Al cerrar, el camino es el inverso. */
const flipMode = window.matchMedia('(max-width: 700px), (hover: none) and (pointer: coarse)');
const reducedMotionCards = window.matchMedia('(prefers-reduced-motion: reduce)');
const sheet = document.querySelector('#member-sheet');
let sheetSource = null; // tarjeta que abrió la ficha
let sheetClosing = false;

const canAnimate = () => Boolean(Element.prototype.animate);
const sheetMotion = () => !reducedMotionCards.matches && canAnimate();

/* Transform que lleva la ficha (rect "to", ya en su lugar final) a ocupar el rect "from". */
function flipTransform(from, to) {
  const dx = (from.left + from.width / 2) - (to.left + to.width / 2);
  const dy = (from.top + from.height / 2) - (to.top + to.height / 2);
  return `translate(${dx}px, ${dy}px) scale(${from.width / to.width}, ${from.height / to.height})`;
}

/* La ficha mide lo que pide su contenido, así que no tiene la proporción de la
   tarjeta. Durante el viaje, la copia del frente se compensa: en la tarjeta
   coincide exactamente con ella y en el centro queda con escala uniforme (--k). */
function frontCounterScale(from, to, reverse, timing) {
  const front = sheet.querySelector('.sheet-front .card-front');
  if (!front) return;
  const kx = to.width / from.width;
  const ky = to.height / from.height;
  const keyframes = [{ transform: `scale(${kx}, ${ky})` }, { transform: `scale(${kx})` }];
  front.animate(reverse ? keyframes.reverse() : keyframes, timing);
}

function fillSheet(card) {
  const front = card.querySelector('.card-front');
  const portrait = card.querySelector('.card-portrait img');
  const [city = '', age = ''] = [...card.querySelector('.card-meta').childNodes]
    .map(node => node.textContent.trim()).filter(Boolean);
  const name = card.querySelector('.card-body h3').textContent;
  const link = card.querySelector('.card-link');

  sheet.dataset.member = card.dataset.member; // acento propio (--member-accent)
  // Frente: copia visual de la cara frontal (con su número actual, aun después de mezclar).
  const frontCopy = document.createElement('div');
  frontCopy.className = 'card-front';
  frontCopy.innerHTML = front.innerHTML;
  frontCopy.querySelectorAll('.sr-only').forEach(node => node.remove());
  frontCopy.querySelectorAll('img').forEach(img => { img.loading = 'eager'; });
  sheet.querySelector('.sheet-front').replaceChildren(frontCopy);

  // El avatar llega con la variante del tema actual (theme.js ya la aplicó a la tarjeta).
  const photo = sheet.querySelector('.sheet-portrait img');
  photo.srcset = portrait.getAttribute('srcset') || '';
  photo.sizes = '96px';
  photo.src = portrait.getAttribute('src');
  photo.alt = portrait.alt;
  sheet.querySelector('.sheet-role').textContent = card.querySelector('.role-header').textContent;
  sheet.querySelector('.sheet-name').textContent = name;
  sheet.querySelector('.sheet-city').textContent = city;
  sheet.querySelector('.sheet-age').textContent = age;
  sheet.querySelector('.sheet-skills').replaceChildren(...[...card.querySelectorAll('.tags span')].map(tag => {
    const item = document.createElement('li');
    item.textContent = tag.textContent;
    return item;
  }));
  const sheetLink = sheet.querySelector('.sheet-link');
  sheetLink.href = link.getAttribute('href');
  sheetLink.setAttribute('aria-label', link.getAttribute('aria-label'));
  sheet.querySelector('.sheet-close .sr-only').textContent = `Cerrar ficha de ${name}`;
}

function openSheet(card) {
  if (!sheet || sheet.open || !flipMode.matches) return;
  const from = card.querySelector('.card-front').getBoundingClientRect();
  fillSheet(card);
  sheet.style.setProperty('--from-w', `${from.width}px`);
  sheet.style.setProperty('--from-h', `${from.height}px`);
  sheet.style.setProperty('--sheet-ratio', (from.height / from.width).toFixed(3));

  sheetSource = card;
  sheet.showModal(); // foco al botón Cerrar (autofocus); Escape dispara "cancel"
  sheet.classList.add('is-turned'); // estado final: dorso a la vista
  card.classList.add('is-sheet-source');

  const sheetCard = sheet.querySelector('.sheet-card');
  const to = sheetCard.getBoundingClientRect();
  sheet.style.setProperty('--k', (to.width / from.width).toFixed(4));
  const scrim = sheet.querySelector('.sheet-scrim');

  // Sin movimiento: aparición simple, sin viaje ni giro.
  if (!sheetMotion()) {
    if (canAnimate()) {
      scrim.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 160, easing: 'ease-out' });
      sheetCard.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 160, easing: 'ease-out' });
    }
    return;
  }

  // 1) Vuela y se amplía desde la tarjeta hasta el centro. 2) Gira y muestra el dorso.
  scrim.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 300, easing: 'ease-out' });
  sheetCard.animate([{ transform: flipTransform(from, to) }, { transform: 'none' }],
    { duration: 260, easing: 'cubic-bezier(.2, .75, .25, 1)' });
  frontCounterScale(from, to, false, { duration: 260, easing: 'cubic-bezier(.2, .75, .25, 1)' });
  sheet.querySelector('.sheet-flipper').animate([{ transform: 'rotateY(0deg)' }, { transform: 'rotateY(180deg)' }],
    { duration: 220, delay: 250, easing: 'cubic-bezier(.35, .1, .25, 1)', fill: 'backwards' });
}

/* La tarjeta reaparece y recupera el foco. Se llama inmediatamente después de close()
   (mientras el modal está abierto la grilla es inerte y no acepta foco), sin esperar
   al evento "close", que es asíncrono; ese evento la llama igual por si se cerró de otro modo. */
function restoreSheetSource() {
  if (!sheetSource) return;
  const card = sheetSource;
  sheetSource = null;
  card.classList.remove('is-sheet-source');
  if (flipMode.matches) card.querySelector('.card-front').focus({ preventScroll: true });
}

function finishClose() {
  sheet.close();
  restoreSheetSource();
}

function closeSheet(animate = true) {
  if (!sheet || !sheet.open) return;
  if (!animate || !canAnimate() || !sheetSource) {
    finishClose();
    return;
  }
  if (sheetClosing) return;
  sheetClosing = true;
  // Si la apertura seguía en curso, se completa antes de medir.
  sheet.getAnimations({ subtree: true }).forEach(animation => animation.finish());
  const sheetCard = sheet.querySelector('.sheet-card');
  const scrim = sheet.querySelector('.sheet-scrim');

  if (!sheetMotion()) {
    scrim.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 140, easing: 'ease-in', fill: 'both' });
    sheetCard.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 140, easing: 'ease-in', fill: 'both' })
      .finished.then(finishClose, () => {});
    return;
  }

  const to = sheetCard.getBoundingClientRect();
  const from = sheetSource.querySelector('.card-front').getBoundingClientRect();
  // 1) Vuelve al frente. 2) Regresa a la tarjeta. 3) Se cierra.
  sheet.querySelector('.sheet-flipper').animate([{ transform: 'rotateY(180deg)' }, { transform: 'rotateY(0deg)' }],
    { duration: 200, easing: 'cubic-bezier(.35, .1, .25, 1)', fill: 'forwards' });
  scrim.animate([{ opacity: 1 }, { opacity: 0 }],
    { duration: 260, delay: 170, easing: 'ease-in', fill: 'both' });
  sheetCard.animate([{ transform: 'none' }, { transform: flipTransform(from, to) }],
    { duration: 240, delay: 190, easing: 'cubic-bezier(.5, 0, .3, 1)', fill: 'both' })
    .finished.then(finishClose, () => {});
  frontCounterScale(from, to, true, { duration: 240, delay: 190, easing: 'cubic-bezier(.5, 0, .3, 1)', fill: 'both' });
}

if (sheet) {
  sheet.addEventListener('cancel', event => { // Escape
    event.preventDefault();
    closeSheet();
  });
  sheet.querySelector('.sheet-close').addEventListener('click', () => closeSheet());
  sheet.querySelector('.sheet-scrim').addEventListener('click', () => closeSheet());

  sheet.addEventListener('close', () => {
    sheet.getAnimations({ subtree: true }).forEach(animation => animation.cancel());
    sheet.classList.remove('is-turned');
    sheetClosing = false;
    restoreSheetSource();
  });

  // Al volver con "atrás" desde un perfil (bfcache), la ficha no queda abierta.
  window.addEventListener('pageshow', event => { if (event.persisted) closeSheet(false); });
}

function resetCards() {
  closeSheet(false);
  // Si el foco estaba dentro de una tarjeta, lo conservamos en su control visible
  // (al cambiar de modo, el que lo tenía puede quedar oculto).
  const focusedCard = document.activeElement && document.activeElement.closest('.member-card');
  if (focusedCard) {
    const target = focusedCard.querySelector(flipMode.matches ? '.card-front' : '.card-link');
    if (document.activeElement !== target) target.focus({ preventScroll: true });
  }
}

memberCards.forEach(card => {
  card.querySelector('.card-front').addEventListener('click', () => openSheet(card));
});

flipMode.addEventListener('change', resetCards);

/* ---------- Mezclar tarjetas ---------- */
const shuffleControl = document.querySelector('#shuffle-team');
const shuffleStatus = document.querySelector('#shuffle-status');

function mezclarTarjetas() {
  resetCards();
  [...memberCards].sort(() => Math.random() - 0.5).forEach((card, index) => {
    teamGrid.appendChild(card);
    // Cada tarjeta tiene su número en la cara frontal y en el dorso.
    card.querySelectorAll('.card-index').forEach(number => {
      number.textContent = String(index + 1).padStart(2, '0');
    });
  });
  // Breve respuesta visual en la grilla y aviso para lectores de pantalla.
  teamGrid.classList.remove('is-shuffled');
  void teamGrid.offsetWidth;
  teamGrid.classList.add('is-shuffled');
  if (shuffleStatus) {
    const nombres = [...teamGrid.querySelectorAll('.card-body h3')].map(h => h.textContent);
    shuffleStatus.textContent = 'Tarjetas mezcladas. Nuevo orden: ' + nombres.join(', ') + '.';
  }
}

/* Slider: el ícono se arrastra con Pointer Events (mouse, touch y lápiz).
   Si llega al final y se suelta, mezcla; siempre vuelve al inicio.
   Click, Enter y Espacio funcionan porque el control es un <button>. */
if (shuffleControl && teamGrid) {
  const knob = shuffleControl.querySelector('.shuffle-knob');
  let startX = 0;
  let offset = 0;
  let dragging = false;
  let dragged = false;
  let ignoreClickUntil = 0;

  const maxOffset = () => shuffleControl.clientWidth - knob.offsetWidth - 8;

  function moveKnob(value) {
    offset = Math.max(0, Math.min(value, maxOffset()));
    shuffleControl.style.setProperty('--knob-x', offset + 'px');
    shuffleControl.style.setProperty('--progress', (offset / maxOffset()).toFixed(3));
  }

  shuffleControl.addEventListener('pointerdown', event => {
    if (event.button !== 0) return;
    dragging = true;
    dragged = false;
    startX = event.clientX;
    shuffleControl.setPointerCapture(event.pointerId);
    shuffleControl.classList.add('is-dragging');
  });

  shuffleControl.addEventListener('pointermove', event => {
    if (!dragging) return;
    const distance = event.clientX - startX;
    if (Math.abs(distance) > 4) dragged = true;
    moveKnob(distance);
  });

  function endDrag() {
    if (!dragging) return;
    dragging = false;
    shuffleControl.classList.remove('is-dragging');
    if (dragged) {
      // El click que el navegador dispara al soltar no debe mezclar otra vez.
      ignoreClickUntil = Date.now() + 400;
      if (offset >= maxOffset() - 2) confirmarMezcla();
    }
    moveKnob(0); // vuelve suavemente al inicio (transición CSS)
  }

  function confirmarMezcla() {
    mezclarTarjetas();
    shuffleControl.classList.add('is-done');
    setTimeout(() => shuffleControl.classList.remove('is-done'), 450);
  }

  shuffleControl.addEventListener('pointerup', endDrag);
  shuffleControl.addEventListener('pointercancel', endDrag);

  shuffleControl.addEventListener('click', () => {
    if (Date.now() < ignoreClickUntil) return;
    confirmarMezcla();
  });
}

// ScrollSpy para el Navbar (resaltar sección activa)
const navLinks = document.querySelectorAll('.main-nav a');
const equipoSection = document.getElementById('equipo');

if (equipoSection && navLinks.length > 0) {
  window.addEventListener('scroll', () => {
    // Si scrolleamos hasta la seccion equipo (con un margen de 250px)
    if (window.scrollY >= equipoSection.offsetTop - 250) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      });
      const equipoLink = document.querySelector('.main-nav a[href="#equipo"]');
      if (equipoLink) {
        equipoLink.classList.add('active');
        equipoLink.setAttribute('aria-current', 'location');
      }
    } else {
      // Si estamos en la parte superior del hero
      navLinks.forEach(link => {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      });
      const inicioLink = document.querySelector('.main-nav a[href="index.html"]');
      if (inicioLink) {
        inicioLink.classList.add('active');
        inicioLink.setAttribute('aria-current', 'page');
      }
    }
  });
}

/* Acabado visual de portada: los observers no modifican el flip, el orden ni el foco. */
(() => {
  if (!document.body.classList.contains('home-page') || !('IntersectionObserver' in window)) return;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const core = document.querySelector('.digital-core');
  const cards = [...document.querySelectorAll('.member-card')];
  const arrivals = [...document.querySelectorAll('.hero-copy, .section-heading, .member-card, .essence-aside, .essence-content, .cta-inner')];
  let arrivalObserver, centerObserver, sceneObserver;
  let coreVisible = true;

  function pauseScene() {
    core.classList.toggle('scene-resting', document.hidden || !coreVisible);
  }

  function watchCenter() {
    if (centerObserver) centerObserver.disconnect();
    cards.forEach(card => card.classList.remove('is-scroll-lit'));
    if (reducedMotion.matches || !flipMode.matches) return;
    // Banda central de 24% del viewport; resalta la tarjeta sin girarla.
    const edge = Math.round(window.innerHeight * .38);
    centerObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => entry.target.classList.toggle('is-scroll-lit', entry.isIntersecting));
    }, { rootMargin: `-${edge}px 0px -${edge}px 0px`, threshold: 0.01 });
    cards.forEach(card => centerObserver.observe(card));
  }

  function configureMotion() {
    if (arrivalObserver) arrivalObserver.disconnect();
    if (sceneObserver) sceneObserver.disconnect();
    arrivals.forEach(element => element.classList.remove('atmosphere-enter'));
    watchCenter();
    if (reducedMotion.matches) {
      core.classList.remove('scene-resting');
      return;
    }
    arrivalObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('atmosphere-enter');
        arrivalObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    arrivals.forEach(element => arrivalObserver.observe(element));
    sceneObserver = new IntersectionObserver(entries => {
      coreVisible = entries[0].isIntersecting;
      pauseScene();
    });
    sceneObserver.observe(core);
  }

  document.addEventListener('visibilitychange', pauseScene);
  reducedMotion.addEventListener('change', configureMotion);
  flipMode.addEventListener('change', watchCenter);
  window.addEventListener('resize', watchCenter);
  configureMotion();
})();
