// "use strict";

// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up(queryInterface, Sequelize) {
//     /**
//      * Add seed commands here.
//      *
//      * Example:
//      * await queryInterface.bulkInsert('People', [{
//      *   name: 'John Doe',
//      *   isBetaMember: false
//      * }], {});
//      */
//     try {
//       await queryInterface.bulkInsert("article_versions", [
//         {
//           id: 1,
//           article_id: 1,
//           title: "Holiday in Bali",
//           sub_title: "Explore beautiful Bali",
//           article_post:
//             "<p>Bali is one of the most popular holiday destinations in Indonesia...</p>",
//           tags: JSON.stringify([1, 9]), // Travel, Lifestyle
//           featured_image: null,
//           meta_data: JSON.stringify({
//             seo_title: "Holiday in Bali",
//             seo_desc: "Travel guide for Bali",
//           }),
//           status: "published",
//           publishedAt: new Date(),
//           scheduledAt: null,
//           createdAt: new Date(),
//           createdBy: 1,
//           updatedAt: new Date(),
//           updatedBy: 1,
//         },
//         {
//           id: 2,
//           article_id: 2,
//           title: "Job Listing in Kuala Lumpur",
//           sub_title: "Find your career in Malaysia",
//           article_post:
//             "<p>Browse the latest job opportunities in Kuala Lumpur...</p>",
//           tags: JSON.stringify([2, 3]), // Jobs, Technology
//           featured_image: null,
//           meta_data: JSON.stringify({
//             seo_title: "Job Listing KL",
//             seo_desc: "Career opportunities in KL",
//           }),
//           status: "published",
//           publishedAt: new Date(),
//           scheduledAt: null,
//           createdAt: new Date(),
//           createdBy: 1,
//           updatedAt: new Date(),
//           updatedBy: 1,
//         },
//         {
//           id: 3,
//           article_id: 3,
//           title: "Technology in Singapore",
//           sub_title: "Latest tech innovations",
//           article_post:
//             "<p>Singapore is a hub of technology and innovation...</p>",
//           tags: JSON.stringify([3, 6]), // Technology, Events
//           featured_image: null,
//           meta_data: JSON.stringify({
//             seo_title: "Technology SG",
//             seo_desc: "Tech trends in Singapore",
//           }),
//           status: "published",
//           publishedAt: new Date(),
//           scheduledAt: null,
//           createdAt: new Date(),
//           createdBy: 1,
//           updatedAt: new Date(),
//           updatedBy: 1,
//         },
//         {
//           id: 4,
//           article_id: 4,
//           title: "Housing in Manila",
//           sub_title: "Guide to renting in Manila",
//           article_post:
//             "<p>Find affordable housing and rental options in Manila...</p>",
//           tags: JSON.stringify([8, 10]), // Housing, Finance
//           featured_image: null,
//           meta_data: JSON.stringify({
//             seo_title: "Housing Manila",
//             seo_desc: "Rental guide in Manila",
//           }),
//           status: "published",
//           publishedAt: new Date(),
//           scheduledAt: null,
//           createdAt: new Date(),
//           createdBy: 1,
//           updatedAt: new Date(),
//           updatedBy: 1,
//         },
//       ]);

//       // Update current_version_id di table articles
//       await queryInterface.bulkUpdate(
//         "articles",
//         { current_version_id: 1 },
//         { id: 1 }
//       );
//       await queryInterface.bulkUpdate(
//         "articles",
//         { current_version_id: 2 },
//         { id: 2 }
//       );
//       await queryInterface.bulkUpdate(
//         "articles",
//         { current_version_id: 3 },
//         { id: 3 }
//       );
//       await queryInterface.bulkUpdate(
//         "articles",
//         { current_version_id: 4 },
//         { id: 4 }
//       );
//     } catch (error) {
//       console.error(error);
//     }
//   },

//   async down(queryInterface, Sequelize) {
//     /**
//      * Add commands to revert seed here.
//      *
//      * Example:
//      * await queryInterface.bulkDelete('People', null, {});
//      */
//     await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 0;");

//     await queryInterface.bulkDelete("article_versions", null, {
//       truncate: true,
//       restartIdentity: true,
//       cascade: true,
//     });
//     await queryInterface.sequelize.query(
//       "ALTER TABLE article_versions AUTO_INCREMENT = 1"
//     );
//     await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 1;");
//   },
// };


