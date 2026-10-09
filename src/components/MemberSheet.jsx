import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ThemedImage from "./ThemedImage.jsx";

export default function MemberSheet({ member, source, onClose }) {
  const dialogRef = useRef(null);
  const animations = useRef([]),
    closing = useRef(false);
  const canAnimate = () =>
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const transform = (from, to) =>
    `translate(${from.left + from.width / 2 - to.left - to.width / 2}px, ${from.top + from.height / 2 - to.top - to.height / 2}px) scale(${from.width / to.width}, ${from.height / to.height})`;
  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    closing.current = false;
    if (member && !dialog.open) {
      dialog.showModal();
      const card = dialog.querySelector(".sheet-card");
      if (source) {
        const from = source.getBoundingClientRect(),
          to = card.getBoundingClientRect();
        dialog.style.setProperty("--from-w", `${from.width}px`);
        dialog.style.setProperty("--from-h", `${from.height}px`);
        dialog.style.setProperty("--k", to.width / from.width);
        source.classList.add("is-sheet-source");
        if (canAnimate())
          animations.current = [
            card.animate(
              [{ transform: transform(from, to) }, { transform: "none" }],
              { duration: 620, easing: "cubic-bezier(.22,.7,.2,1)" },
            ),
            dialog
              .querySelector(".sheet-flipper")
              .animate(
                [{ transform: "rotateY(0)" }, { transform: "rotateY(180deg)" }],
                { duration: 620, easing: "cubic-bezier(.22,.7,.2,1)" },
              ),
            dialog
              .querySelector(".sheet-scrim")
              .animate([{ opacity: 0 }, { opacity: 1 }], { duration: 320 }),
          ];
      }
    } else if (!member && dialog.open) dialog.close();
    return () => {
      animations.current.forEach((animation) => animation.cancel());
      source?.classList.remove("is-sheet-source");
    };
  }, [member, source]);
  function close() {
    if (closing.current) return;
    closing.current = true;
    const dialog = dialogRef.current,
      card = dialog.querySelector(".sheet-card");
    animations.current.forEach((animation) => animation.cancel());
    if (!source || !canAnimate()) {
      onClose();
      return;
    }
    const animation = card.animate(
      [
        { transform: "none" },
        {
          transform: transform(
            source.getBoundingClientRect(),
            card.getBoundingClientRect(),
          ),
        },
      ],
      { duration: 320, easing: "ease-in", fill: "forwards" },
    );
    animations.current = [
      animation,
      dialog
        .querySelector(".sheet-flipper")
        .animate(
          [{ transform: "rotateY(180deg)" }, { transform: "rotateY(0)" }],
          { duration: 320, easing: "ease-in", fill: "forwards" },
        ),
      dialog
        .querySelector(".sheet-scrim")
        .animate([{ opacity: 1 }, { opacity: 0 }], {
          duration: 320,
          fill: "forwards",
        }),
    ];
    animation.onfinish = onClose;
  }
  return (
    <dialog
      ref={dialogRef}
      id="member-sheet"
      className="member-sheet is-turned"
      data-member={member?.id}
      aria-labelledby="sheet-name"
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
      onClose={onClose}
    >
      <div className="sheet-scrim" aria-hidden="true" onClick={close} />
      {member && (
        <div className="sheet-card">
          <div className="sheet-flipper">
            <div className="sheet-face sheet-front" aria-hidden="true">
              <div className="card-front">
                <span className="card-index">
                  {source?.querySelector(".card-index")?.textContent}
                </span>
                <span className="card-front-avatar">
                  <ThemedImage
                    data-src-light={`/img/${member.id}300.webp`}
                    data-src-dark={`/img/${member.id}Dark300.webp`}
                    alt=""
                  />
                </span>
                <span className="card-front-name">{member.name}</span>
                <span className="card-front-hint">+</span>
              </div>
            </div>
            <div className="sheet-face sheet-back">
              <button
                className="sheet-close"
                type="button"
                autoFocus
                onClick={close}
              >
                <span aria-hidden="true">×</span>
                <span className="sr-only">Cerrar ficha</span>
              </button>
              <div className="sheet-portrait">
                <ThemedImage
                  data-src-light={`/img/${member.id}300.webp`}
                  data-src-dark={`/img/${member.id}Dark300.webp`}
                  alt={`Avatar ilustrado de ${member.name}`}
                />
              </div>
              <p className="sheet-role">{member.cardRole}</p>
              <h3 id="sheet-name" className="sheet-name">
                {member.name}
              </h3>
              <dl className="sheet-meta">
                <div>
                  <dt>Ciudad</dt>
                  <dd className="sheet-city">{member.meta.split(" • ")[0]}</dd>
                </div>
                <div>
                  <dt>Edad</dt>
                  <dd className="sheet-age">{member.meta.split(" • ")[1]}</dd>
                </div>
              </dl>
              <p className="sheet-skills-title" id="sheet-skills-title">
                Habilidades
              </p>
              <ul className="sheet-skills" aria-labelledby="sheet-skills-title">
                {member.cardSkills.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
              <Link
                className="sheet-link"
                to={`/equipo/${member.id}`}
                onClick={onClose}
              >
                Ver perfil <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
