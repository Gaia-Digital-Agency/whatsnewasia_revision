// "use strict";

// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up(queryInterface, Sequelize) {
//     try {
//       await queryInterface.bulkInsert("articles", [
//         {
//           id: 1,
//           slug_title: "holiday-in-bali",
//           current_version_id: null, // akan diupdate setelah article_versions dimasukkan
//           author: "System",
//           category: 1, // Holiday
//           parent_category_id: null,
//           id_country: 1, // Indonesia
//           id_city: 1, // Bali
//           id_region: 1, // Bali
//           createdBy: 1,
//           createdAt: new Date(),
//           pinned: 0,
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
//           updatedBy:1,
//           updatedAt: new Date()
//         },
//         {
//           id: 2,
//           slug_title: "job-listing-kuala-lumpur",
//           current_version_id: null,
//           author: "System",
//           category: 2, // Job Listing
//           parent_category_id: null,
//           id_country: 2, // Malaysia
//           id_city: 2, // Kuala Lumpur
//           id_region: 2,
//           createdBy: 1,
//           createdAt: new Date(),
//           pinned: 0,
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
//           updatedBy:1,
//           updatedAt: new Date()
//         },
//         {
//           id: 3,
//           slug_title: "technology-singapore",
//           current_version_id: null,
//           author: "System",
//           category: 9, // Technology
//           parent_category_id: null,
//           id_country: 3, // Singapore
//           id_city: 3,
//           id_region: 3,
//           createdBy: 1,
//           createdAt: new Date(),
//           pinned: 0,
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
//           updatedBy:1,
//           updatedAt: new Date()
//         },
//         {
//           id: 4,
//           slug_title: "housing-in-manila",
//           current_version_id: null,
//           author: "System",
//           category: 7, // Housing
//           parent_category_id: null,
//           id_country: 4, // Philippines
//           id_city: 4,
//           id_region: 4,
//           createdBy: 1,
//           createdAt: new Date(),
//           pinned: 0,
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
//           updatedBy:1,
//           updatedAt: new Date()
//         },
//       ]);
//     } catch (error) {
//       console.error(error);
//     }
//   },

//   async down(queryInterface, Sequelize) {
//     await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 0;");

