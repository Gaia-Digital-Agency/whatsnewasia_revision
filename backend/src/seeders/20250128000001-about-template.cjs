"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Check if the template already exists
    const existing = await queryInterface.sequelize.query(
      `SELECT id FROM article_templating WHERE url = '/about' LIMIT 1`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const aboutContent = {
      title: "About What's New Asia",
      description: "What's New Asia is the ultimate city guide for expats and travelers, featuring the best dining, events, schools, wellness, and travel destinations across Asia. Stay informed with the latest news, tips, and insights to make the most of your Asian adventure.",
      link: "/about",
      image: {
        url: "wn-asia-logo.webp",
        alt: "What's New Asia"
      }
    };

    if (existing.length > 0) {
      // Update existing template
      await queryInterface.sequelize.query(
        `UPDATE article_templating
         SET content = '${JSON.stringify(aboutContent).replace(/'/g, "''")}',
             updatedAt = NOW()
         WHERE url = '/about'`
      );
      console.log("Updated existing /about template");
    } else {
      // Insert new template
      await queryInterface.bulkInsert("article_templating", [
        {
          url: "/about",
          content: JSON.stringify(aboutContent),
          template: "about",
          isActive: true,
          createdBy: 1,
          updatedBy: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
      console.log("Created new /about template");
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("article_templating", {
      url: "/about",
    });
  },
};
