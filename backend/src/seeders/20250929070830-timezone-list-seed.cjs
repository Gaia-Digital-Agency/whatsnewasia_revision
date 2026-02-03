"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const asiaTimezones = [
      {
        timezone_name: "Asia/Jakarta",
        utc_offset: "+07:00",
        description:
          "Western Indonesia Time (WIB) - Covers Java, Sumatra, West and Central Kalimantan.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        timezone_name: "Asia/Makassar",
        utc_offset: "+08:00",
        description:
          "Central Indonesia Time (WITA) - Covers Sulawesi, Bali, Nusa Tenggara, North and South Kalimantan.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        timezone_name: "Asia/Jayapura",
        utc_offset: "+09:00",
        description:
          "Eastern Indonesia Time (WIT) - Covers Papua and Maluku islands.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        timezone_name: "Asia/Singapore",
        utc_offset: "+08:00",
        description:
          "Singapore Standard Time (SGT). Also used by much of Peninsular Malaysia (Kuala Lumpur).",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        timezone_name: "Asia/Bangkok",
        utc_offset: "+07:00",
        description:
          "Indochina Time (ICT) - Used by Thailand, Vietnam, Cambodia, and Laos.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        timezone_name: "Asia/Manila",
        utc_offset: "+08:00",
        description: "Philippine Standard Time (PST).",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        timezone_name: "Asia/Kuala_Lumpur",
        utc_offset: "+08:00",
        description: "Malaysia Time (MYT). Used widely across Malaysia.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        timezone_name: "Asia/Shanghai",
        utc_offset: "+08:00",
        description:
          "China Standard Time (CST) - Covers all of mainland China, Hong Kong, and Macau.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        timezone_name: "Asia/Taipei",
        utc_offset: "+08:00",
        description: "Taiwan Standard Time (TST).",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        timezone_name: "Asia/Tokyo",
        utc_offset: "+09:00",
        description: "Japan Standard Time (JST).",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        timezone_name: "Asia/Seoul",
        utc_offset: "+09:00",
        description: "Korea Standard Time (KST).",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        timezone_name: "Asia/Kolkata",
        utc_offset: "+05:30",
        description: "Indian Standard Time (IST) - Covers India and Sri Lanka.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        timezone_name: "Asia/Karachi",
        utc_offset: "+05:00",
        description: "Pakistan Standard Time (PKT).",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        timezone_name: "Asia/Dhaka",
        utc_offset: "+06:00",
        description: "Bangladesh Standard Time (BST).",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        timezone_name: "Asia/Dubai",
        utc_offset: "+04:00",
        description: "Used by UAE, Oman, and parts of the Arabian Peninsula.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        timezone_name: "Asia/Riyadh",
        utc_offset: "+03:00",
        description:
          "Arabia Standard Time - Covers Saudi Arabia, Qatar, and Kuwait.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        timezone_name: "Asia/Istanbul",
        utc_offset: "+03:00",
        description:
          "Turkey Time (TRT). Geographically transcontinental but commonly listed with Asia.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("timezones", asiaTimezones, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("timezones", null, {});
  },
};
