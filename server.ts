import express from "express"
import path from "path"
import { fileURLToPath } from "url"
import fs from "fs"
import dotenv from "dotenv"
import { fetchBloggerData } from "./src/services/blogger.server"
import { initializeApp, cert } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Initialize Firebase Admin
let adminDb: any;
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || "{}")
if (Object.keys(serviceAccount).length > 0) {
    initializeApp({
        credential: cert(serviceAccount)
    })
    adminDb = getFirestore()
} else {
    console.warn("FIREBASE_SERVICE_ACCOUNT not set. Admin features disabled.")
}

const app = express()
const PORT = 3000

app.use(express.json({ limit: "20mb" }))

// Ensure upload directory exists for static serving if any
const UPLOAD_DIR = path.join(__dirname, "public", "uploads")
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true })
}

// Serve uploaded files
app.use("/uploads", express.static(UPLOAD_DIR))

// Professional Credentials Configuration (Local Dev Only)
const GOOGLE_CONFIG = {
  projectId: process.env.GOOGLE_PROJECT_ID,
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  blogger: {
    blogId: process.env.BLOGGER_BLOG_ID,
    apiKey: process.env.BLOGGER_API_KEY,
  }
}

// Secure backend proxy for Blogger (Local Development)
app.get("/api/blogger", async (_req, res) => {
  try {
    const config = {
      blogId: GOOGLE_CONFIG.blogger.blogId || '',
      apiKey: GOOGLE_CONFIG.blogger.apiKey || '',
    };
    const data = await fetchBloggerData(config);
    return res.status(200).json(data);
  } catch (error: any) {
    console.error("[Local Server] Blogger Proxy Error:", error);
    return res.status(200).json({ error: error.message || "Internal Server Error", items: [] });
  }
})

// Professional Health & Diagnostics (Local Development)
app.get("/api/health", (_req, res) => {
  res.json({
    status: "online",
    environment: "local",
    blogger: {
      blogIdConfigured: Boolean(GOOGLE_CONFIG.blogger.blogId),
      apiKeyConfigured: Boolean(GOOGLE_CONFIG.blogger.apiKey)
    },
    googleCloud: {
      projectIdConfigured: Boolean(GOOGLE_CONFIG.projectId),
      hasClientSecret: Boolean(GOOGLE_CONFIG.clientSecret)
    }
  })
})

async function start() {
  if (process.env.NODE_ENV === "production") {
    const distPath = path.resolve(__dirname, "dist")
    app.use(express.static(distPath))

    app.get("/projects/:slug", async (req, res) => {
        if (!adminDb) {
             res.sendFile(path.resolve(distPath, "index.html"))
             return
        }
        const slug = req.params.slug
        try {
            const projectSnapshot = await adminDb.collection("projects").where("slug", "==", slug).limit(1).get()
            if (!projectSnapshot.empty) {
                const project = projectSnapshot.docs[0].data()
                let html = fs.readFileSync(path.resolve(distPath, "index.html"), "utf8")
                
                // Replace metadata
                html = html.replace(/<title>.*?<\/title>/, `<title>${project.title} · UX Case Study</title>`)
                html = html.replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${project.description}" />`)
                
                return res.send(html)
            }
        } catch (e) {
            console.error(e)
        }
        res.sendFile(path.resolve(distPath, "index.html"))
    })
    
    app.get("*", (_req, res) => {
      res.sendFile(path.resolve(distPath, "index.html"))
    })
  } else {
    const { createServer: createViteServer } = await import("vite")
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        host: "0.0.0.0",
        port: PORT,
        hmr: process.env.DISABLE_HMR !== "true",
        watch: process.env.DISABLE_HMR === "true" ? null : {},
      },
      appType: "spa",
    })
    app.use(vite.middlewares)
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Local development server listening on http://0.0.0.0:${PORT}`)
  })
}

if (process.env.VERCEL !== "1") {
  start()
}

export default app
