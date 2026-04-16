/**
 * Vercel Serverless Function entry point.
 * This file exports the Express app for Vercel's Node.js runtime.
 * The Express app is defined in server.ts (without starting an HTTP server).
 */
import { app } from '../server.ts';

export default app;
