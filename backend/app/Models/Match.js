'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Match extends Model {
    owner() {
        return this.hasOne('App/Models/User', 'owner_id', 'id');
    }

    opponent() {
        return this.hasOne('App/Models/User', 'opponent_id', 'id');
    }
}

module.exports = Match
