export const API_URL =
  "https://api.github.com/search/repositories?q=topic:frontend&sort=stars&order=desc&per_page=9";

export async function fetchRepositories({ signal, fetchImpl = fetch } = {}) {
  const response = await fetchImpl(API_URL, {
    signal,
    headers: { Accept: "application/vnd.github+json" },
  });
  if (!response.ok) {
    throw new Error(
      response.status === 403 || response.status === 429
        ? "GitHub alcanzó su límite de consultas. Intentá nuevamente más tarde."
        : `GitHub respondió con un error (${response.status}).`,
    );
  }
  const data = await response.json();
  if (
    !Array.isArray(data.items) ||
    data.items.some(
      (item) =>
        !item ||
        typeof item.id !== "number" ||
        typeof item.full_name !== "string" ||
        typeof item.html_url !== "string" ||
        !item.html_url.startsWith("https://github.com/") ||
        typeof item.stargazers_count !== "number",
    )
  )
    throw new Error("La API devolvió una respuesta inesperada.");
  return data.items;
}

export function apiErrorMessage(error) {
  if (error.name === "AbortError")
    return "La consulta tardó demasiado. Podés reintentar.";
  if (error instanceof TypeError)
    return "No pudimos conectar con GitHub. Revisá tu conexión y reintentá.";
  return error.message;
}
