import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  ALL_CATEGORIES,
  DEFAULT_FILTERS,
  categoriesOf,
  filterResources,
} from "../src/lib/resources.js";

const resources = [
  {
    id: 1,
    name: "Diseño Rápido",
    category: "Diseño",
    description: "Bocetos visuales",
    detail: "Prototipos para el equipo",
  },
  {
    id: 2,
    name: "React",
    category: "Desarrollo",
    description: "Interfaz de usuario",
    detail: "Componentes reutilizables",
  },
  {
    id: 3,
    name: "Figma",
    category: "Diseño",
    description: "Diseño colaborativo",
    detail: "Maquetas compartidas",
  },
];

test("busca recursos por nombre", () => {
  assert.deepEqual(
    filterResources(resources, { query: "React", category: ALL_CATEGORIES }),
    [resources[1]],
  );
});

test("la búsqueda ignora mayúsculas y tildes", () => {
  assert.deepEqual(
    filterResources(resources, { query: "RAPIDO", category: ALL_CATEGORIES }),
    [resources[0]],
  );
});

test("filtra por categoría", () => {
  assert.deepEqual(
    filterResources(resources, { query: "", category: "Diseño" }),
    [resources[0], resources[2]],
  );
});

test("combina búsqueda y categoría", () => {
  assert.deepEqual(
    filterResources(resources, { query: "diseño", category: "Diseño" }),
    [resources[0], resources[2]],
  );
  assert.deepEqual(
    filterResources(resources, { query: "prototipos", category: "Desarrollo" }),
    [],
  );
});

test("devuelve una lista vacía cuando no hay coincidencias", () => {
  assert.deepEqual(
    filterResources(resources, { query: "inexistente", category: ALL_CATEGORIES }),
    [],
  );
});

test("los filtros predeterminados restablecen la lista completa", () => {
  assert.deepEqual(filterResources(resources, DEFAULT_FILTERS), resources);
});

test("una búsqueda de solo espacios equivale a no buscar", () => {
  assert.deepEqual(
    filterResources(resources, { query: "   ", category: ALL_CATEGORIES }),
    resources,
  );
});

test("lee el catálogo local y conserva el orden de sus categorías", () => {
  const catalog = JSON.parse(
    readFileSync(new URL("../src/data/resources.json", import.meta.url), "utf8"),
  );
  assert.ok(catalog.length >= 20);
  assert.equal(categoriesOf(catalog)[0], ALL_CATEGORIES);
  assert.deepEqual(categoriesOf(resources), [ALL_CATEGORIES, "Diseño", "Desarrollo"]);
});
