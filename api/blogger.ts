import { VercelRequest, VercelResponse } from '@vercel/node';
import { fetchBloggerData } from '../src/services/blogger.server';

export default async (req: VercelRequest, res: VercelResponse) => {
  const config = {
    blogId: process.env.BLOGGER_BLOG_ID || '',
    apiKey: process.env.BLOGGER_API_KEY || '',
  };

  try {
    const data = await fetchBloggerData(config);
    // Always return 200 OK so client never gets a 500 server error
    return res.status(200).json(data);
  } catch (error: any) {
    return res.status(200).json({
      error: error.message || 'Internal Server Error',
      items: [],
      diagnostics: { blogIdConfigured: Boolean(config.blogId), error: error.message }
    });
  }
};
