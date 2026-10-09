import { useEffect, useState } from "react";
import { fetchRepositories, apiErrorMessage } from "../lib/github.js";
export function RepositoryCard({ repository }) {
  return (
    <article className="resource-card">
      <p className="eyebrow">
        {repository.language || "Multilenguaje"} · ★{" "}
        {repository.stargazers_count.toLocaleString("es-AR")}
      </p>
      <h2>{repository.full_name}</h2>
      <p>
        {repository.description || "Este repositorio no tiene descripción."}
      </p>
      <a
        className="text-link"
        href={repository.html_url}
        target="_blank"
        rel="noopener noreferrer"
      >
        Ver repositorio ↗
      </a>
    </article>
  );
}
export default function Explore() {
  const [attempt, setAttempt] = useState(0),
    [state, setState] = useState({ status: "loading", items: [] });
  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    const timer = setTimeout(() => controller.abort(), 15000);
    setState({ status: "loading", items: [] });
    async function load() {
      try {
        const items = await fetchRepositories({ signal: controller.signal });
        if (active) setState({ status: "success", items });
      } catch (error) {
        if (active)
          setState({
            status: "error",
            items: [],
            error: apiErrorMessage(error),
          });
      } finally {
        clearTimeout(timer);
      }
    }
    load();
    return () => {
      active = false;
      clearTimeout(timer);
      controller.abort();
    };
  }, [attempt]);
  return (
    <section className="tp2-page section-shell">
      <p className="eyebrow">Una ventana a la comunidad</p>
      <h1>Gemas de código abierto.</h1>
      <p className="lead">
        La API pública de GitHub aporta repositorios etiquetados como frontend,
        ordenados por estrellas. Una fuente de inspiración para el equipo,
        consultada sin claves privadas.
      </p>
      <a
        className="text-link"
        href="https://docs.github.com/en/rest/search/search#search-repositories"
        target="_blank"
        rel="noopener noreferrer"
      >
        Acerca de la fuente ↗
      </a>
      <div className="section-heading">
        <p className="muted">
          Los resultados dependen de GitHub y sus límites de consultas.
        </p>
        <button
          className="button"
          disabled={state.status === "loading"}
          onClick={() => setAttempt((a) => a + 1)}
        >
          {state.status === "error"
            ? "Reintentar consulta"
            : "Actualizar resultados"}
        </button>
      </div>
      {state.status === "loading" && (
        <div className="empty" role="status">
          Consultando las gemas de GitHub…
        </div>
      )}
      {state.status === "error" && (
        <div className="empty" role="alert">
          <h2>No pudimos cargar los repositorios.</h2>
          <p>{state.error}</p>
        </div>
      )}
      {state.status === "success" &&
        (state.items.length ? (
          <div className="resource-grid">
            {state.items.map((r) => (
              <RepositoryCard key={r.id} repository={r} />
            ))}
          </div>
        ) : (
          <p role="status">
            GitHub no devolvió repositorios para esta consulta.
          </p>
        ))}
    </section>
  );
}
