"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("delivery_problems", {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            delivery_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "orders",
                    key: "id",
                },
                onUpdate: "CASCADE",
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: true,
            },
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("delivery_problems");
    },
};
