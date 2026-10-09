import { useEffect, useRef, useState } from "react";

export default function ShuffleControl({ onShuffle }) {
  const gesture = useRef(null),
    ignoreClick = useRef(0),
    timer = useRef(null);
  const [offset, setOffset] = useState(0),
    [done, setDone] = useState(false);
  const max = useRef(1);
  useEffect(() => () => clearTimeout(timer.current), []);
  function shuffle() {
    onShuffle();
    setDone(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setDone(false), 450);
  }
  return (
    <button
      id="shuffle-team"
      className={`shuffle-slider ${gesture.current ? "is-dragging" : ""} ${done ? "is-done" : ""}`}
      type="button"
      aria-label="Mezclar tarjetas"
      aria-describedby="shuffle-hint"
      style={{ "--knob-x": `${offset}px`, "--progress": offset / max.current }}
      onPointerDown={(event) => {
        if (event.button !== 0) return;
        max.current =
          event.currentTarget.clientWidth -
          event.currentTarget.querySelector(".shuffle-knob").offsetWidth -
          8;
        gesture.current = { start: event.clientX, dragged: false, offset: 0 };
        event.currentTarget.setPointerCapture(event.pointerId);
      }}
      onPointerMove={(event) => {
        const g = gesture.current;
        if (!g) return;
        const distance = event.clientX - g.start;
        if (Math.abs(distance) > 4) g.dragged = true;
        g.offset = Math.max(0, Math.min(distance, max.current));
        setOffset(g.offset);
      }}
      onPointerUp={() => {
        const g = gesture.current;
        if (!g) return;
        if (g.dragged) {
          ignoreClick.current = Date.now() + 400;
          if (g.offset >= max.current - 2) shuffle();
        }
        gesture.current = null;
        setOffset(0);
      }}
      onPointerCancel={() => {
        gesture.current = null;
        setOffset(0);
      }}
      onClick={() => {
        if (Date.now() >= ignoreClick.current) shuffle();
      }}
    >
      <span className="shuffle-fill" aria-hidden="true" />
      <span className="shuffle-knob" aria-hidden="true">
        ↻
      </span>
      <span className="shuffle-label">Mezclar tarjetas</span>
    </button>
  );
}
