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

Route.get('/users/:username', 'UserController.getOrCreateUser');

Route.post('/matchs', 'MatchController.store');
Route.post('/matchs/join', 'MatchController.join');

Route.resource('questions', 'QuestionController').apiOnly();
Route.get('/questions/random/:theme', 'QuestionController.getRandomQuestion');
Route.post('/questions/answer', 'QuestionController.answerQuestion');

Route.resource('themes', 'ThemeController').apiOnly();