//     await queryInterface.bulkDelete("articles", null, {
//       truncate: true,
//       restartIdentity: true,
//       cascade: true,
//     });
//     await queryInterface.sequelize.query(
//       "ALTER TABLE articles AUTO_INCREMENT = 1"
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

      // Existing categories: 1-12 (Holiday, Job Listing, Directory, Events, Features, Experience, Housing, Ultimate Guide, Technology, Health & Wellness, Food & Drink, Education)
      const categories = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
      // Existing tags: 1-10 (Travel, Jobs, Technology, Education, Food, Events, Health, Housing, Lifestyle, Finance)
      const tags = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      // Updated locations based on new country/city IDs:
      // Countries: 1-South Korea, 2-Japan, 3-Vietnam, 4-China, 5-Indonesia, 6-Singapore, 7-Philippines, 8-Malaysia
      // Cities: 1-Seoul, 2-Busan, 3-Tokyo, 4-Osaka, 5-Kyoto, 6-HCMC, 7-Hanoi, 8-Shanghai, 9-Beijing, 10-Wuxi, 11-Bali, 12-Jakarta, 13-Singapore City, 14-Manila, 15-Cebu, 16-KL
      const locations = [
        { id_country: 1, id_city: 1, id_region: 1 },   // South Korea / Seoul
        { id_country: 2, id_city: 3, id_region: 2 },   // Japan / Tokyo
        { id_country: 3, id_city: 6, id_region: 3 },   // Vietnam / HCMC
        { id_country: 4, id_city: 8, id_region: 4 },   // China / Shanghai
        { id_country: 5, id_city: 11, id_region: 1 },  // Indonesia / Bali
        { id_country: 6, id_city: 13, id_region: 1 },  // Singapore
        { id_country: 7, id_city: 14, id_region: 1 },  // Philippines / Manila
        { id_country: 8, id_city: 16, id_region: 1 },  // Malaysia / KL
      ];

      // --- Function to generate article data ---
      const generateArticle = (id) => {
        // Simple sequential rotation for location
        const locationIndex = (id - 1) % locations.length;
        const location = locations[locationIndex];

        // Randomly pick a category and 2 unique tags
        const category = categories[Math.floor(Math.random() * categories.length)];
        const tag1 = tags[Math.floor(Math.random() * tags.length)];
        let tag2 = tags[Math.floor(Math.random() * tags.length)];
        while (tag2 === tag1) {
          tag2 = tags[Math.floor(Math.random() * tags.length)];
        }
        const selectedTags = JSON.stringify([tag1, tag2]);

        const title = `Generated Article ${id}`;
        const slug_title = `generated-article-${id}`;
        const sub_title = `This is the subtitle for article ${id}`;
        const article_post = `<p>This is the main content for the generated article ${id}. It is a dummy post to fill the database.</p>`;
        const seo_title = `SEO Title ${id}`;
        const seo_desc = `SEO Description for article ${id}`;

        return {
          id,
          slug_title,
          current_version_id: null,
          author: "System",
          category: category,
          parent_category_id: null,
          id_country: location.id_country,
          id_city: location.id_city,
          id_region: location.id_region,
          createdBy: 1,
          createdAt: new Date(),
          pinned: 0,
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
          updatedBy: 1,
          updatedAt: new Date(),
          publishedAt: new Date(),
          publishedBy: 1,
        };
      };

      // --- Generate the 50 new articles (ID 5 to 54) ---
      const newArticles = [];
      for (let i = 5; i <= 54; i++) {
        newArticles.push(generateArticle(i));
      }

      // --- Existing articles (ID 1 to 4) ---
      const existingArticles = [
        {
          id: 1,
          slug_title: "holiday-in-bali",
          current_version_id: null, // will be updated later
          author: "System",
          category: 1, // Holiday
          parent_category_id: null,
          id_country: 5, // Indonesia
          id_city: 11, // Bali
          id_region: 1,
          createdBy: 1,
          createdAt: new Date(),
          pinned: 0,
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
          updatedBy: 1,
          updatedAt: new Date(),
          publishedAt: new Date(),
          publishedBy: 1,
        },
        {
          id: 2,
          slug_title: "job-listing-kuala-lumpur",
          current_version_id: null,
          author: "System",
          category: 2, // Job Listing
          parent_category_id: null,
          id_country: 8, // Malaysia
          id_city: 16, // Kuala Lumpur
          id_region: 1,
          createdBy: 1,
          createdAt: new Date(),
          pinned: 0,
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
          updatedBy: 1,
          updatedAt: new Date(),
          publishedAt: new Date(),
          publishedBy: 1,
        },
        {
          id: 3,
          slug_title: "technology-singapore",
          current_version_id: null,
          author: "System",
          category: 9, // Technology
          parent_category_id: null,
          id_country: 6, // Singapore
          id_city: 13,
          id_region: 1,
          createdBy: 1,
          createdAt: new Date(),
          pinned: 0,
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
          updatedBy: 1,
          updatedAt: new Date(),
          publishedAt: new Date(),
          publishedBy: 1,
        },
        {
          id: 4,
          slug_title: "housing-in-manila",
          current_version_id: null,
          author: "System",
          category: 7, // Housing
          parent_category_id: null,
          id_country: 7, // Philippines
          id_city: 14,
          id_region: 1,
          createdBy: 1,
          createdAt: new Date(),
          pinned: 0,
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
          updatedBy: 1,
          updatedAt: new Date(),
          publishedAt: new Date(),
          publishedBy: 1,
        },
      ];

      await queryInterface.bulkInsert("articles", [...existingArticles, ...newArticles], {});
    } catch (error) {
      console.error(error);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 0;");
    await queryInterface.bulkDelete("articles", null, {
      truncate: true,
      restartIdentity: true,
      cascade: true,
    });
    await queryInterface.sequelize.query(
      "ALTER TABLE articles AUTO_INCREMENT = 1"
    );
    await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 1;");
  },
};
