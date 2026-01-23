import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    const publicRole = await strapi.query('plugin::users-permissions.role').findOne({
      where: { type: 'public' },
    });

    if (!publicRole) {
      strapi.log.warn('Public role not found. Skipping permissions bootstrap.');
      return;
    }

    const actionsToEnable = [
      'api::product.product.find',
      'api::product.product.findOne',
      'api::news-item.news-item.find',
      'api::news-item.news-item.findOne',
    ];

    const permissionQuery = strapi.query('plugin::users-permissions.permission');

    for (const action of actionsToEnable) {
      const existing = await permissionQuery.findOne({
        where: {
          role: publicRole.id,
          action,
        },
      });

      if (existing) {
        await permissionQuery.update({
          where: { id: existing.id },
          data: { enabled: true },
        });
      } else {
        await permissionQuery.create({
          data: {
            action,
            role: publicRole.id,
            enabled: true,
          },
        });
      }
    }

    strapi.log.info('Public permissions updated for Product and News find/findOne.');
  },
};
