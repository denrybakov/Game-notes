'use strict';

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
    await queryInterface.bulkInsert('Products', [
      { name: 'Молоко', category_id: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Сыр', category_id: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Банан', category_id: 3, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Помидор', category_id: 2, createdAt: new Date(), updatedAt: new Date() },
    ], {})
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
