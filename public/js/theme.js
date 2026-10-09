// Se ejecuta en el head para aplicar el tema antes de mostrar la página.
(() => {
  const key = 'aacmp-theme';
  const system = window.matchMedia('(prefers-color-scheme: dark)');
  let preference = null;
  let button;

  try {
    const saved = localStorage.getItem(key);
    if (saved === 'light' || saved === 'dark') preference = saved;
  } catch {
    // El sitio sigue funcionando si el navegador bloquea el almacenamiento.
  }

  const themed = 'img[data-src-light][data-src-dark]';
  const pending = new WeakMap();

  function variant(img, theme) {
    const dark = theme === 'dark';
    const hasSrcset = img.dataset.srcsetLight && img.dataset.srcsetDark;
    return {
      src: dark ? img.dataset.srcDark : img.dataset.srcLight,
      srcset: hasSrcset ? (dark ? img.dataset.srcsetDark : img.dataset.srcsetLight) : null
    };
  }

  function setVariant(img, { src, srcset }) {
    if (srcset) img.srcset = srcset;
    img.src = src;
  }

  // Descarga y decodifica la variante aparte, sin tocar la imagen visible.
  function load(img, { src, srcset }) {
    const next = new Image();
    if (img.sizes) next.sizes = img.sizes;
    if (srcset) next.srcset = srcset;
    next.src = src;
    return next.decode().catch(() => {});
  }

  /* Intercambia las imágenes temáticas según el tema activo.
     Antes del primer pintado se cambian directo; después, la imagen nueva
     se decodifica aparte y recién entonces reemplaza a la actual, así el
     marco nunca queda vacío ni se ve la imagen cargando a medias. */
  function applyThemeImages(theme, immediate) {
    document.querySelectorAll(themed).forEach(img => {
      if (img.dataset.showingReal === 'true') return;
      const target = variant(img, theme);
      if (img.getAttribute('src') === target.src) {
        pending.delete(img);
        return;
      }
      if (immediate) {
        setVariant(img, target);
        return;
      }
      const token = {};
      pending.set(img, token);
      load(img, target).then(() => {
        // Un cambio de tema posterior o el hechizo ganan sobre este.
        if (pending.get(img) !== token || img.dataset.showingReal === 'true') return;
        pending.delete(img);
        setVariant(img, target);
      });
    });
  }

  function currentTheme() {
    return preference || (system.matches ? 'dark' : 'light');
  }

  function applyTheme(immediate) {
    const theme = currentTheme();
    document.documentElement.dataset.theme = theme;
    if (button) button.setAttribute('aria-pressed', String(theme === 'dark'));
    applyThemeImages(theme, immediate);
  }

  applyTheme(true);
  system.addEventListener('change', () => {
    if (!preference) applyTheme();
  });

  /* Mientras se lee el HTML, cada imagen temática recibe la variante del
     tema al insertarse, antes de pintarse: en Dark nunca se ve la clara. */
  const parsing = new MutationObserver(records => {
    const theme = currentTheme();
    records.forEach(record => record.addedNodes.forEach(node => {
      if (node.nodeType !== 1) return;
      const imgs = node.matches(themed) ? [node] : node.querySelectorAll(themed);
      imgs.forEach(img => {
        const target = variant(img, theme);
        if (img.getAttribute('src') !== target.src) setVariant(img, target);
      });
    }));
  });
  parsing.observe(document.documentElement, { childList: true, subtree: true });

  // La variante opuesta es una mejora de comodidad, no parte del primer
  // render. La esperamos a tiempo ocioso para no competir con la foto real
  // de un perfil en conexiones lentas.
  window.addEventListener('load', () => {
    const warmOtherTheme = () => {
      const connection = navigator.connection;
      if (connection && (connection.saveData || /2g/.test(connection.effectiveType || ''))) return;
      const other = currentTheme() === 'dark' ? 'light' : 'dark';
      document.querySelectorAll(themed).forEach(img => {
        if (img.loading !== 'lazy') load(img, variant(img, other));
      });
    };
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(warmOtherTheme, { timeout: 4000 });
    } else {
      window.setTimeout(warmOtherTheme, 1500);
    }
  });

  document.addEventListener('DOMContentLoaded', () => {
    parsing.disconnect();
    button = document.querySelector('.theme-toggle');
    if (!button) return;
    button.hidden = false;
    applyTheme();
    button.addEventListener('click', () => {
      preference = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      applyTheme();
      try {
        localStorage.setItem(key, preference);
      } catch {
        // La elección sigue vigente en esta página aunque no pueda persistirse.
      }
    });
  });
})();
