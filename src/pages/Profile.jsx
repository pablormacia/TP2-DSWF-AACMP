import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import members from "../data/members.json";
import ThemedImage from "../components/ThemedImage.jsx";
import NotFound from "../components/NotFound.jsx";

const GITHUB_ICON_PATH =
  "M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z";

// "de" y "a" se contraen con "el": del mago, al mago; con "la" no: de la elfa.
function withPreposition(preposition, alias) {
  return alias.startsWith("el ")
    ? `${preposition}l ${alias.slice(3)}`
    : `${preposition} ${alias}`;
}

function SkillBadge({ label, hueAngle, currentHue, setHue }) {
  const toggle = () => setHue(currentHue === hueAngle ? null : hueAngle);
  const onKey = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
  };
  return (
    <span
      data-hue={hueAngle}
      tabIndex={0}
      role="button"
      aria-label={`Cambiar tono: ${label}`}
      onMouseEnter={() => setHue(hueAngle)}
      onMouseLeave={() => setHue(null)}
      onFocus={() => setHue(hueAngle)}
      onBlur={() => setHue(null)}
      onClick={toggle}
      onKeyDown={onKey}
    >
      {label}
    </span>
  );
}

function ProfileView({ member, real, setReal, hue, setHue, conjuring }) {
  const id = member.id;

  return (
    <div className="section-shell">
      <div className="section-inner">
        <section className="profile-hero">
          <div className="profile-media">
            <button
              className="reveal-button"
              type="button"
              aria-pressed={real}
              onClick={() => setReal(!real)}
            >
              {real ? (
                `Volver ${withPreposition("a", member.alias)}`
              ) : (
                <span className="reveal-text">
                  Revelar
                  <span className="reveal-largo">
                    {` quién está detrás ${withPreposition("de", member.alias)}`}
                  </span>
                </span>
              )}
            </button>

            <div
              className={`profile-img-container${conjuring ? " is-conjuring" : ""}`}
              id="profile-img"
              style={{ filter: hue === null ? "none" : `hue-rotate(${hue}deg)` }}
            >
              <ThemedImage
                src={`/img/${id}720.webp`}
                srcSet={`/img/${id}720.webp 720w, /img/${id}1500.webp 1500w`}
                sizes="(max-width: 900px) 400px, 560px"
                data-src-light={`/img/${id}720.webp`}
                data-src-dark={`/img/${id}Dark720.webp`}
                data-srcset-light={`/img/${id}720.webp 720w, /img/${id}1500.webp 1500w`}
                data-srcset-dark={`/img/${id}Dark720.webp 720w, /img/${id}Dark1500.webp 1500w`}
                loading="eager"
                fetchpriority="high"
                decoding="async"
                alt={`Avatar ilustrado de ${member.name}`}
                real={real}
                realSrc={`/img/${id}-real.jpg`}
                realAlt={`Foto de perfil de ${member.name}`}
              />
            </div>
          </div>

          <div className="profile-details">
            <div className="profile-header">
              <p className="profile-role-label">{member.role}</p>
              <h1>{member.name}</h1>
              <p className="profile-meta">{member.meta}</p>
              <a
                href={member.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-github"
                id={`github-${id}`}
                aria-label={`GitHub de ${member.name}`}
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                  <path d={GITHUB_ICON_PATH} />
                </svg>
                <span>GitHub</span>
              </a>
            </div>

            <p className="profile-bio">{member.bio}</p>

            <div>
              <h2 className="skills-heading">Habilidades Destacadas</h2>
              <div className="profile-skills" id="skills-container">
                {member.skills.map((skill, i) => (
                  <SkillBadge
                    key={skill}
                    label={skill}
                    hueAngle={member.skillHues[i]}
                    currentHue={hue}
                    setHue={setHue}
                  />
                ))}
              </div>
              <p className="skills-hint">
                * Pasa el cursor por las habilidades para interactuar.
              </p>
            </div>

            <div className="profile-favorites">
              {member.favorites.map((group) => (
                <div key={group.title} className="fav-list">
                  <h2>{group.title}</h2>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="back-btn-container">
          <Link className="btn-volver" to="/#equipo">
            <span className="btn-volver-icon" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5m6-6-6 6 6 6" />
              </svg>
            </span>
            <span>Volver al equipo</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

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

  const chords = {
    juan:     [261.63, 329.63, 392,    523.25],
    mariano:  [392,    493.88, 587.33, 783.99],
    daniela:  [440,    523.25, 659.25, 880],
    pablo:    [329.63, 415.3,  493.88, 659.25],
    fernando: [587.33, 698.46, 880,    1174.66],
  };

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
      (chords[member.id] || []).forEach((frequency, i) => {
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

  return (
    <ProfileView
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
