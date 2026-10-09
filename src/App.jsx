import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import Resources from "./pages/Resources.jsx";
import Explore from "./pages/Explore.jsx";
import ComponentTree from "./pages/ComponentTree.jsx";
import Logbook from "./pages/Logbook.jsx";
import members from "./data/members.json";
import NotFound from "./components/NotFound.jsx";
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="equipo" element={<Home />} />
        <Route path="equipo" element={<Home />} />
        <Route path="equipo/:id" element={<Profile />} />
        <Route path="recursos" element={<Resources />} />
        <Route path="explorar" element={<Explore />} />
        <Route path="arbol" element={<ComponentTree />} />
        <Route path="bitacora" element={<Logbook />} />
        <Route path="index.html" element={<Navigate to="/" replace />} />
        <Route
          path="pages/bitacora.html"
          element={<Navigate to="/bitacora" replace />}
        />
        {members.map((m) => (
          <Route
            key={m.id}
            path={`${m.id}.html`}
            element={<Navigate to={`/equipo/${m.id}`} replace />}
          />
        ))}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
