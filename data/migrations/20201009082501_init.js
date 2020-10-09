const { table } = require("console");

exports.up = function(knex) {
  return knex.schema
    .createTable("projects", tbl => {
      tbl.increments();
      tbl.text("project_name").notNullable();
      tbl.text("description");
      tbl.boolean("completed").notNullable().defaultTo(false);
    })

    .createTable("resources", tbl => {
      tbl.increments();
      tbl.text("resource_name").notNullable();
      tbl.text("description");
      tbl.integer('project_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('projects')
      .onUpdate('RESTRICT')
      .onDelete('CASCADE');
    })

    .createTable("tasks", tbl => {
      tbl.increments();
      tbl.text("task_name").notNullable();
      tbl.text("description").notNullable();
      tbl.text("notes");
      tbl.boolean("completed").notNullable().defaultTo(false);
    })

    .createTable("project_tasks", tbl => {
      tbl.increments();
      tbl.integer('project_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('projects')
      .onUpdate('RESTRICT')
      .onDelete('CASCADE');
      tbl.integer('task_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('tasks')
      .onUpdate('RESTRICT')
      .onDelete('CASCADE');
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("project_tasks")
    .dropTableIfExists("tasks")
    .dropTableIfExists("resources")
    .dropTableIfExists("projects")
};
