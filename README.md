# AACMP · Frontend Gems · TP2

AACMP presenta a cinco integrantes que combinan análisis, desarrollo, diseño y contenido. Esta aplicación continúa el TP1 con componentes React y React Router, conservando el diseño de [la aplicación original](https://tp1-dswf-aacmp.vercel.app/index.html): cabecera superior, gema SVG animada, degradados violetas y cian, fondos ilustrados, tarjetas compactas y avatares con variantes claras y oscuras.

## Índice

- [El equipo](#el-equipo)
- [Cómo ejecutar](#cómo-ejecutar)
- [Secciones](#secciones)
- [Arquitectura](#arquitectura)
- [Uso de IA](#uso-de-ia)
- [Estado de la entrega](#estado-de-la-entrega)

## El equipo

| Integrante           | GitHub                                                      | Aporte presentado en su perfil |
| -------------------- | ----------------------------------------------------------- | ------------------------------ |
| Juan Manuel Albareda | [juanmanuelalbareda](https://github.com/juanmanuelalbareda) | Análisis y calidad             |
| Mariano Arenas       | [NanoCode10](https://github.com/NanoCode10)                 | Código y lógica                |
| Daniela Cabrera      | [Dancay5071](https://github.com/Dancay5071)                 | Diseño y detalle               |
| Pablo Macia          | [pablormacia](https://github.com/pablormacia)               | Estrategia y movimiento        |
| Fernando Palearuzza  | [FerPalearuzza](https://github.com/FerPalearuzza)           | Contenido y empatía            |

Los aportes reflejan el contenido del TP1. Las responsabilidades efectivas de implementación del TP2 deben ser confirmadas por el grupo.

## Cómo ejecutar

Requiere Node.js 20.19+ o 22.12+ y npm.

```bash
npm ci
npm run dev
npm run build
npm run preview
npm test
```

En PowerShell, si la política impide ejecutar `npm.ps1`, usar `npm.cmd` para estos comandos.

Vercel: importar el repositorio como proyecto Vite, compilar con `npm run build` y publicar `dist`. `vercel.json` configura el fallback a `index.html` para abrir y recargar rutas directamente.

## Secciones

| Ruta          | Contenido e interacciones                                                                                                               |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `/`           | Presentación del equipo, cinco tarjetas y mezcla del orden                                                                              |
| `/equipo`     | Acceso al equipo desde la sidebar                                                                                                       |
| `/equipo/:id` | Perfiles de juan, mariano, daniela, pablo y fernando; revelado de retrato y cambio de tono por habilidad                                |
| `/recursos`   | 22 registros de JSON local, búsqueda sin distinción de mayúsculas o tildes, filtro por categoría, detalles, contador y restablecimiento |
| `/explorar`   | API pública de GitHub: repositorios frontend, descripción, lenguaje y estrellas; carga, error, timeout y actualización o reintento      |
| `/arbol`      | Jerarquía real de componentes, con nodos expandibles                                                                                    |
| `/bitacora`   | Registros del TP1 y de la migración a TP2, desplegables y filtro por etapa                                                              |

La sidebar compartida identifica la sección activa y se abre como un panel superpuesto mediante “Secciones TP2” o el menú móvil. Se cierra por botón, fondo o Escape. Así se conserva el ancho y la composición originales de la portada. El tema se guarda localmente y adapta los avatares. Las rutas anteriores `.html` redirigen a las pantallas React.

La API utiliza [GitHub Search Repositories](https://docs.github.com/en/rest/search/search#search-repositories), sin tokens ni claves privadas. Puede limitar consultas anónimas; la interfaz muestra el error y permite reintentar. Los recursos locales no dependen de la API.

## Arquitectura

- `src/App.jsx`: rutas; `src/components/NotFound.jsx`: pantalla de enlace inexistente.
- `src/components/Layout.jsx`: layout persistente, Header, Sidebar y Outlet.
- `src/components/MemberCard.jsx`: tarjetas originales reutilizadas mediante props.
- `src/components/ThemedImage.jsx`: imágenes que responden al tema y al revelado.
- `src/components/MemberSheet.jsx` y `ShuffleControl.jsx`: ficha móvil y mezclador por click o arrastre.
- `src/components/Footer.jsx`: footer original según la página.
- `src/pages/`: portada, perfiles, recursos, API, árbol y bitácora.
- `src/data/`: integrantes, 22 recursos y registros del proceso.
- `public/css/`: los estilos originales del TP1, idénticos a los del sitio de referencia.
- `src/styles.css`: estilos acotados al panel lateral y a las secciones nuevas del TP2.

Las pantallas se construyen con JSX y estado/hooks de React. El HTML serializado y los scripts del TP1 se conservan como referencia en `src/pages.json` y `public/js/`; la aplicación nueva no los importa ni ejecuta. Las capturas preexistentes en `public/docs/capturas/` corresponden al TP1.

Validación local: compilación de producción; cinco pruebas automatizadas de la API (consulta, límites, estructura de respuesta, resultado vacío y errores); revisión en navegador de los cinco perfiles, búsqueda y filtro combinados, bitácora, árbol desplegable, tema y menú móvil a 390 px. La API devolvió nueve repositorios en la consulta real.

## Uso de IA

Uso confirmado para esta implementación:

| Aplicación   | Modelo | Tareas                                                                                                                           |
| ------------ | ------ | -------------------------------------------------------------------------------------------------------------------------------- |
| OpenAI Codex | GPT-6  | Lectura de la consigna, migración a componentes React, sidebar, datos locales, filtros, API, árbol, bitácora, estilos y revisión |

El equipo debe revisar y apropiarse de los cambios. No se atribuye este uso a un integrante específico porque todavía no se confirmó quién operó la herramienta. El uso previo de IA para imágenes o contenido del TP1 y el detalle por integrante también requieren confirmación; no se inventan aplicaciones ni modelos.

## Estado de la entrega

Implementadas las funcionalidades de los criterios 4 a 14. La documentación identifica los cinco integrantes y el uso confirmado de IA (criterio 15). El detalle por integrante del nivel “Propone” está pendiente de confirmación.

**El proyecto todavía no está listo para entregar:** falta incorporar y comprobar el enlace real al deploy de Vercel, crear o vincular el repositorio público independiente de TP2 y verificar que todos los integrantes tengan sus invitaciones aceptadas. En esta carpeta no había un repositorio Git inicializado al comenzar la implementación. Los criterios 1 a 3 no se consideran completos hasta verificar esos datos.

Antes de entregar:

- Agregar aquí el enlace funcional de Vercel y el del repositorio TP2.
- Abrir ambos enlaces sin iniciar sesión.
- Confirmar acceso aceptado de los cinco integrantes.
- Recorrer los perfiles, filtros, API, árbol y bitácora en el deploy.
- Confirmar responsabilidades y aplicaciones/modelos de IA por integrante.
- Registrar el enlace del repositorio en la fila del grupo, pestaña TP 2 de la planilla de entregas.
