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
const Post = use('App/Models/Post');


Route.on    ('/signup').render('auth.signup');
Route.on    ('/login').render('auth.login');

Route.get('/', 'PostController.home');
Route.post('/signup', 'UserController.create').as('CreateUser');
// .validator('CreateUser'); 
Route.post('/login', 'UserController.login').as('LoginUser');
// .validator('LoginUser');
Route.get   ('/logout', async ({ auth, response }) => {
    await auth.logout();
    return response.redirect('/');
});

Route.get('/user_posts', 'PostController.userPosts');
Route.post('/user_posts', 'PostController.create').as('CreatePost');
Route.get('/user_posts/delete/:id', 'PostController.delete');
Route.get('/user_posts/edit/:id', 'PostController.edit');
Route.post('/posts/update/:id', 'PostController.update');


Route.get('/ajax/posts_by_date', async ({ request, response }) => {
    const posts = await Post.query()
        .with('user')
        .where('created_at', request.all().date)
        .fetch();
        return response.json({ posts: posts.toJSON() })
});

Route.get('/ajax/posts_by_user', async ({ request, response }) => {
    const posts = await Post.query()
        .with('user')
        .where('user_id', 2)
        .fetch();
        
        return response.json({ posts: posts.toJSON() })
}); 