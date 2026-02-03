"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "region",
      [
        {
          name: "Ubud",
          id_city: 1,
          slug: "ubud",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Selangor",
          id_city: 2,
          slug: "selangor",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Central Region",
          id_city: 3,
          slug: "central-region",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Metro Manila",
          id_city: 4,
          slug: "metro-manila",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 0;");

    await queryInterface.bulkDelete("region", null, {});
    await queryInterface.sequelize.query(
      "ALTER TABLE region AUTO_INCREMENT = 1"
    );

    await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 1;");
  },
};
