'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('username', 80).notNullable().unique()
      table.string('name', 80).notNullable()
      table.integer('repos_quantity').defaultTo(0)
      table.string('image_url', 254)
      table.integer('wins').defaultTo(0)
      table.integer('losses').defaultTo(0)
      table.integer('ties').defaultTo(0)
      table.integer('score').defaultTo(0)
      table.string('socket_id', 254).defaultTo('')
      table.string('email', 254).unique()
      table.string('password', 60)
      table.string('type', 254).defaultTo('user')
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
