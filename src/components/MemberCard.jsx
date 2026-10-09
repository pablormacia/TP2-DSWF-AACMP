import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ThemedImage from "./ThemedImage.jsx";
export default function MemberCard({ member, index, onOpen }) {
  const ref = useRef(null);
  useEffect(() => {
    const touch = window.matchMedia(
      "(max-width: 700px), (hover: none) and (pointer: coarse)",
    );
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer;
    function configure() {
      observer?.disconnect();
      ref.current.classList.remove("is-scroll-lit");
      if (!touch.matches || reduced.matches) return;
      const edge = Math.round(window.innerHeight * 0.38);
      observer = new IntersectionObserver(
        (entries) =>
          entries.forEach((entry) =>
            entry.target.classList.toggle(
              "is-scroll-lit",
              entry.isIntersecting,
            ),
          ),
        { rootMargin: `-${edge}px 0px -${edge}px 0px`, threshold: 0.01 },
      );
      observer.observe(ref.current);
    }
    configure();
    touch.addEventListener("change", configure);
    reduced.addEventListener("change", configure);
    window.addEventListener("resize", configure);
    return () => {
      observer?.disconnect();
      touch.removeEventListener("change", configure);
      reduced.removeEventListener("change", configure);
      window.removeEventListener("resize", configure);
    };
  }, []);
  return (
    <article ref={ref} className={"member-card"} data-member={member.id}>
      <button
        className={"card-front"}
        type={"button"}
        aria-haspopup={"dialog"}
        aria-controls={"member-sheet"}
        onClick={(event) =>
          onOpen(member, event.currentTarget.closest(".member-card"))
        }
      >
        <span className={"card-index"} aria-hidden={"true"}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className={"card-front-avatar"}>
          <ThemedImage
            loading={"lazy"}
            decoding={"async"}
            src={"/img/juan300.webp".replaceAll("juan", member.id)}
            data-src-light={"/img/juan300.webp".replaceAll("juan", member.id)}
            data-src-dark={"/img/juanDark300.webp".replaceAll(
              "juan",
              member.id,
            )}
            alt={"Avatar ilustrado de " + member.name}
          />
        </span>
        <span className={"card-front-name"}>{member.name}</span>
        <span className={"sr-only"}>{": ver datos"}</span>
        <span className={"card-front-hint"} aria-hidden={"true"}>
          {"+"}
        </span>
      </button>
      <div
        className={"card-back"}
        id={"card-back-juan".replaceAll("juan", member.id)}
      >
        <div
          className={`card-portrait portrait-${{ juan: "blue", mariano: "green", daniela: "yellow", pablo: "coral", fernando: "purple" }[member.id]}`}
        >
          <ThemedImage
            loading={"lazy"}
            decoding={"async"}
            className={"portrait-image"}
            src={"/img/juan300.webp".replaceAll("juan", member.id)}
            data-src-light={"/img/juan300.webp".replaceAll("juan", member.id)}
            data-src-dark={"/img/juanDark300.webp".replaceAll(
              "juan",
              member.id,
            )}
            alt={"Avatar ilustrado de " + member.name}
          />
        </div>
        <div className={"card-index"}>{String(index + 1).padStart(2, "0")}</div>
        <div className={"card-body"}>
          <p className={"role-header"}>{member.cardRole}</p>
          <h3>{member.name}</h3>
          <p className={"card-meta"}>
            {member.meta.split(" • ")[0]}
            <br />
            {member.meta.split(" • ")[1]}
          </p>
          <div className={"tags"}>
            {member.cardSkills.map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
          <Link
            className={"card-link"}
            id={"link-juan".replaceAll("juan", member.id)}
            to={"/equipo/juan".replaceAll("juan", member.id)}
            aria-label={"Ver perfil de " + member.name}
          >
            {"Ver perfil "}
            <span aria-hidden={"true"}>{"→"}</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
