'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MatchSchema extends Schema {
  up() {
    this.create('matches', (table) => {
      table.increments()
      table.string('code', 6).notNullable()
      table.integer('owner_id').unsigned().references('id').inTable('users')
      table.integer('owner_score').defaultTo(0)
      table.integer('owner_last_answer').defaultTo(0)
      table.boolean('owner_isReady').defaultTo(false)
      table.boolean('owner_disconnected').defaultTo(false)
      table.boolean('owner_play_again').defaultTo(false)
      table.integer('opponent_id').unsigned().references('id').inTable('users')
      table.integer('opponent_score').defaultTo(0)
      table.integer('opponent_last_answer').defaultTo(0)
      table.boolean('opponent_isReady').defaultTo(false)
      table.boolean('opponent_disconnected').defaultTo(false)
      table.boolean('opponent_play_again').defaultTo(false)
      table.integer('round').defaultTo(0)
      table.string('last_questions', 254).defaultTo('')
      table.string('status', 254).defaultTo('')
      table.integer('winner_id').unsigned().references('id').inTable('users')
      table.timestamps()
    })
  }

  down() {
    this.drop('matches')
  }
}

module.exports = MatchSchema
