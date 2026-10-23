export const normalize = (value) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

export const ALL_CATEGORIES = "Todas";
export const DEFAULT_FILTERS = { query: "", category: ALL_CATEGORIES };

export const categoriesOf = (resources) => [
  ALL_CATEGORIES,
  ...new Set(resources.map((resource) => resource.category)),
];

export const filterResources = (resources, { query, category }) =>
  resources.filter(
    (resource) =>
      (category === ALL_CATEGORIES || resource.category === category) &&
      normalize(
        `${resource.name} ${resource.description} ${resource.detail}`,
      ).includes(normalize(query.trim())),
  );
