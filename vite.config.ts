import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import AutoImport from "unplugin-auto-import/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  // GitHub Pages:
  // VITE_BASE_PATH=/PasteleriaMili/
  //
  // Docker / Render:
  // VITE_BASE_PATH=/
  const basePath = process.env.VITE_BASE_PATH || env.VITE_BASE_PATH || "/";

  return {
    define: {
      __BASE_PATH__: JSON.stringify(basePath),
      __IS_PREVIEW__: JSON.stringify(false),
      __READDY_PROJECT_ID__: JSON.stringify(process.env.PROJECT_ID || ""),
      __READDY_VERSION_ID__: JSON.stringify(process.env.VERSION_ID || ""),
      __READDY_AI_DOMAIN__: JSON.stringify(
        process.env.READDY_AI_DOMAIN || ""
      ),
    },

    plugins: [
      react(),

      AutoImport({
        imports: [
          {
            react: [
              "useState",
              "useEffect",
              "useContext",
              "useReducer",
              "useCallback",
              "useMemo",
              "useRef",
              "useLayoutEffect",
              "useId",
              "lazy",
              "memo",
              "createContext",
            ],
          },

          {
            "react-router-dom": [
              "useNavigate",
              "useLocation",
              "useParams",
              "Link",
              "NavLink",
              "Outlet",
            ],
          },

          {
            "react-i18next": ["useTranslation", "Trans"],
          },
        ],

        dts: true,
      }),
    ],

    // Adaptable para GitHub Pages, Docker y nube
    base: basePath,

    build: {
      outDir: "dist",
      emptyOutDir: true,
      sourcemap: false,
    },

    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
      },
    },

    server: {
      port: 3000,
      host: "0.0.0.0",
    },
  };
});