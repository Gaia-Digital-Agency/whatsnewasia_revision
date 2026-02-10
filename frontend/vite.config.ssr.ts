import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"
import svgr from "vite-plugin-svgr"

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), "")

    return {
        plugins: [
            react(),
            svgr({
                svgrOptions: {
                    icon: true,
                    exportType: "named",
                    namedExport: "ReactComponent"
                }
            })
        ],

        base: env.VITE_BASE_PATH,

        build: {
            ssr: true,
            outDir: "dist/server",
            rollupOptions: {
                input: {
                    front: "src/entry-server.tsx",
                    admin: "src/entry-server-admin.tsx"
                }
            }
        },

        ssr: {
            noExternal: [
                "react-helmet-async",
                "quill",
                "react-quill",
                "react-quill-new",
                "stream"
            ]
        }
    }
})
