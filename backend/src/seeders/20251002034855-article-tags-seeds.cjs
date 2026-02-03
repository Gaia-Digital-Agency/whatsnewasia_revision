// "use strict";

// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up(queryInterface, Sequelize) {
//     await queryInterface.bulkInsert(
//       // 1 [1, 9]
//       // 2 [2, 3]
//       // 3 [3, 6]
//       // 4 [8, 10]
//       "article_tags",
//       [
//         {
//           id_article: 1,
//           id_tag: 1,
//         },
//         {
//           id_article: 1,
//           id_tag: 9,
//         },
//         {
//           id_article: 2,
//           id_tag: 2,
//         },
//         {
//           id_article: 2,
//           id_tag: 3,
//         },
//         {
//           id_article: 3,
//           id_tag: 3,
//         },
//         {
//           id_article: 3,
//           id_tag: 6,
//         },
//         {
//           id_article: 4,
//           id_tag: 8,
//         },
//         {
//           id_article: 4,
//           id_tag: 10,
//         },
//       ],
//       {}
//     );
//   },

//   async down(queryInterface, Sequelize) {
//     await queryInterface.bulkDelete("article_tags", null, {});
//   },
// };


"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // --- Helper data for generating new seeds ---
    const tags = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // Existing tag IDs

    // --- Function to generate tag connections for a single article ---
    const generateArticleTags = (articleId) => {
      // Randomly pick 2 unique tags
      const tag1 = tags[Math.floor(Math.random() * tags.length)];
      let tag2 = tags[Math.floor(Math.random() * tags.length)];
      while (tag2 === tag1) {
        tag2 = tags[Math.floor(Math.random() * tags.length)];
      }

      return [
        { id_article: articleId, id_tag: tag1 },
        { id_article: articleId, id_tag: tag2 },
      ];
    };

    // --- Generate the 50 new tag connections (for articles ID 5 to 54) ---
    const newArticleTags = [];
    for (let i = 5; i <= 54; i++) {
      newArticleTags.push(...generateArticleTags(i));
    }
    
    // --- Existing article tags (for articles ID 1 to 4) ---
    const existingArticleTags = [
      // Article 1 [1, 9]
      { id_article: 1, id_tag: 1 },
      { id_article: 1, id_tag: 9 },
      // Article 2 [2, 3]
      { id_article: 2, id_tag: 2 },
      { id_article: 2, id_tag: 3 },
      // Article 3 [3, 6]
      { id_article: 3, id_tag: 3 },
      { id_article: 3, id_tag: 6 },
      // Article 4 [8, 10]
      { id_article: 4, id_tag: 8 },
      { id_article: 4, id_tag: 10 },
    ];

    await queryInterface.bulkInsert(
      "article_tags",
      [...existingArticleTags, ...newArticleTags],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 0;");
    await queryInterface.bulkDelete("article_tags", null, {});
    await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 1;");
  },
};