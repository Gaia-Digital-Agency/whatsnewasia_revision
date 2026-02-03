"use strict";

// Country IDs based on country_seeds.cjs order:
// 1: South Korea, 2: Japan, 3: Vietnam, 4: China, 5: Indonesia, 6: Singapore, 7: Philippines, 8: Malaysia

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "city",
      [
        // South Korea cities
        { name: "Seoul", slug: "seoul", id_country: 1, createdAt: new Date(), updatedAt: new Date() },
        { name: "Busan", slug: "busan", id_country: 1, createdAt: new Date(), updatedAt: new Date() },
        // Japan cities
        { name: "Tokyo", slug: "tokyo", id_country: 2, createdAt: new Date(), updatedAt: new Date() },
        { name: "Osaka", slug: "osaka", id_country: 2, createdAt: new Date(), updatedAt: new Date() },
        { name: "Kyoto", slug: "kyoto", id_country: 2, createdAt: new Date(), updatedAt: new Date() },
        // Vietnam cities
        { name: "Ho Chi Minh City", slug: "ho-chi-minh-city", id_country: 3, createdAt: new Date(), updatedAt: new Date() },
        { name: "Hanoi", slug: "hanoi", id_country: 3, createdAt: new Date(), updatedAt: new Date() },
        // China cities
        { name: "Shanghai", slug: "shanghai", id_country: 4, createdAt: new Date(), updatedAt: new Date() },
        { name: "Beijing", slug: "beijing", id_country: 4, createdAt: new Date(), updatedAt: new Date() },
        { name: "Wuxi", slug: "wuxi", id_country: 4, createdAt: new Date(), updatedAt: new Date() },
        // Indonesia cities
        { name: "Bali", slug: "bali", id_country: 5, createdAt: new Date(), updatedAt: new Date() },
        { name: "Jakarta", slug: "jakarta", id_country: 5, createdAt: new Date(), updatedAt: new Date() },
        // Singapore
        { name: "Singapore City", slug: "singapore-city", id_country: 6, createdAt: new Date(), updatedAt: new Date() },
        // Philippines cities
        { name: "Manila", slug: "manila", id_country: 7, createdAt: new Date(), updatedAt: new Date() },
        { name: "Cebu", slug: "cebu", id_country: 7, createdAt: new Date(), updatedAt: new Date() },
        // Malaysia cities
        { name: "Kuala Lumpur", slug: "kuala-lumpur", id_country: 8, createdAt: new Date(), updatedAt: new Date() },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 0;");

    await queryInterface.bulkDelete("city", null, {});
    await queryInterface.sequelize.query("ALTER TABLE city AUTO_INCREMENT = 1");
    
    await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 1;");
  },
};
