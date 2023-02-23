/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('user_info', function (table) {
        table.increments('id');
        table.string('name', 255).notNullable();
        table.date('dob', 6).notNullable();
        table.string('email', 255).notNullable();
        table.string('password', 255).notNullable();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('user_info')
};