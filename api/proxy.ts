/**
 * Vercel proxy — forwards all /api/* requests to the vaultwares-pipelines API.
 *
 * Set PIPELINE_API_URL in Vercel environment variables to the IP/hostname
 * of the vaultwares-pipelines API server, e.g. http://1.2.3.4:8080
 */
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const pipelineUrl = process.env.PIPELINE_API_URL;
  if (!pipelineUrl) {
    return res.status(503).json({
      error: 'API not configured. Set the PIPELINE_API_URL environment variable.',
    });
  }

  // Reconstruct the target URL, preserving path and query string
  const originalPath = (req.url ?? '/').replace(/^\/?api/, '/api');
  const targetUrl = `${pipelineUrl.replace(/\/$/, '')}${originalPath}`;

  // Forward the request, including method, headers, and body
  const upstreamHeaders: Record<string, string> = {};
  for (const [key, value] of Object.entries(req.headers)) {
    if (value && key.toLowerCase() !== 'host') {
      upstreamHeaders[key] = Array.isArray(value) ? value.join(', ') : value;
    }
  }

  const response = await fetch(targetUrl, {
    method: req.method,
    headers: upstreamHeaders,
    body: req.method !== 'GET' && req.method !== 'HEAD'
      ? JSON.stringify(req.body)
      : undefined,
  });

  // Forward status and response body
  res.status(response.status);
  const contentType = response.headers.get('content-type') ?? '';
  if (contentType.includes('application/json')) {
    res.json(await response.json());
  } else {
    res.send(await response.text());
  }
}
