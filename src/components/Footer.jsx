import { Link, useLocation } from "react-router-dom";
export default function Footer() {
  const { pathname } = useLocation();
  if (pathname.startsWith("/equipo/"))
    return (
      <footer
        className={"site-footer site-footer--internal site-footer--profile"}
      >
        <Link className={"brand"} aria-label={"AACMP, inicio"} to={"/"}>
          <span className={"brand-mark"} aria-hidden={"true"}>
            {"</>"}
          </span>
          {" AACMP\n    "}
        </Link>
        <p>{"AACMP · TP2 · Desarrollo de Sistemas Web · 2026"}</p>
        <Link
          id={"link-volver-inicio"}
          className={"back-to-top"}
          aria-label={"Volver al inicio"}
          to={"/"}
        >
          <span className={"back-to-top-text"}>{"Volver al inicio"}</span>
          <span className={"back-to-top-icon"} aria-hidden={"true"}>
            <svg
              viewBox={"0 0 24 24"}
              fill={"none"}
              stroke={"currentColor"}
              strokeWidth={"2"}
              strokeLinecap={"round"}
              strokeLinejoin={"round"}
            >
              <path d={"M19 12H5M11 6l-6 6 6 6"}></path>
            </svg>
          </span>
        </Link>
      </footer>
    );
  if (!["/", "/equipo"].includes(pathname))
    return (
      <footer className={"site-footer site-footer--internal"}>
        <Link className={"brand"} aria-label={"AACMP, inicio"} to={"/"}>
          <span className={"brand-mark"} aria-hidden={"true"}>
            {"</>"}
          </span>
          {" AACMP\n    "}
        </Link>
        <p>{"AACMP · TP2 · Desarrollo de Sistemas Web · 2026"}</p>
        <Link
          id={"link-volver-inicio"}
          className={"back-to-top"}
          aria-label={"Volver al inicio"}
          to={"/"}
        >
          <span className={"back-to-top-text"}>{"Volver al inicio"}</span>
          <span className={"back-to-top-icon"} aria-hidden={"true"}>
            <svg
              viewBox={"0 0 24 24"}
              fill={"none"}
              stroke={"currentColor"}
              strokeWidth={"2"}
              strokeLinecap={"round"}
              strokeLinejoin={"round"}
            >
              <path d={"M19 12H5M11 6l-6 6 6 6"}></path>
            </svg>
          </span>
        </Link>
      </footer>
    );
  return (
    <footer className={"site-footer"}>
      <Link className={"brand"} aria-label={"AACMP, inicio"} to={"/"}>
        <span className={"brand-mark"} aria-hidden={"true"}>
          {"</>"}
        </span>
        {" AACMP\n    "}
      </Link>
      <p>{"AACMP · TP2 · Desarrollo de Sistemas Web · 2026"}</p>
      <a
        href={"#top"}
        id={"link-volver-arriba"}
        className={"back-to-top"}
        aria-label={"Volver arriba"}
      >
        <span className={"back-to-top-text"}>{"Volver arriba"}</span>
        <span className={"back-to-top-icon"} aria-hidden={"true"}>
          <svg
            viewBox={"0 0 24 24"}
            fill={"none"}
            stroke={"currentColor"}
            strokeWidth={"2"}
            strokeLinecap={"round"}
            strokeLinejoin={"round"}
          >
            <path d={"M12 19V5M6 11l6-6 6 6"}></path>
          </svg>
        </span>
      </a>
    </footer>
  );
}
