'use strict'
const Database = use('Database')

/*
|--------------------------------------------------------------------------
| DatabaseSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const config = {
  themes: require('./raw/themes.json'),
  questions: require('./raw/questions.json'),
  users: require('./raw/users.json')
}

class DatabaseSeeder {
  async run() {
    const seeds = Object.entries(config);
    const now = new Date();

    for (let seed of seeds) {
      const [table, data] = seed;
      for(let row of data) {
        await Database.table(table).insert({ ...row, created_at: now, updated_at: now });
      }
    }
  }
}

module.exports = DatabaseSeeder
