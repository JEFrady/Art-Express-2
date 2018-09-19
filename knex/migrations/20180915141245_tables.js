
exports.up = function(knex, Promise) {
    return Promise.all([
    knex.schema.createTable('items', function(table) {
        table.increments();
        table.string('name').notNullable();
        table.string('price').notNullable();
        table.string('inventory').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
      }),
      knex.schema.createTable('copy', function(table) {
        table.increments();
        table.string('title').notNullable();
        table.string('body').notNullable();
        table.string('author').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
      })
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('items'),
        knex.schema.dropTable('copy')
      ]);
};


