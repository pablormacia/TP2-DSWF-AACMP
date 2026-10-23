import { useState } from "react";
import resources from "../data/resources.json";
import {
  DEFAULT_FILTERS,
  categoriesOf,
  filterResources,
} from "../lib/resources.js";
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
  const [query, setQuery] = useState(DEFAULT_FILTERS.query),
    [category, setCategory] = useState(DEFAULT_FILTERS.category);
  const filtered = filterResources(resources, { query, category });
  function reset() {
    setQuery(DEFAULT_FILTERS.query);
    setCategory(DEFAULT_FILTERS.category);
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
            {categoriesOf(resources).map(
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
