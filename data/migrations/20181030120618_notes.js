exports.up = function(knex, Promise) {
    return knex.schema.createTable('notes', function(notes) {
      notes.increments('_id');
  
      notes.string('title', 128).notNullable();
      notes.text('textBody').notNullable();
      notes.text('tags');
      notes.string('user', 128);
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('notes');
  };
  