"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      // --- Helper data for generating new seeds (based on existing data) ---
      const tags = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

      // --- Function to generate article version data ---
      const generateArticleVersion = (id) => {
        // Randomly pick 2 unique tags for the version record
        const tag1 = tags[Math.floor(Math.random() * tags.length)];
        let tag2 = tags[Math.floor(Math.random() * tags.length)];
        while (tag2 === tag1) {
          tag2 = tags[Math.floor(Math.random() * tags.length)];
        }
        const selectedTags = JSON.stringify([tag1, tag2]);

        const title = `Generated Article ${id}`;
        const sub_title = `This is the subtitle for article ${id}`;
        const article_post = `<p>This is the main content for the generated article ${id}. It is a dummy post to fill the database.</p>`;
        const seo_title = `SEO Title ${id}`;
        const seo_desc = `SEO Description for article ${id}`;

        return {
          id,
          article_id: id,
          title,
          sub_title,
          article_post,
          tags: selectedTags,
          featured_image: ((id - 1) % 60) + 1, // Link to asset_media (IDs 1-60)
          meta_data: JSON.stringify({
            seo_title: seo_title,
            seo_desc: seo_desc,
          }),
          status: "published",
          publishedAt: new Date(),
          scheduledAt: null,
          createdAt: new Date(),
          createdBy: 1,
          updatedAt: new Date(),
          updatedBy: 1,
        };
      };

      // --- Generate the 50 new versions (ID 5 to 54) ---
      const newVersions = [];
      for (let i = 5; i <= 54; i++) {
        newVersions.push(generateArticleVersion(i));
      }

      // --- Existing article versions (ID 1 to 4) ---
      const existingVersions = [
        {
          id: 1,
          article_id: 1,
          title: "Holiday in Bali",
          sub_title: "Explore beautiful Bali",
          article_post:
            "<p>Bali is one of the most popular holiday destinations in Indonesia...</p>",
          tags: JSON.stringify([1, 9]), // Travel, Lifestyle
          featured_image: 1, // Link to asset_media ID 1
          meta_data: JSON.stringify({
            seo_title: "Holiday in Bali",
            seo_desc: "Travel guide for Bali",
          }),
          status: "published",
          publishedAt: new Date(),
          scheduledAt: null,
          createdAt: new Date(),
          createdBy: 1,
          updatedAt: new Date(),
          updatedBy: 1,
        },
        {
          id: 2,
          article_id: 2,
          title: "Job Listing in Kuala Lumpur",
          sub_title: "Find your career in Malaysia",
          article_post:
            "<p>Browse the latest job opportunities in Kuala Lumpur...</p>",
          tags: JSON.stringify([2, 3]), // Jobs, Technology
          featured_image: 2, // Link to asset_media ID 2
          meta_data: JSON.stringify({
            seo_title: "Job Listing KL",
            seo_desc: "Career opportunities in KL",
          }),
          status: "published",
          publishedAt: new Date(),
          scheduledAt: null,
          createdAt: new Date(),
          createdBy: 1,
          updatedAt: new Date(),
          updatedBy: 1,
        },
        {
          id: 3,
          article_id: 3,
          title: "Technology in Singapore",
          sub_title: "Latest tech innovations",
          article_post:
            "<p>Singapore is a hub of technology and innovation...</p>",
          tags: JSON.stringify([3, 6]), // Technology, Events
          featured_image: 3, // Link to asset_media ID 3
          meta_data: JSON.stringify({
            seo_title: "Technology SG",
            seo_desc: "Tech trends in Singapore",
          }),
          status: "published",
          publishedAt: new Date(),
          scheduledAt: null,
          createdAt: new Date(),
          createdBy: 1,
          updatedAt: new Date(),
          updatedBy: 1,
        },
        {
          id: 4,
          article_id: 4,
          title: "Housing in Manila",
          sub_title: "Guide to renting in Manila",
          article_post:
            "<p>Find affordable housing and rental options in Manila...</p>",
          tags: JSON.stringify([8, 10]), // Housing, Finance
          featured_image: 4, // Link to asset_media ID 4
          meta_data: JSON.stringify({
            seo_title: "Housing Manila",
            seo_desc: "Rental guide in Manila",
          }),
          status: "published",
          publishedAt: new Date(),
          scheduledAt: null,
          createdAt: new Date(),
          createdBy: 1,
          updatedAt: new Date(),
          updatedBy: 1,
        },
      ];

      await queryInterface.bulkInsert("article_versions", [...existingVersions, ...newVersions], {});

      // --- Update current_version_id in the articles table for all 54 articles ---
      console.log("Updating current_version_id for 54 articles...");
      for (let i = 1; i <= 54; i++) {
        await queryInterface.bulkUpdate(
          "articles",
          { current_version_id: i },
          { id: i }
        );
      }
      console.log("Finished updating current_version_id.");
      
    } catch (error) {
      console.error(error);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 0;");

    await queryInterface.bulkDelete("article_versions", null, {
      truncate: true,
      restartIdentity: true,
      cascade: true,
    });
    await queryInterface.sequelize.query(
      "ALTER TABLE article_versions AUTO_INCREMENT = 1"
    );
    await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 1;");
  },
};