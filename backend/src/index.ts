import type { Core } from '@strapi/strapi';

const PUBLIC_CONTENT_TYPES = [
  'api::homepage.homepage',
  'api::service.service',
  'api::faq.faq',
  'api::blog-post.blog-post',
  'api::global.global',
];

async function grantPublicPermissions(strapi: Core.Strapi) {
  const publicRole = await strapi.db
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'public' } });

  if (!publicRole) return;

  const existingPermissions = await strapi.db
    .query('plugin::users-permissions.permission')
    .findMany({ where: { role: publicRole.id } });

  const existingActions = new Set(existingPermissions.map((p: any) => p.action));

  const actionsToGrant: string[] = [];

  for (const uid of PUBLIC_CONTENT_TYPES) {
    const [, scopedPart] = uid.split('::');
    const [, name] = scopedPart.split('.');
    const findAction = `${uid}.find`;
    const findOneAction = `${uid}.findOne`;

    if (!existingActions.has(findAction)) actionsToGrant.push(findAction);
    if (!existingActions.has(findOneAction)) actionsToGrant.push(findOneAction);
  }

  if (actionsToGrant.length === 0) return;

  await Promise.all(
    actionsToGrant.map((action) =>
      strapi.db.query('plugin::users-permissions.permission').create({
        data: { action, role: publicRole.id, enabled: true },
      })
    )
  );

  strapi.log.info(`[bootstrap] Granted ${actionsToGrant.length} public API permissions`);
}

export default {
  register() {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await grantPublicPermissions(strapi);
  },
};
