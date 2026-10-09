import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import logs from "../data/logs.json";
export function LogEntry({ entry }) {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((item) => {
          if (item.isIntersecting) item.target.classList.add("visible");
        }),
      { threshold: 0.12 },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <article
      ref={ref}
      className="log-entry reveal"
      id={"log-entry-" + entry.id}
      data-gem={entry.gem}
    >
      <div className="log-gem-node" aria-hidden="true">
        <span className="log-gem-inner">
          {String(entry.id).padStart(2, "0")}
        </span>
      </div>
      <details className="log-card" open>
        <summary>
          <div className="log-meta">
            <span>{entry.label}</span>
            <span>{entry.period}</span>
          </div>
          <h2>{entry.title}</h2>
        </summary>
        {entry.paragraphs.map((p, i) => (
          <div key={i}>
            {i === 1 && entry.note && <h3>{entry.note}</h3>}
            <p>{p}</p>
          </div>
        ))}
      </details>
    </article>
  );
}
export default function Logbook() {
  const [stage, setStage] = useState("Todas");
  const entries = logs.filter((e) => stage === "Todas" || stage === e.stage);
  return (
    <>
      <div className={"paper-texture"} aria-hidden={"true"}></div>
      <div className={"leaf-container"} aria-hidden={"true"}>
        <div className={"leaf"}></div>
        <div className={"leaf"}></div>
        <div className={"leaf"}></div>
        <div className={"leaf"}></div>
        <div className={"leaf"}></div>
        <div className={"leaf"}></div>
        <div className={"leaf"}></div>
        <div className={"leaf"}></div>
        <div className={"leaf"}></div>
        <div className={"leaf"}></div>
        <div className={"leaf"}></div>
        <div className={"leaf"}></div>
      </div>
      <section
        className={"log-hero section-shell reveal"}
        aria-labelledby={"log-page-title"}
      >
        <p className={"label-tag"}>{"Detrás de pantalla"}</p>
        <h1 id={"log-page-title"}>{"Nuestra bitácora"}</h1>
        <p className={"log-hero-lead"}>
          {
            "Decisiones, dificultades y aprendizajes del equipo. El registro escrito del camino recorrido juntos."
          }
        </p>
      </section>
      <section
        className={"log-timeline section-shell"}
        aria-label={"Entradas de la bitácora"}
      >
        <div className="tp2-log-filter">
          <label>
            Etapa
            <select value={stage} onChange={(e) => setStage(e.target.value)}>
              {["Todas", "TP1", "TP2"].map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
          <p role="status">{entries.length} registros</p>
        </div>
        <div className="log-entries">
          {entries.map((entry) => (
            <LogEntry key={entry.id} entry={entry} />
          ))}
        </div>
      </section>
      <section
        className={"log-cta section-shell reveal"}
        aria-labelledby={"log-cta-title"}
      >
        <div className={"log-cta-inner"}>
          <div className={"log-cta-gems"} aria-hidden={"true"}>
            <i data-gem={"coral"}></i>
            <i data-gem={"cerulean"}></i>
            <i data-gem={"ochre"}></i>
            <i data-gem={"sage"}></i>
            <i data-gem={"lavender"}></i>
          </div>
          <p className={"log-cta-eyebrow"}>{"Cierre del recorrido"}</p>
          <h2 id={"log-cta-title"}>{"El equipo detrás de la gema"}</h2>
          <p className={"log-cta-text"}>
            {
              "Esta bitácora resume cómo fuimos construyendo la identidad del proyecto: idea, diseño, interacción, revisión y cierre. Detrás de cada etapa hubo decisiones, ajustes y trabajo compartido. Ahora podés conocer a las personas que le dieron forma a AACMP."
            }
          </p>
          <Link
            className={"log-cta-button"}
            id={"btn-ver-equipo"}
            to={"/#equipo"}
          >
            <span>{"Conocer al equipo"}</span>
            <span className={"log-cta-button-icon"} aria-hidden={"true"}>
              <svg
                viewBox={"0 0 24 24"}
                width={"18"}
                height={"18"}
                fill={"none"}
                stroke={"currentColor"}
                strokeWidth={"2.2"}
                strokeLinecap={"round"}
                strokeLinejoin={"round"}
              >
                <path d={"M5 12h14m-6-6 6 6-6 6"}></path>
              </svg>
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
