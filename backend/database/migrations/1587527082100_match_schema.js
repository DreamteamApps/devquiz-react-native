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
      table.integer('owner_last_answer')
      table.boolean('owner_isReady')
      table.integer('opponent_id').unsigned().references('id').inTable('users')
      table.integer('opponent_score')
      table.integer('opponent_last_answer')
      table.boolean('opponent_isReady')
      table.integer('round')
      table.string('last_questions', 254)
      table.string('status', 254)
      table.timestamps()
    })
  }

  down () {
    this.drop('matches')
  }
}

module.exports = MatchSchema
