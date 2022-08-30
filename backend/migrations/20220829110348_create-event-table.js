/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('eventsTable', table => {
    table.increments();
      table.datetime('time', { precision: 6 }).notNullable();
      table.text('subject');
  }
  )
    .createTable('remindersTable', table => {
      table.increments();
        table.datetime('remind_time', { precision: 6 }).notNullable();
        table.integer('eventsTable_id')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('eventsTable')
          .onDelete('CASCADE')
          .onUpdate('CASCADE');
    }
    )
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('eventsTable')
};
