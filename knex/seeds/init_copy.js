
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  knex('copy').del()
  .then( () => {
    return knex('copy').insert([
      {title: 'Is organic worth it?', body: 'Lorem ipsum', author: 'Nate Sunflower'},
      {title: 'Paleo recipes', body: 'Lorem ipsum', author: 'Terry Turnip'},
      {title: 'Employee of the Month', body: 'Lorem ipsum', author: 'Bobbi Boss'}
    ]);
  });

};
