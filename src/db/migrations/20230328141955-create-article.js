"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("articles", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
      },
      content: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
      },
      createdBy: {
        type: Sequelize.NUMBER,
        allowNull: false,
        unique: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      updatedBy: {
        type: Sequelize.NUMBER,
        allowNull: false,
        unique: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("articles");
  },
};
