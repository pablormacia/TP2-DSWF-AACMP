import { useState } from "react";
import resources from "../data/resources.json";
export const normalize = (value) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
export function ResourceCard({ resource }) {
  return (
    <article className="resource-card">
      <p className="eyebrow">{resource.category}</p>
      <h2>{resource.name}</h2>
      <p>{resource.description}</p>
      <details>
        <summary>Cómo se conecta con AACMP</summary>
        <p>{resource.detail}</p>
        <a
          className="text-link"
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Explorar recurso ↗
        </a>
      </details>
    </article>
  );
}
export default function Resources() {
  const [query, setQuery] = useState(""),
    [category, setCategory] = useState("Todas");
  const filtered = resources.filter(
    (r) =>
      (category === "Todas" || r.category === category) &&
      normalize(`${r.name} ${r.description} ${r.detail}`).includes(
        normalize(query.trim()),
      ),
  );
  function reset() {
    setQuery("");
    setCategory("Todas");
  }
  return (
    <section className="tp2-page section-shell">
      <p className="eyebrow">La caja de herramientas</p>
      <h1>Recursos que dan forma a la gema.</h1>
      <p className="lead">
        Un catálogo local de {resources.length} tecnologías, ideas y prácticas
        relacionadas con nuestra propuesta.
      </p>
      <div className="filters">
        <label>
          Buscar recurso
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Nombre o descripción…"
          />
        </label>
        <label>
          Categoría
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {["Todas", ...new Set(resources.map((r) => r.category))].map(
              (c) => (
                <option key={c}>{c}</option>
              ),
            )}
          </select>
        </label>
        <button className="button" onClick={reset}>
          Restablecer
        </button>
      </div>
      <p role="status" className="muted">
        {filtered.length} de {resources.length} recursos
      </p>
      {filtered.length ? (
        <div className="resource-grid">
          {filtered.map((r) => (
            <ResourceCard key={r.id} resource={r} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No encontramos esas gemas.</h2>
          <p>Probá otra búsqueda o restablecé el catálogo.</p>
          <button className="button" onClick={reset}>
            Mostrar todos los recursos
          </button>
        </div>
      )}
    </section>
  );
}
