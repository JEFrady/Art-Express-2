
exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('items').del()
      .then(function () {
        // Inserts seed entries
        return knex('items').insert([
          {name: 'Strawberry', price: '3', inventory: '500' },
          {name: 'Pear', price: '.23', inventory: '345'}
        ]);
        
      });
  };
