'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Question extends Model {
    theme() {
        return this.hasOne('App/Models/Theme', 'theme_id', 'id');
    }
}

module.exports = Question
