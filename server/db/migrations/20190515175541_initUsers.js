exports.up = async function(knex, Promise) {
  await knex.schema.createTable("users", table => {
    table
      .increments("user_id")
      .unsigned()
      .primary();
    table
      .string("email")
      .unique()
      .notNullable();
    table.string("first_name").notNullable();
    table.string("last_name").notNullable();
    table.string("profile_photo_url").nullable();
    table
      .boolean("membership_paid")
      .notNullable()
      .defaultTo(false);
    table
      .timestamp("created_at")
      .notNullable()
      .defaultTo(knex.raw("now()"));
    table.timestamp("updated_at").nullable();
  });
};

exports.down = async function(knex, Promise) {
  await knex.schema.dropTable("users");
};
