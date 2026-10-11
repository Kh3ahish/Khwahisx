import { VercelRequest, VercelResponse } from '@vercel/node';

export default async (req: VercelRequest, res: VercelResponse) => {
  return res.status(200).json({
    status: "online",
    timestamp: new Date().toISOString(),
    blogger: {
      blogIdConfigured: Boolean(process.env.BLOGGER_BLOG_ID),
      apiKeyConfigured: Boolean(process.env.BLOGGER_API_KEY),
    },
    googleCloud: {
      projectIdConfigured: Boolean(process.env.GOOGLE_PROJECT_ID),
      hasClientSecret: Boolean(process.env.GOOGLE_CLIENT_SECRET)
    }
  });
};
