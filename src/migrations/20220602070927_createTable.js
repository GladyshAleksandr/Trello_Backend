
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('trello_columns', (table) => {
        table.increments()
        table.text('columnTitle').notNullable()
        table.integer('columnId').notNullable
    })
        .then(() => {
            return knex.schema.createTable("trello_cards", (table) => {
                table.increments()
                table.text('text').notNullable()
                table.integer('columnId').notNullable()
                table.integer('_order').notNullable()
            }).raw('ALTER TABLE trello_cards AUTO_INCREMENT = 100'); //? will it work ?
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('trello_cards')
        .then(() => {
            return knex.schema.dropTable('trello_columns')
        })
};
