'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on    ('/').render('index');
Route.on    ('/signup').render('auth.signup');
Route.on    ('/login').render('auth.login');

Route.get('/', 'JobController.home');
Route.post('/signup', 'UserController.create').as('CreateUser');
// .validator('CreateUser'); 
Route.post('/login', 'UserController.login').as('LoginUser');
// .validator('LoginUser');
Route.get   ('/logout', async ({ auth, response }) => {
    await auth.logout();
    return response.redirect('/');
});