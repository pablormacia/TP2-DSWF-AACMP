import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer.jsx";

export function Header({ theme, onTheme, onMenu, open }) {
  const location = useLocation();
  const home = location.pathname === "/" || location.pathname === "/equipo";
  const [teamActive, setTeamActive] = useState(false);
  useEffect(() => {
    const update = () => {
      const team = document.getElementById("equipo");
      setTeamActive(
        Boolean(home && team && window.scrollY >= team.offsetTop - 250),
      );
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [home, location.pathname]);
  return (
    <header className="site-header">
      <Link className="brand" to="/" aria-label="AACMP, inicio">
        <span className="brand-mark" aria-hidden="true">
          <svg
            className="brand-iso"
            viewBox="0 0 32 24"
            width="30"
            height="22"
            fill="none"
          >
            <path
              className="brand-iso-code"
              d="M9 6.5 3.5 12 9 17.5M23 6.5l5.5 5.5-5.5 5.5"
            />
            <path className="brand-iso-slash" d="M18.6 3.5 13.4 20.5" />
          </svg>
        </span>
        <span className="brand-name">
          AACMP<small>Frontend Gems</small>
        </span>
      </Link>
      <button
        className="menu-button"
        type="button"
        aria-controls="tp2-sidebar"
        aria-expanded={open}
        aria-label="Abrir menú de secciones"
        onClick={onMenu}
      >
        <span />
        <span />
        <span />
        <span className="sr-only">Abrir menú</span>
      </button>
      <nav id="main-nav" className="main-nav" aria-label="Navegación principal">
        <Link
          to="/"
          className={home && !teamActive ? "active" : undefined}
          aria-current={home && !teamActive ? "page" : undefined}
        >
          Inicio
        </Link>
        <Link
          to={home ? "#equipo" : "/#equipo"}
          className={teamActive ? "active" : undefined}
          aria-current={teamActive ? "location" : undefined}
        >
          Equipo
        </Link>
        <NavLink to="/bitacora">Bitácora</NavLink>
      </nav>
      <button
        className="theme-toggle"
        type="button"
        aria-label={theme === "dark" ? "Modo claro" : "Modo oscuro"}
        aria-pressed={theme === "dark"}
        title="Cambiar tema claro / oscuro"
        onClick={onTheme}
      >
        <span className="theme-thumb" aria-hidden="true" />
        <svg
          className="theme-sun"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.4 1.4m11.2 11.2L19 19M5 19l1.4-1.4M17.6 6.4L19 5" />
        </svg>
        <svg
          className="theme-moon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          aria-hidden="true"
        >
          <path d="M20.5 14A8.5 8.5 0 0 1 10 3.5 8.5 8.5 0 1 0 20.5 14Z" />
        </svg>
      </button>
    </header>
  );
}
export function Sidebar({ open, onClose }) {
  const panel = useRef(null);
  useEffect(() => {
    if (!open) return;
    const frame = requestAnimationFrame(() =>
      panel.current?.querySelector("button")?.focus(),
    );
    return () => cancelAnimationFrame(frame);
  }, [open]);
  return (
    <aside
      ref={panel}
      id="tp2-sidebar"
      className={`tp2-sidebar ${open ? "is-open" : ""}`}
      inert={!open ? true : undefined}
      aria-label="Secciones de AACMP"
      onKeyDown={(e) => {
        if (e.key !== "Tab") return;
        const controls = [...e.currentTarget.querySelectorAll("button,a")];
        if (e.shiftKey && document.activeElement === controls[0]) {
          e.preventDefault();
          controls.at(-1).focus();
        } else if (!e.shiftKey && document.activeElement === controls.at(-1)) {
          e.preventDefault();
          controls[0].focus();
        }
      }}
    >
      <button className="tp2-close" onClick={onClose}>
        Cerrar menú ×
      </button>
      <div className="tp2-brand">
        AACMP<small>Frontend Gems · TP2</small>
      </div>
      <p className="tp2-nav-label">Nuestro universo</p>
      <nav aria-label="Secciones del TP2">
        {[
          ["/", "Inicio"],
          ["/equipo", "Equipo"],
          ["/recursos", "Recursos"],
          ["/explorar", "Explorar API"],
          ["/arbol", "Árbol de React"],
          ["/bitacora", "Bitácora"],
        ].map(([to, label]) => (
          <NavLink key={to} end={to === "/"} to={to} onClick={onClose}>
            {label}
            <span aria-hidden="true">→</span>
          </NavLink>
        ))}
      </nav>
      <p className="tp2-sidebar-foot">
        Cinco mentes.
        <br />
        Una misma misión.
      </p>
    </aside>
  );
}
export default function Layout() {
  const location = useLocation(),
    trigger = useRef(null);
  const activeTrigger = useRef(null);
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem("aacmp-theme");
      if (["light", "dark"].includes(saved)) return saved;
    } catch {}
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });
  const home = ["/", "/equipo", "/index.html"].includes(location.pathname);
  useLayoutEffect(() => {
    document.body.className = home ? "home-page" : "";
    document.body.dataset.member = location.pathname.split("/equipo/")[1] || "";
    document.documentElement.dataset.theme = theme;
    return () => {
      document.body.className = "";
      delete document.body.dataset.member;
    };
  }, [home, location.pathname, theme]);
  useEffect(() => {
    try {
      localStorage.setItem("aacmp-theme", theme);
    } catch {}
  }, [theme]);
  useEffect(() => {
    setOpen(false);
    document.title = "AACMP | Frontend Gems";
    if (location.hash) {
      requestAnimationFrame(() =>
        document.getElementById(location.hash.slice(1))?.scrollIntoView(),
      );
    } else window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting)
            entry.target.classList.add("visible", "atmosphere-enter");
        }),
      { threshold: 0.12 },
    );
    document
      .querySelectorAll(
        ".reveal,.hero-copy,.section-heading,.member-card,.essence-aside,.essence-content,.cta-inner",
      )
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [location.pathname]);
  function close() {
    setOpen(false);
    const target = activeTrigger.current || trigger.current;
    requestAnimationFrame(() => target?.focus());
  }
  useEffect(() => {
    if (!open) return;
    const key = (e) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", key);
    return () => document.removeEventListener("keydown", key);
  }, [open]);
  return (
    <div id="top">
      <a className="tp2-skip" href="#content">
        Saltar al contenido
      </a>
      <div inert={open ? true : undefined}>
        <Header
          theme={theme}
          open={open}
          onTheme={() => setTheme(theme === "dark" ? "light" : "dark")}
          onMenu={(event) => {
            activeTrigger.current = event.currentTarget;
            setOpen(true);
          }}
        />
        <main id="content" tabIndex="-1">
          <Outlet context={{ theme }} />
        </main>
        <Footer />
      </div>
      <button
        ref={trigger}
        className="tp2-sections-toggle"
        aria-label="Abrir secciones TP2"
        title="Secciones TP2"
        aria-controls="tp2-sidebar"
        aria-expanded={open}
        onClick={(event) => {
          activeTrigger.current = event.currentTarget;
          setOpen(!open);
        }}
      >
        ☰ <span>Secciones TP2</span>
      </button>
      {open && (
        <button
          className="tp2-backdrop"
          aria-label="Cerrar menú lateral"
          onClick={close}
        />
      )}
      <Sidebar open={open} onClose={close} />
    </div>
  );
}
