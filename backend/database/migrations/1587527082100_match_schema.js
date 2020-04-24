'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MatchSchema extends Schema {
  up () {
    this.create('matches', (table) => {
      table.increments()
      table.string('code', 6).notNullable()
      table.integer('owner_id').unsigned().references('id').inTable('users')
      table.integer('owner_score')
      table.integer('opponent_id').unsigned().references('id').inTable('users')
      table.integer('opponent_score')
      table.timestamps()
    })
  }

  down () {
    this.drop('matches')
  }
}

module.exports = MatchSchema
