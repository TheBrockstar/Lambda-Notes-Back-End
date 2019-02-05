
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        { title: 'Sample Note 1', textBody: 'This is a sample note for seeding purposes.' },
        { title: 'Sample Note 2', textBody: 'This is a second sample note for seeding purposes.' },
        { title: 'Sample Note 3', textBody: 'This is a third sample note for seeding purposes.' }
      ]);
    });
};
