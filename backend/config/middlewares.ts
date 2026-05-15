import type { Core } from '@strapi/strapi';

const config: Core.Config.Middlewares = [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', 'https:'],
          'media-src': ["'self'", 'data:', 'blob:'],
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      origin: process.env.CORS_ORIGIN
        ? process.env.CORS_ORIGIN.split(',')
        : ['http://localhost:3000', 'http://localhost:4321', 'http://127.0.0.1:4321'],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
      keepHeaderOnError: true,
    },
  },
  // strapi::poweredBy removed (suppresses X-Powered-By: Strapi header)
  // Note: Add @strapi/plugin-rate-limit for production rate limiting
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];

export default config;