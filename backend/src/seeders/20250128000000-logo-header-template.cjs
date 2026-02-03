"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Check if the template already exists
    const existing = await queryInterface.sequelize.query(
      `SELECT id FROM article_templating WHERE url = '/logo-header' LIMIT 1`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (existing.length > 0) {
      // Update existing template
      await queryInterface.sequelize.query(
        `UPDATE article_templating
         SET content = '{"url": "wn-asia-logo.webp", "id": 66}',
             updatedAt = NOW()
         WHERE url = '/logo-header'`
      );
      console.log("Updated existing /logo-header template");
    } else {
      // Insert new template
      await queryInterface.bulkInsert("article_templating", [
        {
          url: "/logo-header",
          content: JSON.stringify({ url: "wn-asia-logo.webp", id: 66 }),
          template: "logo",
          isActive: true,
          createdBy: 1,
          updatedBy: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
      console.log("Created new /logo-header template");
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("article_templating", {
      url: "/logo-header",
    });
  },
};
