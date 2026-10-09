const tree = {
  name: "BrowserRouter",
  children: [
    {
      name: "App",
      children: [
        {
          name: "Layout",
          children: [
            { name: "Header" },
            { name: "Sidebar" },
            {
              name: "Outlet · una página según la ruta",
              children: [
                {
                  name: "Home",
                  children: [
                    { name: "ShuffleControl" },
                    {
                      name: "MemberCard × 5",
                      children: [{ name: "ThemedImage × 2" }],
                    },
                    {
                      name: "MemberSheet",
                      children: [{ name: "ThemedImage" }],
                    },
                  ],
                },
                {
                  name: "Profile",
                  children: [
                    {
                      name: "ProfileContent",
                      children: [
                        {
                          name: "View · perfil del integrante",
                          children: [{ name: "ThemedImage" }],
                        },
                      ],
                    },
                    { name: "NotFound · si el integrante no existe" },
                  ],
                },
                {
                  name: "Resources",
                  children: [{ name: "ResourceCard × resultados" }],
                },
                {
                  name: "Explore",
                  children: [{ name: "RepositoryCard × resultados" }],
                },
                {
                  name: "ComponentTree",
                  children: [{ name: "TreeNode · recursivo" }],
                },
                {
                  name: "Logbook",
                  children: [{ name: "LogEntry × entradas" }],
                },
                { name: "NotFound" },
              ],
            },
            { name: "Footer" },
          ],
        },
      ],
    },
  ],
};
export function TreeNode({ node }) {
  return (
    <li>
      {node.children ? (
        <details open>
          <summary>{node.name}</summary>
          <ul>
            {node.children.map((child) => (
              <TreeNode key={child.name} node={child} />
            ))}
          </ul>
        </details>
      ) : (
        <span className="tree-leaf">{node.name}</span>
      )}
    </li>
  );
}
export default function ComponentTree() {
  return (
    <section className="tp2-page section-shell">
      <p className="eyebrow">Así se construye la experiencia</p>
      <h1>El árbol de nuestra aplicación.</h1>
      <p className="lead">
        El layout permanece mientras React Router cambia la página del Outlet.
        Las tarjetas reciben distintos datos mediante props.
      </p>
      <p className="muted">
        Tocá los nombres con una flecha para expandir o contraer sus hijos. Las
        páginas del Outlet son alternativas, no se renderizan todas juntas.
      </p>
      <div className="component-tree">
        <ul>
          <TreeNode node={tree} />
        </ul>
      </div>
    </section>
  );
}
