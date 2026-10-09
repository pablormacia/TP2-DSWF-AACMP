import test from "node:test";
import assert from "node:assert/strict";
import { fetchRepositories, apiErrorMessage } from "../src/lib/github.js";

const repository = {
  id: 1,
  full_name: "equipo/gema",
  html_url: "https://github.com/equipo/gema",
  stargazers_count: 42,
};
test("consulta sin credenciales y devuelve los repositorios", async () => {
  const controller = new AbortController();
  const result = await fetchRepositories({
    signal: controller.signal,
    fetchImpl: async (url, options) => {
      assert.match(url, /topic:frontend/);
      assert.equal(options.signal, controller.signal);
      assert.equal(options.headers.Authorization, undefined);
      return { ok: true, json: async () => ({ items: [repository] }) };
    },
  });
  assert.deepEqual(result, [repository]);
});
test("límite de consultas produce un error recuperable", async () => {
  for (const status of [403, 429])
    await assert.rejects(
      fetchRepositories({ fetchImpl: async () => ({ ok: false, status }) }),
      /límite/,
    );
});
test("rechaza una respuesta inválida antes de renderizar tarjetas", async () => {
  for (const data of [
    {},
    { items: [null] },
    { items: [{ ...repository, stargazers_count: null }] },
  ]) {
    await assert.rejects(
      fetchRepositories({
        fetchImpl: async () => ({ ok: true, json: async () => data }),
      }),
      /inesperada/,
    );
  }
});
test("una consulta vacía es un resultado válido", async () => {
  assert.deepEqual(
    await fetchRepositories({
      fetchImpl: async () => ({ ok: true, json: async () => ({ items: [] }) }),
    }),
    [],
  );
});
test("distingue timeout, red y errores HTTP", () => {
  assert.match(
    apiErrorMessage(new DOMException("Aborted", "AbortError")),
    /tardó demasiado/,
  );
  assert.match(apiErrorMessage(new TypeError("Network error")), /conexión/);
  assert.equal(
    apiErrorMessage(new Error("GitHub respondió con un error (503).")),
    "GitHub respondió con un error (503).",
  );
});
