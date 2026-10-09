import { useState } from "react";
import { Link } from "react-router-dom";
import members from "../data/members.json";
import MemberCard from "../components/MemberCard.jsx";
import MemberSheet from "../components/MemberSheet.jsx";
import ShuffleControl from "../components/ShuffleControl.jsx";
export default function Home() {
  const [team, setTeam] = useState(members),
    [mixed, setMixed] = useState(false),
    [selected, setSelected] = useState(null);
  function shuffle() {
    setTeam((previous) => {
      const next = [...previous];
      for (let i = next.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [next[i], next[j]] = [next[j], next[i]];
      }
      if (next.every((m, i) => m === previous[i])) next.push(next.shift());
      return next;
    });
    setMixed(true);
  }
  return (
    <>
      <section className={"hero section-shell"} aria-labelledby={"hero-title"}>
        <div className={"hero-copy"}>
          <p className={"eyebrow"}>{"Cinco mentes · Una misma misión"}</p>
          <h1 id={"hero-title"}>
            {"AACMP"}
            <span>
              <em>{"Frontend"}</em>
              {" Gems"}
            </span>
          </h1>
          <p className={"hero-lead"}>
            {
              "Somos un equipo Front End. Unimos ideas, diseño y código para crear experiencias web con identidad."
            }
          </p>
          <div className={"hero-actions"}>
            <a
              className={"btn-leaf"}
              href={"#equipo"}
              id={"btn-conoce-equipo"}
              aria-label={"Conocer al equipo"}
            >
              <svg
                className={"cta-icon"}
                viewBox={"0 0 24 24"}
                fill={"none"}
                stroke={"currentColor"}
                strokeWidth={"1.8"}
                strokeLinecap={"round"}
                strokeLinejoin={"round"}
                aria-hidden={"true"}
              >
                <circle cx={"9"} cy={"8"} r={"3.2"}></circle>
                <path d={"M3.5 19c.6-3.2 2.8-5 5.5-5s4.9 1.8 5.5 5"}></path>
                <circle cx={"17"} cy={"9"} r={"2.4"}></circle>
                <path d={"M16 14.2c2.4-.2 4.1 1.3 4.5 4.3"}></path>
              </svg>
              <span className={"cta-long"}>{"Conocer al equipo"}</span>
              <span className={"cta-short"}>{"Equipo"}</span>
              <span className={"cta-arrow"} aria-hidden={"true"}>
                {"→"}
              </span>
            </a>
            <Link
              className={"btn-stone"}
              id={"btn-ver-proceso"}
              aria-label={"Ver Bitácora"}
              to={"/bitacora"}
            >
              <svg
                className={"cta-icon"}
                viewBox={"0 0 24 24"}
                fill={"none"}
                stroke={"currentColor"}
                strokeWidth={"1.8"}
                strokeLinecap={"round"}
                strokeLinejoin={"round"}
                aria-hidden={"true"}
              >
                <path d={"M5 4.5h11a2 2 0 0 1 2 2V20H7a2 2 0 0 1-2-2Z"}></path>
                <path d={"M5 18a2 2 0 0 1 2-2h11"}></path>
                <path d={"M9 8.5h5M9 11.5h3"}></path>
              </svg>
              <span className={"cta-long"}>{"Ver Bitácora"}</span>
              <span className={"cta-short"}>{"Bitácora"}</span>
              <span className={"cta-arrow"} aria-hidden={"true"}>
                {"↗"}
              </span>
            </Link>
          </div>
        </div>
        <div className={"digital-core"} aria-hidden={"true"}>
          <div className={"core-halo"}></div>
          <svg className={"core-orbits"} viewBox={"0 0 520 400"} fill={"none"}>
            <defs>
              <linearGradient
                id={"orbitGradient"}
                x1={"0"}
                y1={"0"}
                x2={"1"}
                y2={"0"}
              >
                <stop offset={"0"} className={"orbit-stop-a"}></stop>
                <stop offset={"1"} className={"orbit-stop-b"}></stop>
              </linearGradient>
              <path
                id={"orbitPath1"}
                d={"M 32,220 A 228,78,0,1,1 488,220 A 228,78,0,1,1 32,220"}
                transform={"rotate(-16 260 220)"}
              ></path>
              <path
                id={"orbitPath2"}
                d={"M 50,220 A 210,94,0,1,1 470,220 A 210,94,0,1,1 50,220"}
                transform={"rotate(22 260 220)"}
              ></path>
              <path
                id={"orbitPath3"}
                d={"M 104,202 A 156,165,0,1,1 416,202 A 156,165,0,1,1 104,202"}
                transform={"rotate(34 260 202)"}
              ></path>
            </defs>
            <ellipse
              cx={"260"}
              cy={"220"}
              rx={"228"}
              ry={"78"}
              transform={"rotate(-16 260 220)"}
            ></ellipse>
            <ellipse
              cx={"260"}
              cy={"220"}
              rx={"210"}
              ry={"94"}
              transform={"rotate(22 260 220)"}
            ></ellipse>
            <ellipse
              className={"orbit-fine"}
              cx={"260"}
              cy={"202"}
              rx={"156"}
              ry={"165"}
              transform={"rotate(34 260 202)"}
            ></ellipse>
            <g className={"orbit-nodes"}>
              <circle r={"4"} className={"orbit-light orbit-light-1"}>
                <animateMotion
                  dur={"8s"}
                  repeatCount={"indefinite"}
                  begin={"0s"}
                >
                  <mpath href={"#orbitPath1"}></mpath>
                </animateMotion>
              </circle>
              <circle r={"3"} className={"orbit-light orbit-light-2"}>
                <animateMotion
                  dur={"8s"}
                  repeatCount={"indefinite"}
                  begin={"-4s"}
                >
                  <mpath href={"#orbitPath1"}></mpath>
                </animateMotion>
              </circle>
              <circle
                r={"3"}
                className={"orbit-light orbit-light-violet orbit-light-3"}
              >
                <animateMotion
                  dur={"11s"}
                  repeatCount={"indefinite"}
                  begin={"-2s"}
                >
                  <mpath href={"#orbitPath2"}></mpath>
                </animateMotion>
              </circle>
              <circle r={"4"} className={"orbit-light orbit-light-4"}>
                <animateMotion
                  dur={"11s"}
                  repeatCount={"indefinite"}
                  begin={"-7s"}
                >
                  <mpath href={"#orbitPath2"}></mpath>
                </animateMotion>
              </circle>
              <circle
                r={"2.5"}
                className={"orbit-light orbit-light-violet orbit-light-5"}
              >
                <animateMotion
                  dur={"15s"}
                  repeatCount={"indefinite"}
                  begin={"-5s"}
                >
                  <mpath href={"#orbitPath3"}></mpath>
                </animateMotion>
              </circle>
            </g>
          </svg>
          <div className={"core-platform"}>
            <i></i>
          </div>
          <div className={"gem-crystal"} aria-hidden={"true"}>
            <svg
              className={"gem-svg"}
              viewBox={"0 0 180 200"}
              xmlns={"http://www.w3.org/2000/svg"}
            >
              <defs>
                <filter
                  id={"gemGlow"}
                  x={"-30%"}
                  y={"-30%"}
                  width={"160%"}
                  height={"160%"}
                >
                  <feGaussianBlur
                    in={"SourceGraphic"}
                    stdDeviation={"2.5"}
                    result={"blur"}
                  ></feGaussianBlur>
                  <feMerge>
                    <feMergeNode in={"blur"}></feMergeNode>
                    <feMergeNode in={"SourceGraphic"}></feMergeNode>
                  </feMerge>
                </filter>
                <filter
                  id={"softInner"}
                  x={"-10%"}
                  y={"-10%"}
                  width={"120%"}
                  height={"120%"}
                >
                  <feGaussianBlur
                    in={"SourceGraphic"}
                    stdDeviation={"1.5"}
                  ></feGaussianBlur>
                </filter>
                <filter
                  id={"glassRefract"}
                  x={"-5%"}
                  y={"-5%"}
                  width={"110%"}
                  height={"110%"}
                >
                  <feTurbulence
                    type={"fractalNoise"}
                    baseFrequency={"0.65"}
                    numOctaves={"2"}
                    result={"noise"}
                  ></feTurbulence>
                  <feDisplacementMap
                    in={"SourceGraphic"}
                    in2={"noise"}
                    scale={"1.2"}
                    result={"distorted"}
                  ></feDisplacementMap>
                  <feGaussianBlur
                    in={"distorted"}
                    stdDeviation={"0.3"}
                  ></feGaussianBlur>
                </filter>
                <linearGradient
                  id={"facetCoral"}
                  x1={"0%"}
                  y1={"0%"}
                  x2={"100%"}
                  y2={"100%"}
                >
                  <stop
                    offset={"0%"}
                    stopColor={"#FDEAE8"}
                    stopOpacity={"0.72"}
                  ></stop>
                  <stop
                    offset={"40%"}
                    stopColor={"#D4A8A0"}
                    stopOpacity={"0.45"}
                  ></stop>
                  <stop
                    offset={"100%"}
                    stopColor={"#C48878"}
                    stopOpacity={"0.28"}
                  ></stop>
                </linearGradient>
                <linearGradient
                  id={"facetBlue"}
                  x1={"0%"}
                  y1={"0%"}
                  x2={"100%"}
                  y2={"100%"}
                >
                  <stop
                    offset={"0%"}
                    stopColor={"#EAF4FA"}
                    stopOpacity={"0.70"}
                  ></stop>
                  <stop
                    offset={"40%"}
                    stopColor={"#A8C4D4"}
                    stopOpacity={"0.42"}
                  ></stop>
                  <stop
                    offset={"100%"}
                    stopColor={"#7AAAC4"}
                    stopOpacity={"0.25"}
                  ></stop>
                </linearGradient>
                <linearGradient
                  id={"facetGold"}
                  x1={"0%"}
                  y1={"100%"}
                  x2={"100%"}
                  y2={"0%"}
                >
                  <stop
                    offset={"0%"}
                    stopColor={"#FBF0D8"}
                    stopOpacity={"0.68"}
                  ></stop>
                  <stop
                    offset={"40%"}
                    stopColor={"#C4A05C"}
                    stopOpacity={"0.40"}
                  ></stop>
                  <stop
                    offset={"100%"}
                    stopColor={"#E0C88C"}
                    stopOpacity={"0.22"}
                  ></stop>
                </linearGradient>
                <linearGradient
                  id={"facetGreen"}
                  x1={"100%"}
                  y1={"0%"}
                  x2={"0%"}
                  y2={"100%"}
                >
                  <stop
                    offset={"0%"}
                    stopColor={"#E8F4E2"}
                    stopOpacity={"0.70"}
                  ></stop>
                  <stop
                    offset={"40%"}
                    stopColor={"#87A878"}
                    stopOpacity={"0.42"}
                  ></stop>
                  <stop
                    offset={"100%"}
                    stopColor={"#6B8E6B"}
                    stopOpacity={"0.25"}
                  ></stop>
                </linearGradient>
                <linearGradient
                  id={"facetLavender"}
                  x1={"0%"}
                  y1={"0%"}
                  x2={"100%"}
                  y2={"100%"}
                >
                  <stop
                    offset={"0%"}
                    stopColor={"#F0EDF8"}
                    stopOpacity={"0.70"}
                  ></stop>
                  <stop
                    offset={"40%"}
                    stopColor={"#C4B8D8"}
                    stopOpacity={"0.42"}
                  ></stop>
                  <stop
                    offset={"100%"}
                    stopColor={"#A898CC"}
                    stopOpacity={"0.25"}
                  ></stop>
                </linearGradient>
                <radialGradient
                  id={"facetCenter"}
                  cx={"38%"}
                  cy={"30%"}
                  r={"60%"}
                >
                  <stop
                    offset={"0%"}
                    stopColor={"#FFFFFF"}
                    stopOpacity={"0.92"}
                  ></stop>
                  <stop
                    offset={"30%"}
                    stopColor={"#F8FAFF"}
                    stopOpacity={"0.55"}
                  ></stop>
                  <stop
                    offset={"70%"}
                    stopColor={"#E8F0F8"}
                    stopOpacity={"0.18"}
                  ></stop>
                  <stop
                    offset={"100%"}
                    stopColor={"#D0DDF0"}
                    stopOpacity={"0.05"}
                  ></stop>
                </radialGradient>
                <linearGradient
                  id={"glassSheen"}
                  x1={"0%"}
                  y1={"0%"}
                  x2={"60%"}
                  y2={"100%"}
                >
                  <stop
                    offset={"0%"}
                    stopColor={"#FFFFFF"}
                    stopOpacity={"0.50"}
                  ></stop>
                  <stop
                    offset={"50%"}
                    stopColor={"#FFFFFF"}
                    stopOpacity={"0.08"}
                  ></stop>
                  <stop
                    offset={"100%"}
                    stopColor={"#FFFFFF"}
                    stopOpacity={"0.00"}
                  ></stop>
                </linearGradient>
                <radialGradient id={"gemAura"} cx={"50%"} cy={"50%"} r={"50%"}>
                  <stop
                    offset={"0%"}
                    stopColor={"#C4D8F0"}
                    stopOpacity={"0.22"}
                  ></stop>
                  <stop
                    offset={"50%"}
                    stopColor={"#A8C4D4"}
                    stopOpacity={"0.10"}
                  ></stop>
                  <stop
                    offset={"100%"}
                    stopColor={"#E0D8F8"}
                    stopOpacity={"0"}
                  ></stop>
                </radialGradient>
                <linearGradient
                  id={"crystalCrown"}
                  x1={"0"}
                  y1={"0"}
                  x2={"1"}
                  y2={"1"}
                >
                  <stop stopColor={"#e2edff"}></stop>
                  <stop offset={".48"} stopColor={"#aa9afa"}></stop>
                  <stop offset={"1"} stopColor={"#6754cf"}></stop>
                </linearGradient>
                <linearGradient
                  id={"crystalSky"}
                  x1={"0"}
                  y1={"0"}
                  x2={".8"}
                  y2={"1"}
                >
                  <stop stopColor={"#dcfaff"}></stop>
                  <stop offset={".4"} stopColor={"#7ecef4"}></stop>
                  <stop offset={"1"} stopColor={"#4475c7"}></stop>
                </linearGradient>
                <linearGradient
                  id={"crystalDepth"}
                  x1={"0"}
                  y1={"0"}
                  x2={"1"}
                  y2={".8"}
                >
                  <stop stopColor={"#8473d6"}></stop>
                  <stop offset={".45"} stopColor={"#564ba9"}></stop>
                  <stop offset={"1"} stopColor={"#aba3ee"}></stop>
                </linearGradient>
                <linearGradient
                  id={"crystalIce"}
                  x1={"0"}
                  y1={"0"}
                  x2={"1"}
                  y2={"1"}
                >
                  <stop stopColor={"#b8f5ff"}></stop>
                  <stop offset={".32"} stopColor={"#54b6e4"}></stop>
                  <stop offset={"1"} stopColor={"#4d65be"}></stop>
                </linearGradient>
                <linearGradient
                  id={"crystalTip"}
                  x1={"0"}
                  y1={"0"}
                  x2={".8"}
                  y2={"1"}
                >
                  <stop stopColor={"#aaa0fa"}></stop>
                  <stop offset={".55"} stopColor={"#7761d2"}></stop>
                  <stop offset={"1"} stopColor={"#c4d8ff"}></stop>
                </linearGradient>
                <linearGradient
                  id={"crystalReflection"}
                  x1={"0"}
                  y1={"0"}
                  x2={"1"}
                  y2={"1"}
                >
                  <stop stopColor={"#eefcff"} stopOpacity={".7"}></stop>
                  <stop
                    offset={".5"}
                    stopColor={"#b9eeff"}
                    stopOpacity={".08"}
                  ></stop>
                  <stop
                    offset={"1"}
                    stopColor={"#7c6cf5"}
                    stopOpacity={".3"}
                  ></stop>
                </linearGradient>
                <radialGradient id={"crystalHeart"}>
                  <stop stopColor={"#d5f7ff"} stopOpacity={".8"}></stop>
                  <stop
                    offset={".32"}
                    stopColor={"#7fddff"}
                    stopOpacity={".32"}
                  ></stop>
                  <stop
                    offset={"1"}
                    stopColor={"#8d7dfa"}
                    stopOpacity={"0"}
                  ></stop>
                </radialGradient>
              </defs>
              <ellipse
                cx={"90"}
                cy={"108"}
                rx={"72"}
                ry={"78"}
                fill={"url(#gemAura)"}
                className={"gem-aura-el"}
              ></ellipse>
              <polygon
                points={"90,42 34,88 54,148"}
                fill={"rgba(180,210,240,0.06)"}
                className={"gem-shadow"}
              ></polygon>
              <polygon
                points={"90,42 146,88 126,148"}
                fill={"rgba(180,210,240,0.05)"}
                className={"gem-shadow"}
              ></polygon>
              <polygon
                className={"gem-facet facet-pablo"}
                points={"90,42 34,88 90,78"}
                fill={"url(#facetCoral)"}
                filter={"url(#gemGlow)"}
              ></polygon>
              <polygon
                className={"gem-facet facet-juan"}
                points={"90,42 146,88 90,78"}
                fill={"url(#facetBlue)"}
                filter={"url(#gemGlow)"}
              ></polygon>
              <polygon
                className={"gem-facet facet-daniela"}
                points={"34,88 54,148 90,78"}
                fill={"url(#facetGold)"}
                filter={"url(#gemGlow)"}
              ></polygon>
              <polygon
                className={"gem-facet facet-mariano"}
                points={"146,88 126,148 90,78"}
                fill={"url(#facetGreen)"}
                filter={"url(#gemGlow)"}
              ></polygon>
              <polygon
                className={"gem-facet facet-fernando"}
                points={"54,148 90,174 126,148 90,78"}
                fill={"url(#facetLavender)"}
                filter={"url(#gemGlow)"}
              ></polygon>
              <polygon
                points={"90,42 34,88 54,148 90,174 126,148 146,88"}
                fill={"url(#glassSheen)"}
                opacity={"0.85"}
              ></polygon>
              <polygon
                points={"90,42 34,88 90,78 146,88"}
                fill={"url(#facetCenter)"}
                opacity={"0.75"}
              ></polygon>
              <g
                stroke={"rgba(180,210,255,0.22)"}
                strokeWidth={"0.7"}
                fill={"none"}
              >
                <line x1={"90"} y1={"42"} x2={"34"} y2={"88"}></line>
                <line x1={"90"} y1={"42"} x2={"146"} y2={"88"}></line>
                <line x1={"34"} y1={"88"} x2={"90"} y2={"78"}></line>
                <line x1={"146"} y1={"88"} x2={"90"} y2={"78"}></line>
                <line x1={"34"} y1={"88"} x2={"54"} y2={"148"}></line>
                <line x1={"146"} y1={"88"} x2={"126"} y2={"148"}></line>
                <line x1={"54"} y1={"148"} x2={"90"} y2={"174"}></line>
                <line x1={"126"} y1={"148"} x2={"90"} y2={"174"}></line>
                <line x1={"54"} y1={"148"} x2={"126"} y2={"148"}></line>
                <line x1={"90"} y1={"78"} x2={"54"} y2={"148"}></line>
                <line x1={"90"} y1={"78"} x2={"126"} y2={"148"}></line>
              </g>
              <g
                stroke={"rgba(255,255,255,0.80)"}
                strokeWidth={"1.4"}
                fill={"none"}
              >
                <line x1={"90"} y1={"42"} x2={"34"} y2={"88"}></line>
                <line x1={"90"} y1={"42"} x2={"90"} y2={"78"}></line>
                <line x1={"90"} y1={"42"} x2={"146"} y2={"88"}></line>
              </g>
              <g
                stroke={"rgba(255,255,255,0.35)"}
                strokeWidth={"0.9"}
                fill={"none"}
              >
                <line x1={"54"} y1={"148"} x2={"90"} y2={"174"}></line>
                <line x1={"126"} y1={"148"} x2={"90"} y2={"174"}></line>
              </g>
              <circle
                className={"gem-sparkle main-sparkle"}
                cx={"76"}
                cy={"58"}
                r={"4.5"}
                fill={"white"}
                opacity={"0.9"}
              ></circle>
              <circle
                cx={"76"}
                cy={"58"}
                r={"2"}
                fill={"white"}
                opacity={"1"}
              ></circle>
              <circle
                className={"gem-sparkle sec-sparkle"}
                cx={"110"}
                cy={"66"}
                r={"2.5"}
                fill={"rgba(255,252,245,0.85)"}
                opacity={"0.7"}
              ></circle>
              <g className={"gem-sparkle cross-sparkle"} opacity={"0.7"}>
                <line
                  x1={"76"}
                  y1={"52"}
                  x2={"76"}
                  y2={"64"}
                  stroke={"white"}
                  strokeWidth={"1"}
                ></line>
                <line
                  x1={"70"}
                  y1={"58"}
                  x2={"82"}
                  y2={"58"}
                  stroke={"white"}
                  strokeWidth={"1"}
                ></line>
              </g>
              <g className={"crystal-optics"} pointerEvents={"none"}>
                <polygon
                  points={"90,42 82,82 90,174 94,80"}
                  fill={"url(#crystalReflection)"}
                ></polygon>
                <polygon
                  points={"34,88 68,112 54,148 78,116 90,78"}
                  fill={"url(#crystalReflection)"}
                  opacity={".4"}
                ></polygon>
                <polygon
                  points={"90,78 126,148 116,107 146,88"}
                  fill={"url(#crystalReflection)"}
                  opacity={".6"}
                ></polygon>
                <ellipse
                  className={"crystal-heart"}
                  cx={"90"}
                  cy={"112"}
                  rx={"29"}
                  ry={"42"}
                  fill={"url(#crystalHeart)"}
                ></ellipse>
                <path
                  d={"M90 43 90 78 54 148 M90 78 126 148 M90 78 90 173"}
                  fill={"none"}
                  stroke={"#d6edff"}
                  strokeOpacity={".6"}
                  strokeWidth={".65"}
                ></path>
                <path
                  d={"M90 43 35 88 54 147 M91 44 145 88"}
                  fill={"none"}
                  stroke={"#ecfbff"}
                  strokeOpacity={".8"}
                  strokeWidth={"1"}
                ></path>
              </g>
            </svg>
            <div className={"gem-dust gd-1"}></div>
            <div className={"gem-dust gd-2"}></div>
            <div className={"gem-dust gd-3"}></div>
            <div className={"gem-dust gd-4"}></div>
            <div className={"gem-dust gd-5"}></div>
          </div>
          <span className={"tech-node node-code"}>{"</>"}</span>
          <span className={"tech-node node-html"}>{"HTML"}</span>
          <span className={"tech-node node-css"}>{"CSS"}</span>
          <span className={"tech-node node-js"}>{"JS"}</span>
          <span className={"core-caption"}>
            <span>{"Ideas"}</span>
            <span>{"Código"}</span>
            <span>{"Personas"}</span>
            <span>{"Impacto"}</span>
          </span>
        </div>
      </section>
      <section id={"equipo"} className={"team-section section-shell"}>
        <div className={"section-heading"}>
          <div>
            <p className={"label-tag"}>{"El equipo"}</p>
            <h2>{"Cinco almas, una misión."}</h2>
            <p className={"team-intro"}>
              {"Investigamos, diseñamos, probamos y aprendemos en conjunto."}
            </p>
          </div>
          <ShuffleControl onShuffle={shuffle} />
          <span id={"shuffle-hint"} className={"sr-only"}>
            {"También podés arrastrar el control hacia la derecha."}
          </span>
          <p id="shuffle-status" className="sr-only" aria-live="polite">
            {mixed
              ? "Tarjetas mezcladas. Nuevo orden: " +
                team.map((m) => m.name).join(", ") +
                "."
              : ""}
          </p>
        </div>
        <div
          id="team-grid"
          className={mixed ? "team-grid is-shuffled" : "team-grid"}
        >
          {team.map((member, index) => (
            <MemberCard
              key={member.id}
              member={member}
              index={index}
              onOpen={(member, source) => setSelected({ member, source })}
            />
          ))}
        </div>
        <MemberSheet
          member={selected?.member}
          source={selected?.source}
          onClose={() => setSelected(null)}
        />
      </section>
      <section
        className={"essence section-shell"}
        aria-labelledby={"essence-title"}
      >
        <div className={"essence-aside"} aria-hidden={"true"}>
          <svg className={"essence-gem"} viewBox={"34 28 112 160"}>
            <g
              transform={"translate(90 108) scale(.86 1.1) translate(-90 -108)"}
            >
              <polygon
                points={"90,42 34,88 90,78"}
                fill={"url(#crystalCrown)"}
              ></polygon>
              <polygon
                points={"90,42 146,88 90,78"}
                fill={"url(#crystalSky)"}
              ></polygon>
              <polygon
                points={"34,88 54,148 90,78"}
                fill={"url(#crystalDepth)"}
              ></polygon>
              <polygon
                points={"146,88 126,148 90,78"}
                fill={"url(#crystalIce)"}
              ></polygon>
              <polygon
                points={"54,148 90,174 126,148 90,78"}
                fill={"url(#crystalTip)"}
              ></polygon>
              <polygon
                points={"90,42 82,82 90,174 94,80"}
                fill={"url(#crystalReflection)"}
              ></polygon>
              <ellipse
                cx={"90"}
                cy={"112"}
                rx={"30"}
                ry={"40"}
                fill={"url(#crystalHeart)"}
              ></ellipse>
              <path
                d={"M90 43V78L54 148M90 78l36 70M90 78v95"}
                fill={"none"}
                stroke={"#d6edff"}
                strokeOpacity={".55"}
                strokeWidth={".8"}
              ></path>
              <path
                d={
                  "M90 42 34 88 54 148 90 174 126 148 146 88Z M34 88 90 78 146 88"
                }
                fill={"none"}
                stroke={"#ecfbff"}
                strokeOpacity={".75"}
                strokeWidth={"1.1"}
                strokeLinejoin={"round"}
              ></path>
            </g>
            <g
              className={"essence-sparkle"}
              stroke={"#fff"}
              strokeLinecap={"round"}
            >
              <path
                d={"M77 52v12M71 58h12"}
                strokeWidth={"1"}
                opacity={".75"}
              ></path>
              <circle
                cx={"77"}
                cy={"58"}
                r={"1.8"}
                fill={"#fff"}
                stroke={"none"}
              ></circle>
            </g>
          </svg>
        </div>
        <div className={"essence-content"}>
          <p className={"label-tag"}>{"Nuestra esencia"}</p>
          <h2 id={"essence-title"}>
            {"Distintas miradas."}
            <br />
            <em>{"Una misma construcción."}</em>
          </h2>
          <p className={"essence-text"}>
            {
              "Cada integrante aporta habilidades, ideas y una forma propia de resolver problemas. El proyecto toma forma cuando esas diferencias se combinan, como las facetas de una misma gema."
            }
          </p>
          <ul
            className={"essence-facets"}
            aria-label={"Las cinco facetas del equipo"}
          >
            <li data-member={"juan"}>{"Análisis & calidad"}</li>
            <li data-member={"mariano"}>{"Código & lógica"}</li>
            <li data-member={"daniela"}>{"Diseño & detalle"}</li>
            <li data-member={"pablo"}>{"Estrategia & movimiento"}</li>
            <li data-member={"fernando"}>{"Contenido & empatía"}</li>
          </ul>
        </div>
      </section>
      <section className={"cta section-shell"} aria-labelledby={"log-title"}>
        <div className={"cta-inner"}>
          <div className={"log-symbol"} aria-hidden={"true"}>
            <span>{"</>"}</span>
            <i></i>
            <i></i>
            <i></i>
          </div>
          <div className={"cta-text"}>
            <p>{"Nuestra Bitácora"}</p>
            <h2 id={"log-title"}>{"La misión también se documenta."}</h2>
            <p className={"cta-description"}>
              {
                "Decisiones, desafíos y aprendizajes que nos hacen crecer como equipo."
              }
            </p>
          </div>
          <Link className={"button light"} id={"btn-bitacora"} to={"/bitacora"}>
            {"Ir a la Bitácora "}
            <span aria-hidden={"true"}>{"↗"}</span>
          </Link>
        </div>
      </section>
    </>
  );
}
