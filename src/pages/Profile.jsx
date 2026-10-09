import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import members from "../data/members.json";
import ThemedImage from "../components/ThemedImage.jsx";
import NotFound from "../components/NotFound.jsx";
const views = {
  juan: ({ member, real, setReal, hue, setHue, conjuring }) => (
    <div className={"section-shell"}>
      <div className={"section-inner"}>
        <section className={"profile-hero"}>
          <div className={"profile-media"}>
            <button
              className={"reveal-button"}
              type={"button"}
              data-real={"img/juan-real.jpg"}
              data-alt-real={
                "Retrato ilustrado de Juan Manuel Albareda en su escritorio"
              }
              data-volver={"Volver al mago"}
              data-acorde={"523.25,659.25,783.99,1046.50"}
              aria-pressed={real}
              onClick={() => setReal(!real)}
            >
              {real ? (
                "Volver al mago"
              ) : (
                <>
                  <span className={"reveal-text"}>
                    {"Revelar"}
                    <span className={"reveal-largo"}>
                      {" quién está detrás del mago"}
                    </span>
                  </span>
                </>
              )}
            </button>
            <div
              className={
                "profile-img-container" + (conjuring ? " is-conjuring" : "")
              }
              id={"profile-img"}
              style={{
                filter: hue === null ? "none" : `hue-rotate(${hue}deg)`,
              }}
            >
              <ThemedImage
                src={"/img/juan720.webp"}
                srcSet={"/img/juan720.webp 720w, img/juan1500.webp 1500w"}
                sizes={"(max-width: 900px) 400px, 560px"}
                data-src-light={"/img/juan720.webp"}
                data-src-dark={"/img/juanDark720.webp"}
                data-srcset-light={
                  "/img/juan720.webp 720w, img/juan1500.webp 1500w"
                }
                data-srcset-dark={
                  "/img/juanDark720.webp 720w, img/juanDark1500.webp 1500w"
                }
                loading={"eager"}
                fetchpriority={"high"}
                decoding={"async"}
                alt={"Avatar ilustrado de Juan Manuel Albareda"}
                real={real}
                realSrc={"/img/" + member.id + "-real.jpg"}
                realAlt={"Foto de perfil de " + member.name}
              />
            </div>
          </div>
          <div className={"profile-details"}>
            <div className={"profile-header"}>
              <p className={"profile-role-label"}>{"Análisis & calidad"}</p>
              <h1>{"Juan Manuel Albareda"}</h1>
              <p className={"profile-meta"}>
                {" Buenos Aires, Argentina  •  47 años"}
              </p>
              <a
                href={"https://github.com/juanmanuelalbareda"}
                target={"_blank"}
                rel={"noopener noreferrer"}
                className={"btn-github"}
                id={"github-juan"}
                aria-label={"GitHub de Juan Manuel Albareda"}
              >
                <svg
                  viewBox={"0 0 24 24"}
                  width={"18"}
                  height={"18"}
                  fill={"currentColor"}
                  aria-hidden={"true"}
                >
                  <path
                    d={
                      "M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"
                    }
                  ></path>
                </svg>
                <span>{"GitHub"}</span>
              </a>
            </div>
            <p className={"profile-bio"}>
              {
                "\n            Technical business analyst: contador público que entiende el negocio y además escribe la capa\n            que lo implementa. Trabaja en costos, procesos y auditoría interna en PyMEs y asociaciones\n            civiles, y cursa el anteúltimo cuatrimestre de la Tecnicatura. Conoce el problema de negocio\n            desde adentro: eso es lo que lleva al código.\n          "
              }
            </p>
            <div>
              <h2 className={"skills-heading"}>{"Habilidades Destacadas"}</h2>
              <div className={"profile-skills"} id={"skills-container"}>
                <span
                  data-hue={"60"}
                  tabIndex={0}
                  role="button"
                  aria-label={"Cambiar tono: " + "JavaScript"}
                  onMouseEnter={() => setHue(60)}
                  onMouseLeave={() => setHue(null)}
                  onFocus={() => setHue(60)}
                  onBlur={() => setHue(null)}
                  onClick={() => setHue(hue === null ? 60 : null)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setHue(hue === null ? 60 : null);
                    }
                  }}
                >
                  {"JavaScript"}
                </span>
                <span
                  data-hue={"220"}
                  tabIndex={0}
                  role="button"
                  aria-label={"Cambiar tono: " + "PHP/Python"}
                  onMouseEnter={() => setHue(220)}
                  onMouseLeave={() => setHue(null)}
                  onFocus={() => setHue(220)}
                  onBlur={() => setHue(null)}
                  onClick={() => setHue(hue === null ? 220 : null)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setHue(hue === null ? 220 : null);
                    }
                  }}
                >
                  {"PHP/Python"}
                </span>
                <span
                  data-hue={"120"}
                  tabIndex={0}
                  role="button"
                  aria-label={"Cambiar tono: " + "SQL/MariaDB"}
                  onMouseEnter={() => setHue(120)}
                  onMouseLeave={() => setHue(null)}
                  onFocus={() => setHue(120)}
                  onBlur={() => setHue(null)}
                  onClick={() => setHue(hue === null ? 120 : null)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setHue(hue === null ? 120 : null);
                    }
                  }}
                >
                  {"SQL/MariaDB"}
                </span>
                <span
                  data-hue={"300"}
                  tabIndex={0}
                  role="button"
                  aria-label={"Cambiar tono: " + "Análisis funcional"}
                  onMouseEnter={() => setHue(300)}
                  onMouseLeave={() => setHue(null)}
                  onFocus={() => setHue(300)}
                  onBlur={() => setHue(null)}
                  onClick={() => setHue(hue === null ? 300 : null)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setHue(hue === null ? 300 : null);
                    }
                  }}
                >
                  {"Análisis funcional"}
                </span>
              </div>
              <p className={"skills-hint"}>
                {"* Pasa el cursor por las habilidades para interactuar."}
              </p>
            </div>
            <div className={"profile-favorites"}>
              <div className={"fav-list"}>
                <h2>{"Películas Favoritas"}</h2>
                <ul>
                  <li>{"Forrest Gump"}</li>
                  <li>{"Big Fish"}</li>
                  <li>{"The Truman Show"}</li>
                </ul>
              </div>
              <div className={"fav-list"}>
                <h2>{"Discos Favoritos"}</h2>
                <ul>
                  <li>{"No llores por mí, Argentina"}</li>
                  <li>{"Get a Grip"}</li>
                  <li>{"Yo, mi, me, contigo"}</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <div className={"back-btn-container"}>
          <Link className={"btn-volver"} to={"/#equipo"}>
            <span className={"btn-volver-icon"} aria-hidden={"true"}>
              <svg
                viewBox={"0 0 24 24"}
                width={"16"}
                height={"16"}
                fill={"none"}
                stroke={"currentColor"}
                strokeWidth={"2"}
                strokeLinecap={"round"}
                strokeLinejoin={"round"}
              >
                <path d={"M19 12H5m6-6-6 6 6 6"}></path>
              </svg>
            </span>
            <span>{"Volver al equipo"}</span>
          </Link>
        </div>
      </div>
    </div>
  ),
  mariano: ({ member, real, setReal, hue, setHue, conjuring }) => (
    <div className={"section-shell"}>
      <div className={"section-inner"}>
        <section className={"profile-hero"}>
          <div className={"profile-media"}>
            <button
              className={"reveal-button"}
              type={"button"}
              data-real={"img/mariano-real.jpg"}
              data-alt-real={"Foto de perfil de Mariano Arenas"}
              data-volver={"Volver al pícaro"}
              data-acorde={"392.00,493.88,587.33,783.99"}
              aria-pressed={real}
              onClick={() => setReal(!real)}
            >
              {real ? (
                "Volver al pícaro"
              ) : (
                <>
                  <span className={"reveal-text"}>
                    {"Revelar"}
                    <span className={"reveal-largo"}>
                      {" quién está detrás del pícaro"}
                    </span>
                  </span>
                </>
              )}
            </button>
            <div
              className={
                "profile-img-container" + (conjuring ? " is-conjuring" : "")
              }
              id={"profile-img"}
              style={{
                filter: hue === null ? "none" : `hue-rotate(${hue}deg)`,
              }}
            >
              <ThemedImage
                src={"/img/mariano720.webp"}
                srcSet={"/img/mariano720.webp 720w, img/mariano1500.webp 1500w"}
                sizes={"(max-width: 900px) 400px, 560px"}
                data-src-light={"/img/mariano720.webp"}
                data-src-dark={"/img/marianoDark720.webp"}
                data-srcset-light={
                  "/img/mariano720.webp 720w, img/mariano1500.webp 1500w"
                }
                data-srcset-dark={
                  "/img/marianoDark720.webp 720w, img/marianoDark1500.webp 1500w"
                }
                loading={"eager"}
                fetchpriority={"high"}
                decoding={"async"}
                alt={"Avatar ilustrado de Mariano Arenas"}
                real={real}
                realSrc={"/img/" + member.id + "-real.jpg"}
                realAlt={"Foto de perfil de " + member.name}
              />
            </div>
          </div>
          <div className={"profile-details"}>
            <div className={"profile-header"}>
              <p className={"profile-role-label"}>{"Código & lógica"}</p>
              <h1>{"Mariano Arenas"}</h1>
              <p className={"profile-meta"}>
                {" Buenos Aires, Argentina  •  39 años"}
              </p>
              <a
                href={"https://github.com/NanoCode10"}
                target={"_blank"}
                rel={"noopener noreferrer"}
                className={"btn-github"}
                id={"github-mariano"}
                aria-label={"GitHub de Mariano Arenas"}
              >
                <svg
                  viewBox={"0 0 24 24"}
                  width={"18"}
                  height={"18"}
                  fill={"currentColor"}
                  aria-hidden={"true"}
                >
                  <path
                    d={
                      "M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"
                    }
                  ></path>
                </svg>
                <span>{"GitHub"}</span>
              </a>
            </div>
            <p className={"profile-bio"}>
              {
                "\n            Disfruta entender cómo funcionan las cosas, ordenar sistemas y encontrar soluciones simples\n            a problemas complejos. Combina experiencia técnica, automatización y desarrollo para construir\n            soluciones claras, eficientes y fáciles de mantener.\n          "
              }
            </p>
            <div>
              <h2 className={"skills-heading"}>{"Habilidades Destacadas"}</h2>
              <div className={"profile-skills"} id={"skills-container"}>
                <span
                  data-hue={"120"}
                  tabIndex={0}
                  role="button"
                  aria-label={"Cambiar tono: " + "DevOps/Infra"}
                  onMouseEnter={() => setHue(120)}
                  onMouseLeave={() => setHue(null)}
                  onFocus={() => setHue(120)}
                  onBlur={() => setHue(null)}
                  onClick={() => setHue(hue === null ? 120 : null)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setHue(hue === null ? 120 : null);
                    }
                  }}
                >
                  {"DevOps/Infra"}
                </span>
                <span
                  data-hue={"280"}
                  tabIndex={0}
                  role="button"
                  aria-label={"Cambiar tono: " + "JavaScript"}
                  onMouseEnter={() => setHue(280)}
                  onMouseLeave={() => setHue(null)}
                  onFocus={() => setHue(280)}
                  onBlur={() => setHue(null)}
                  onClick={() => setHue(hue === null ? 280 : null)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setHue(hue === null ? 280 : null);
                    }
                  }}
                >
                  {"JavaScript"}
                </span>
                <span
                  data-hue={"200"}
                  tabIndex={0}
                  role="button"
                  aria-label={"Cambiar tono: " + "C#"}
                  onMouseEnter={() => setHue(200)}
                  onMouseLeave={() => setHue(null)}
                  onFocus={() => setHue(200)}
                  onBlur={() => setHue(null)}
                  onClick={() => setHue(hue === null ? 200 : null)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setHue(hue === null ? 200 : null);
                    }
                  }}
                >
                  {"C#"}
                </span>
                <span
                  data-hue={"30"}
                  tabIndex={0}
                  role="button"
                  aria-label={"Cambiar tono: " + "PostgreSQL"}
                  onMouseEnter={() => setHue(30)}
                  onMouseLeave={() => setHue(null)}
                  onFocus={() => setHue(30)}
                  onBlur={() => setHue(null)}
                  onClick={() => setHue(hue === null ? 30 : null)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setHue(hue === null ? 30 : null);
                    }
                  }}
                >
                  {"PostgreSQL"}
                </span>
              </div>
              <p className={"skills-hint"}>
                {"* Pasa el cursor por las habilidades para interactuar."}
              </p>
            </div>
            <div className={"profile-favorites"}>
              <div className={"fav-list"}>
                <h2>{"Películas Favoritas"}</h2>
                <ul>
                  <li>{"Matrix"}</li>
                  <li>{"Avatar"}</li>
                  <li>{"Shrek II"}</li>
                </ul>
              </div>
              <div className={"fav-list"}>
                <h2>{"Discos Favoritos"}</h2>
                <ul>
                  <li>{"Californication"}</li>
                  <li>{"Canción Animal"}</li>
                  <li>{"Thriller"}</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <div className={"back-btn-container"}>
          <Link className={"btn-volver"} to={"/#equipo"}>
            <span className={"btn-volver-icon"} aria-hidden={"true"}>
              <svg
                viewBox={"0 0 24 24"}
                width={"16"}
                height={"16"}
                fill={"none"}
                stroke={"currentColor"}
                strokeWidth={"2"}
                strokeLinecap={"round"}
                strokeLinejoin={"round"}
              >
                <path d={"M19 12H5m6-6-6 6 6 6"}></path>
              </svg>
            </span>
            <span>{"Volver al equipo"}</span>
          </Link>
        </div>
      </div>
    </div>
  ),
  daniela: ({ member, real, setReal, hue, setHue, conjuring }) => (
    <div className={"section-shell"}>
      <div className={"section-inner"}>
        <section className={"profile-hero"}>
          <div className={"profile-media"}>
            <button
              className={"reveal-button"}
              type={"button"}
              data-real={"img/daniela-real.jpg"}
              data-alt-real={"Foto de perfil de Daniela Cabrera"}
              data-volver={"Volver a la elfa"}
              data-acorde={"440.00,523.25,659.25,880.00"}
              aria-pressed={real}
              onClick={() => setReal(!real)}
            >
              {real ? (
                "Volver a la elfa"
              ) : (
                <>
                  <span className={"reveal-text"}>
                    {"Revelar"}
                    <span className={"reveal-largo"}>
                      {" quién está detrás de la elfa"}
                    </span>
                  </span>
                </>
              )}
            </button>
            <div
              className={
                "profile-img-container" + (conjuring ? " is-conjuring" : "")
              }
              id={"profile-img"}
              style={{
                filter: hue === null ? "none" : `hue-rotate(${hue}deg)`,
              }}
            >
              <ThemedImage
                src={"/img/daniela720.webp"}
                srcSet={"/img/daniela720.webp 720w, img/daniela1500.webp 1500w"}
                sizes={"(max-width: 900px) 400px, 560px"}
                data-src-light={"/img/daniela720.webp"}
                data-src-dark={"/img/danielaDark720.webp"}
                data-srcset-light={
                  "/img/daniela720.webp 720w, img/daniela1500.webp 1500w"
                }
                data-srcset-dark={
                  "/img/danielaDark720.webp 720w, img/danielaDark1500.webp 1500w"
                }
                loading={"eager"}
                fetchpriority={"high"}
                decoding={"async"}
                alt={"Avatar ilustrado de Daniela Cabrera"}
                real={real}
                realSrc={"/img/" + member.id + "-real.jpg"}
                realAlt={"Foto de perfil de " + member.name}
              />
            </div>
          </div>
          <div className={"profile-details"}>
            <div className={"profile-header"}>
              <p className={"profile-role-label"}>{"Diseño & detalle"}</p>
              <h1>{"Daniela Cabrera"}</h1>
              <p className={"profile-meta"}>
                {" General Pico, La Pampa  •  33 años"}
              </p>
              <a
                href={"https://github.com/Dancay5071"}
                target={"_blank"}
                rel={"noopener noreferrer"}
                className={"btn-github"}
                id={"github-daniela"}
                aria-label={"GitHub de Daniela Cabrera"}
              >
                <svg
                  viewBox={"0 0 24 24"}
                  width={"18"}
                  height={"18"}
                  fill={"currentColor"}
                  aria-hidden={"true"}
                >
                  <path
                    d={
                      "M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"
                    }
                  ></path>
                </svg>
                <span>{"GitHub"}</span>
              </a>
            </div>
            <p className={"profile-bio"}>
              {
                "\n            Convierte problemas complejos en interfaces simples y llenas de intención. Busca la armonía visual y la\n            perfección en cada pixel para lograr que la tecnología se sienta más humana.\n          "
              }
            </p>
            <div>
              <h2 className={"skills-heading"}>{"Habilidades Destacadas"}</h2>
              <div className={"profile-skills"} id={"skills-container"}>
                <span
                  data-hue={"0"}
                  tabIndex={0}
                  role="button"
                  aria-label={"Cambiar tono: " + "UX Writing"}
                  onMouseEnter={() => setHue(0)}
                  onMouseLeave={() => setHue(null)}
                  onFocus={() => setHue(0)}
                  onBlur={() => setHue(null)}
                  onClick={() => setHue(hue === null ? 0 : null)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setHue(hue === null ? 0 : null);
                    }
                  }}
                >
                  {"UX Writing"}
                </span>
                <span
                  data-hue={"60"}
                  tabIndex={0}
                  role="button"
                  aria-label={"Cambiar tono: " + "HTML"}
                  onMouseEnter={() => setHue(60)}
                  onMouseLeave={() => setHue(null)}
                  onFocus={() => setHue(60)}
                  onBlur={() => setHue(null)}
                  onClick={() => setHue(hue === null ? 60 : null)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setHue(hue === null ? 60 : null);
                    }
                  }}
                >
                  {"HTML"}
                </span>
                <span
                  data-hue={"150"}
                  tabIndex={0}
                  role="button"
                  aria-label={"Cambiar tono: " + "CSS"}
                  onMouseEnter={() => setHue(150)}
                  onMouseLeave={() => setHue(null)}
                  onFocus={() => setHue(150)}
                  onBlur={() => setHue(null)}
                  onClick={() => setHue(hue === null ? 150 : null)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setHue(hue === null ? 150 : null);
                    }
                  }}
                >
                  {"CSS"}
                </span>
                <span
                  data-hue={"220"}
                  tabIndex={0}
                  role="button"
                  aria-label={"Cambiar tono: " + "Accesibilidad"}
                  onMouseEnter={() => setHue(220)}
                  onMouseLeave={() => setHue(null)}
                  onFocus={() => setHue(220)}
                  onBlur={() => setHue(null)}
                  onClick={() => setHue(hue === null ? 220 : null)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setHue(hue === null ? 220 : null);
                    }
                  }}
                >
                  {"Accesibilidad"}
                </span>
              </div>
              <p className={"skills-hint"}>
                {"* Pasa el cursor por las habilidades para interactuar."}
              </p>
            </div>
            <div className={"profile-favorites"}>
              <div className={"fav-list"}>
                <h2>{"Películas Favoritas"}</h2>
                <ul>
                  <li>{"Pienso en el final"}</li>
                  <li>{"Memento"}</li>
                  <li>{"Lluvia de hamburguesas"}</li>
                </ul>
              </div>
              <div className={"fav-list"}>
                <h2>{"Discos Favoritos"}</h2>
                <ul>
                  <li>{"Innuendo"}</li>
                  <li>{"Home Free"}</li>
                  <li>{"Piano Bar"}</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <div className={"back-btn-container"}>
          <Link className={"btn-volver"} to={"/#equipo"}>
            <span className={"btn-volver-icon"} aria-hidden={"true"}>
              <svg
                viewBox={"0 0 24 24"}
                width={"16"}
                height={"16"}
                fill={"none"}
                stroke={"currentColor"}
                strokeWidth={"2"}
                strokeLinecap={"round"}
                strokeLinejoin={"round"}
              >
                <path d={"M19 12H5m6-6-6 6 6 6"}></path>
              </svg>
            </span>
            <span>{"Volver al equipo"}</span>
          </Link>
        </div>
      </div>
    </div>
  ),
  pablo: ({ member, real, setReal, hue, setHue, conjuring }) => (
    <div className={"section-shell"}>
      <div className={"section-inner"}>
        <section className={"profile-hero"}>
          <div className={"profile-media"}>
            <button
              className={"reveal-button"}
              type={"button"}
              data-real={"img/pablo-real.jpg"}
              data-alt-real={"Foto de perfil de Pablo Macia"}
              data-volver={"Volver al caballero"}
              data-acorde={"349.23,440.00,523.25,698.46"}
              aria-pressed={real}
              onClick={() => setReal(!real)}
            >
              {real ? (
                "Volver al caballero"
              ) : (
                <>
                  <span className={"reveal-text"}>
                    {"Revelar"}
                    <span className={"reveal-largo"}>
                      {" quién está detrás del caballero"}
                    </span>
                  </span>
                </>
              )}
            </button>
            <div
              className={
                "profile-img-container" + (conjuring ? " is-conjuring" : "")
              }
              id={"profile-img"}
              style={{
                filter: hue === null ? "none" : `hue-rotate(${hue}deg)`,
              }}
            >
              <ThemedImage
                src={"/img/pablo720.webp"}
                srcSet={"/img/pablo720.webp 720w, img/pablo1500.webp 1500w"}
                sizes={"(max-width: 900px) 400px, 560px"}
                data-src-light={"/img/pablo720.webp"}
                data-src-dark={"/img/pabloDark720.webp"}
                data-srcset-light={
                  "/img/pablo720.webp 720w, img/pablo1500.webp 1500w"
                }
                data-srcset-dark={
                  "/img/pabloDark720.webp 720w, img/pabloDark1500.webp 1500w"
                }
                loading={"eager"}
                fetchpriority={"high"}
                decoding={"async"}
                alt={"Avatar ilustrado de Pablo Macia"}
                real={real}
                realSrc={"/img/" + member.id + "-real.jpg"}
                realAlt={"Foto de perfil de " + member.name}
              />
            </div>
          </div>
          <div className={"profile-details"}>
            <div className={"profile-header"}>
              <p className={"profile-role-label"}>
                {"Estrategia & movimiento"}
              </p>
              <h1>{"Pablo Macia"}</h1>
              <p className={"profile-meta"}>
                {" Buenos Aires, Argentina  •  38 años"}
              </p>
              <a
                href={"https://github.com/pablormacia"}
                target={"_blank"}
                rel={"noopener noreferrer"}
                className={"btn-github"}
                id={"github-pablo"}
                aria-label={"GitHub de Pablo Macia"}
              >
                <svg
                  viewBox={"0 0 24 24"}
                  width={"18"}
                  height={"18"}
                  fill={"currentColor"}
                  aria-hidden={"true"}
                >
                  <path
                    d={
                      "M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"
                    }
                  ></path>
                </svg>
                <span>{"GitHub"}</span>
              </a>
            </div>
            <p className={"profile-bio"}>
              {
                "\n            Une visión técnica y creatividad para que cada entrega avance con propósito.\n            Piensa el diseño como un sistema: cada decisión tiene impacto en el todo\n            y trabaja para que la experiencia final sea coherente y memorable.\n          "
              }
            </p>
            <div>
              <h2 className={"skills-heading"}>{"Habilidades Destacadas"}</h2>
              <div className={"profile-skills"} id={"skills-container"}>
                <span
                  data-hue={"30"}
                  tabIndex={0}
                  role="button"
                  aria-label={"Cambiar tono: " + "HTML"}
                  onMouseEnter={() => setHue(30)}
                  onMouseLeave={() => setHue(null)}
                  onFocus={() => setHue(30)}
                  onBlur={() => setHue(null)}
                  onClick={() => setHue(hue === null ? 30 : null)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setHue(hue === null ? 30 : null);
                    }
                  }}
                >
                  {"HTML"}
                </span>
                <span
                  data-hue={"200"}
                  tabIndex={0}
                  role="button"
                  aria-label={"Cambiar tono: " + "Javascript"}
                  onMouseEnter={() => setHue(200)}
                  onMouseLeave={() => setHue(null)}
                  onFocus={() => setHue(200)}
                  onBlur={() => setHue(null)}
                  onClick={() => setHue(hue === null ? 200 : null)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setHue(hue === null ? 200 : null);
                    }
                  }}
                >
                  {"Javascript"}
                </span>
                <span
                  data-hue={"120"}
                  tabIndex={0}
                  role="button"
                  aria-label={"Cambiar tono: " + "Git/GitHub"}
                  onMouseEnter={() => setHue(120)}
                  onMouseLeave={() => setHue(null)}
                  onFocus={() => setHue(120)}
                  onBlur={() => setHue(null)}
                  onClick={() => setHue(hue === null ? 120 : null)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setHue(hue === null ? 120 : null);
                    }
                  }}
                >
                  {"Git/GitHub"}
                </span>
                <span
                  data-hue={"280"}
                  tabIndex={0}
                  role="button"
                  aria-label={"Cambiar tono: " + "UI/UX"}
                  onMouseEnter={() => setHue(280)}
                  onMouseLeave={() => setHue(null)}
                  onFocus={() => setHue(280)}
                  onBlur={() => setHue(null)}
                  onClick={() => setHue(hue === null ? 280 : null)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setHue(hue === null ? 280 : null);
                    }
                  }}
                >
                  {"UI/UX"}
                </span>
              </div>
              <p className={"skills-hint"}>
                {"* Pasa el cursor por las habilidades para interactuar."}
              </p>
            </div>
            <div className={"profile-favorites"}>
              <div className={"fav-list"}>
                <h2>{"Series favoritas"}</h2>
                <ul>
                  <li>{"The Big Bang Theory"}</li>
                  <li>{"Breaking Bad"}</li>
                  <li>{"Dexter"}</li>
                </ul>
              </div>
              <div className={"fav-list"}>
                <h2>{"Libros Favoritos"}</h2>
                <ul>
                  <li>{"1984"}</li>
                  <li>{"Un mundo feliz"}</li>
                  <li>{"Rebelión en la granja"}</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <div className={"back-btn-container"}>
          <Link className={"btn-volver"} to={"/#equipo"}>
            <span className={"btn-volver-icon"} aria-hidden={"true"}>
              <svg
                viewBox={"0 0 24 24"}
                width={"16"}
                height={"16"}
                fill={"none"}
                stroke={"currentColor"}
                strokeWidth={"2"}
                strokeLinecap={"round"}
                strokeLinejoin={"round"}
              >
                <path d={"M19 12H5m6-6-6 6 6 6"}></path>
              </svg>
            </span>
            <span>{"Volver al equipo"}</span>
          </Link>
        </div>
      </div>
    </div>
  ),
  fernando: ({ member, real, setReal, hue, setHue, conjuring }) => (
    <div className={"section-shell"}>
      <div className={"section-inner"}>
        <section className={"profile-hero"}>
          <div className={"profile-media"}>
            <button
              className={"reveal-button"}
              type={"button"}
              data-real={"img/fernando-real.jpg"}
              data-alt-real={"Foto de perfil de Fernando Palearuzza"}
              data-volver={"Volver al guerrero"}
              data-acorde={"587.33,698.46,880.00,1174.66"}
              aria-pressed={real}
              onClick={() => setReal(!real)}
            >
              {real ? (
                "Volver al guerrero"
              ) : (
                <>
                  <span className={"reveal-text"}>
                    {"Revelar"}
                    <span className={"reveal-largo"}>
                      {" quién está detrás del guerrero"}
                    </span>
                  </span>
                </>
              )}
            </button>
            <div
              className={
                "profile-img-container" + (conjuring ? " is-conjuring" : "")
              }
              id={"profile-img"}
              style={{
                filter: hue === null ? "none" : `hue-rotate(${hue}deg)`,
              }}
            >
              <ThemedImage
                src={"/img/fernando720.webp"}
                srcSet={
                  "/img/fernando720.webp 720w, img/fernando1500.webp 1500w"
                }
                sizes={"(max-width: 900px) 400px, 560px"}
                data-src-light={"/img/fernando720.webp"}
                data-src-dark={"/img/fernandoDark720.webp"}
                data-srcset-light={
                  "/img/fernando720.webp 720w, img/fernando1500.webp 1500w"
                }
                data-srcset-dark={
                  "/img/fernandoDark720.webp 720w, img/fernandoDark1500.webp 1500w"
                }
                loading={"eager"}
                fetchpriority={"high"}
                decoding={"async"}
                alt={"Avatar ilustrado de Fernando Palearuzza"}
                real={real}
                realSrc={"/img/" + member.id + "-real.jpg"}
                realAlt={"Foto de perfil de " + member.name}
              />
            </div>
          </div>
          <div className={"profile-details"}>
            <div className={"profile-header"}>
              <p className={"profile-role-label"}>{"Contenido & empatía"}</p>
              <h1>{"Fernando Palearuzza"}</h1>
              <p className={"profile-meta"}>
                {" Buenos Aires, Argentina  •  26 años"}
              </p>
              <a
                href={"https://github.com/FerPalearuzza"}
                target={"_blank"}
                rel={"noopener noreferrer"}
                className={"btn-github"}
                id={"github-fernando"}
                aria-label={"GitHub de Fernando Palearuzza"}
              >
                <svg
                  viewBox={"0 0 24 24"}
                  width={"18"}
                  height={"18"}
                  fill={"currentColor"}
                  aria-hidden={"true"}
                >
                  <path
                    d={
                      "M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"
                    }
                  ></path>
                </svg>
                <span>{"GitHub"}</span>
              </a>
            </div>
            <p className={"profile-bio"}>
              {
                "\n            Conecta ideas y personas a través de historias claras y experiencias accesibles.\n            Apasionado por la usabilidad y la creación de interfaces que realmente resuelvan problemas\n            y mejoren la vida de los usuarios en cada interacción digital.\n          "
              }
            </p>
            <div>
              <h2 className={"skills-heading"}>{"Habilidades Destacadas"}</h2>
              <div className={"profile-skills"} id={"skills-container"}>
                <span
                  data-hue={"280"}
                  tabIndex={0}
                  role="button"
                  aria-label={"Cambiar tono: " + "Testing"}
                  onMouseEnter={() => setHue(280)}
                  onMouseLeave={() => setHue(null)}
                  onFocus={() => setHue(280)}
                  onBlur={() => setHue(null)}
                  onClick={() => setHue(hue === null ? 280 : null)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setHue(hue === null ? 280 : null);
                    }
                  }}
                >
                  {"Testing"}
                </span>
                <span
                  data-hue={"200"}
                  tabIndex={0}
                  role="button"
                  aria-label={"Cambiar tono: " + "Web"}
                  onMouseEnter={() => setHue(200)}
                  onMouseLeave={() => setHue(null)}
                  onFocus={() => setHue(200)}
                  onBlur={() => setHue(null)}
                  onClick={() => setHue(hue === null ? 200 : null)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setHue(hue === null ? 200 : null);
                    }
                  }}
                >
                  {"Web"}
                </span>
                <span
                  data-hue={"30"}
                  tabIndex={0}
                  role="button"
                  aria-label={"Cambiar tono: " + "Diseño UI"}
                  onMouseEnter={() => setHue(30)}
                  onMouseLeave={() => setHue(null)}
                  onFocus={() => setHue(30)}
                  onBlur={() => setHue(null)}
                  onClick={() => setHue(hue === null ? 30 : null)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setHue(hue === null ? 30 : null);
                    }
                  }}
                >
                  {"Diseño UI"}
                </span>
                <span
                  data-hue={"120"}
                  tabIndex={0}
                  role="button"
                  aria-label={"Cambiar tono: " + "MySQL"}
                  onMouseEnter={() => setHue(120)}
                  onMouseLeave={() => setHue(null)}
                  onFocus={() => setHue(120)}
                  onBlur={() => setHue(null)}
                  onClick={() => setHue(hue === null ? 120 : null)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setHue(hue === null ? 120 : null);
                    }
                  }}
                >
                  {"MySQL"}
                </span>
              </div>
              <p className={"skills-hint"}>
                {"* Pasa el cursor por las habilidades para interactuar."}
              </p>
            </div>
            <div className={"profile-favorites"}>
              <div className={"fav-list"}>
                <h2>{"Películas Favoritas"}</h2>
                <ul>
                  <li>{"Volver al Futuro"}</li>
                  <li>{"El planeta del Tesoro"}</li>
                  <li>{"Piratas del Caribe"}</li>
                </ul>
              </div>
              <div className={"fav-list"}>
                <h2>{"Libros Favoritos"}</h2>
                <ul>
                  <li>{"Estudio en Escarlata"}</li>
                  <li>{"All Tomorrows"}</li>
                  <li>{"La isla misteriosa"}</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <div className={"back-btn-container"}>
          <Link className={"btn-volver"} to={"/#equipo"}>
            <span className={"btn-volver-icon"} aria-hidden={"true"}>
              <svg
                viewBox={"0 0 24 24"}
                width={"16"}
                height={"16"}
                fill={"none"}
                stroke={"currentColor"}
                strokeWidth={"2"}
                strokeLinecap={"round"}
                strokeLinejoin={"round"}
              >
                <path d={"M19 12H5m6-6-6 6 6 6"}></path>
              </svg>
            </span>
            <span>{"Volver al equipo"}</span>
          </Link>
        </div>
      </div>
    </div>
  ),
};
export function ProfileContent({ member }) {
  const [real, setReal] = useState(false),
    [hue, setHue] = useState(null),
    [conjuring, setConjuring] = useState(false);
  const timers = useRef([]),
    audio = useRef(null);
  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout);
      audio.current?.close();
    },
    [],
  );
  function reveal(next) {
    if (conjuring) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReal(next);
      return;
    }
    setConjuring(true);
    timers.current.push(
      setTimeout(() => setReal(next), 450),
      setTimeout(() => setConjuring(false), 900),
    );
    const Audio = window.AudioContext || window.webkitAudioContext;
    if (!Audio) return;
    try {
      const context = audio.current || (audio.current = new Audio());
      context.resume();
      const chords = {
        juan: [261.63, 329.63, 392, 523.25],
        mariano: [392, 493.88, 587.33, 783.99],
        daniela: [440, 523.25, 659.25, 880],
        pablo: [329.63, 415.3, 493.88, 659.25],
        fernando: [587.33, 698.46, 880, 1174.66],
      };
      chords[member.id].forEach((frequency, i) => {
        const oscillator = context.createOscillator(),
          gain = context.createGain(),
          time = context.currentTime + i * 0.1;
        oscillator.type = "sine";
        oscillator.frequency.value = frequency;
        gain.gain.setValueAtTime(0.001, time);
        gain.gain.exponentialRampToValueAtTime(0.035, time + 0.025);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.45);
        oscillator.connect(gain);
        gain.connect(context.destination);
        oscillator.start(time);
        oscillator.stop(time + 0.5);
      });
    } catch {}
  }
  const View = views[member.id];
  return (
    <View
      member={member}
      real={real}
      setReal={reveal}
      hue={hue}
      setHue={setHue}
      conjuring={conjuring}
    />
  );
}
export default function Profile() {
  const { id } = useParams();
  const member = members.find((m) => m.id === id);
  return member ? <ProfileContent key={id} member={member} /> : <NotFound />;
}
