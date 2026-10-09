import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="tp2-page section-shell">
      <p className="eyebrow">404</p>
      <h1>Esta gema no está aquí</h1>
      <p>El enlace no corresponde a una sección de AACMP.</p>
      <Link className="button" to="/">
        Volver al inicio
      </Link>
    </section>
  );
}
