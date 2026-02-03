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
    try {
      await queryInterface.bulkInsert(
        "Users",
        [
          {
            name: "Super Admin",
            email: "super_admin@admin.com",
            password:
              "$2b$10$Vu1Ctw/UpsrhB/u3qWqcM.ECGOR55z1nBTQ/zqm0DxMjC0i.Aad4S",
            isActive: 1,
            user_level: "super_admin",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "Admin Indonesia",
            email: "indonesia@admin.com",
            password:
              "$2b$10$Vu1Ctw/UpsrhB/u3qWqcM.ECGOR55z1nBTQ/zqm0DxMjC0i.Aad4S",
            isActive: 1,
            user_level: "admin_country",
            id_country: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "Admin Bali",
            email: "bali@admin.com",
            password:
              "$2b$10$Vu1Ctw/UpsrhB/u3qWqcM.ECGOR55z1nBTQ/zqm0DxMjC0i.Aad4S",
            isActive: 1,
            user_level: "admin_city",
            id_country: 1,
            id_city: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        {}
      );
    } catch (error) {
      console.error(error);
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 0;");

    await queryInterface.bulkDelete("Users", null, {});
    await queryInterface.sequelize.query(
      "ALTER TABLE Users AUTO_INCREMENT = 1"
    );
    
    await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 1;");
  },
};
