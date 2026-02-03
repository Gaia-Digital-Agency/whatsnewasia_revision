"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const dataCategory = [
      {
        title: "Holiday",
        sub_title: "Holiday",
        description: "Explore global holidays and traditions."
      },
      {
        title: "Job Listing",
        sub_title: "Job Listing",
        description: "Browse the latest career opportunities.",
      },
      {
        title: "Directory",
        sub_title: "Directory",
        description: "Find businesses, services, and organizations.",
      },
      {
        title: "Events",
        sub_title: "Events",
        description: "Stay updated with the latest events worldwide.",
      },
      {
        title: "Features",
        sub_title: "Features",
        description: "Highlighting stories, insights, and tips.",
      },
      {
        title: "Experience",
        sub_title: "Experience",
        description: "Unique travel and lifestyle experiences.",
      },
      {
        title: "Housing",
        sub_title: "Housing",
        description: "Housing guides and rental resources.",
      },
      {
        title: "Ultimate Guide",
        sub_title: "Ultimate Guide",
        description: "Comprehensive guides for every need.",
      },
      {
        title: "Technology",
        sub_title: "Technology",
        description: "Latest innovations and tech trends.",
      },
      {
        title: "Health & Wellness",
        sub_title: "Health & Wellness",
        description: "Tips for a healthier lifestyle.",
      },
      {
        title: "Food & Drink",
        sub_title: "Food & Drink",
        description: "Explore recipes, restaurants, and cuisine.",
      },
      {
        title: "Education",
        sub_title: "Education",
        description: "Learning resources and opportunities.",
      },
    ].map((item, index) => ({
      id: index + 1,
      title: item.title,
      sub_title: item.sub_title,
      slug_title: item.title.toLowerCase().replace(/\s+/g, "-"),
      description: item.description,
      template_name: "template_name",
      createdBy: 1,
      updatedBy: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert("category", dataCategory, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 0;");

    await queryInterface.bulkDelete("category", null, {
      truncate: true,
      restartIdentity: true,
      cascade: true,
    });
    await queryInterface.sequelize.query(
      "ALTER TABLE category AUTO_INCREMENT = 1"
    );
    await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 1;");
  },
};
