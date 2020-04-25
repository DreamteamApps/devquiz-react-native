'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/users/:githubuser', 'UserController.getOrCreateUser');

Route.get('/match/create/:userid', 'MatchController.store');
Route.post('/match/join', 'MatchController.join');

Route.resource('questions', 'QuestionController').apiOnly();
Route.resource('themes', 'ThemeController').apiOnly();
