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
    await queryInterface.bulkInsert('Categories', [
      { name: 'Молочные продукты', user_id: 2, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Овощи', user_id: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Фрукты', user_id: 1, createdAt: new Date(), updatedAt: new Date() },
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
