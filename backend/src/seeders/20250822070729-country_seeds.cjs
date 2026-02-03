"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "country",
      [
        {
          name: "South Korea",
          slug: "south-korea",
          createdAt: new Date(),
          updatedAt: new Date(),
          timezone: "Asia/Seoul"
        },
        {
          name: "Japan",
          slug: "japan",
          createdAt: new Date(),
          updatedAt: new Date(),
          timezone: "Asia/Tokyo"
        },
        {
          name: "Vietnam",
          slug: "vietnam",
          createdAt: new Date(),
          updatedAt: new Date(),
          timezone: "Asia/Ho_Chi_Minh"
        },
        {
          name: "China",
          slug: "china",
          createdAt: new Date(),
          updatedAt: new Date(),
          timezone: "Asia/Shanghai"
        },
        {
          name: "Indonesia",
          slug: "indonesia",
          createdAt: new Date(),
          updatedAt: new Date(),
          timezone: "Asia/Jakarta"
        },
        {
          name: "Singapore",
          slug: "singapore",
          createdAt: new Date(),
          updatedAt: new Date(),
          timezone: "Asia/Singapore"
        },
        {
          name: "Philippines",
          slug: "philippines",
          createdAt: new Date(),
          updatedAt: new Date(),
          timezone: "Asia/Manila"
        },
        {
          name: "Malaysia",
          slug: "malaysia",
          createdAt: new Date(),
          updatedAt: new Date(),
          timezone: "Asia/Kuala_Lumpur"
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 0;");

    await queryInterface.bulkDelete("country", null, {});
    await queryInterface.sequelize.query(
      "ALTER TABLE country AUTO_INCREMENT = 1"
    );
    await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 1;");
  },
};
