/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  return knex('trello_columns').del()
    .then(function () {
      const defaultValues = [{
        id: 1,
        columnTitle: 'Need to do',
        columnId: 1
      },
      {
        id: 2,
        columnTitle: 'In process',
        columnId: 2
      },
      {
        id: 3,
        columnTitle: 'Done',
        columnId: 3
      }]

      return knex('trello_columns').insert(defaultValues)
    })
};
