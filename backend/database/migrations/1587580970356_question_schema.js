'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class QuestionSchema extends Schema {
  up () {
    this.create('questions', (table) => {
      table.increments()
      table.string('title', 254).notNullable()
      table.string('image', 254).defaultTo('')
      table.string('answer1', 254).notNullable()
      table.string('answer2', 254).notNullable()
      table.string('answer3', 254).notNullable()
      table.string('answer4', 254).notNullable()
      table.integer('correct_answer').notNullable()
      table.integer('theme_id').notNullable().unsigned().references('id').inTable('themes')
      table.timestamps()
    })
  }

  down () {
    this.drop('questions')
  }
}

module.exports = QuestionSchema
