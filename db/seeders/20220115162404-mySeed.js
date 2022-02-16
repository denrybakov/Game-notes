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
    await queryInterface.bulkInsert('Users', [
      { name: 'Denis', email: 'rybakov22denis@yandex.ru', password: '123', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Rich', email: 'r@r.ru', password: '123', createdAt: new Date(), updatedAt: new Date() },
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
