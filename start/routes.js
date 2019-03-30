'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
const Post = use('App/Models/Post');


Route.on    ('/signup').render('auth.signup');
Route.on    ('/login').render('auth.login');

Route.get   ('/', 'PostController.home');

Route.post  ('/signup', 'UserController.create')
    .validator('CreateUser')
    .as('CreateUser');

Route.post  ('/login', 'UserController.login')
    .validator('LoginUser')
    .as('LoginUser');

Route.get   ('/logout', async ({ auth, response }) => {
    console.log(await auth.logout());
    return response.redirect('/');
});

Route.get   ('/user_posts', 'PostController.userPosts');
Route.post  ('/user_posts', 'PostController.create')
    .validator('CreatePost')
    .as('CreatePost');

Route.get   ('/user_posts/delete/:id', 'PostController.delete');
Route.get   ('/user_posts/edit/:id', 'PostController.edit');
Route.post  ('/posts/update/:id', 'PostController.update');


Route.get   ('/ajax/posts_by_date', async ({ request, response }) => {
    const posts = await Post.query()
        .with('user')
        .where('created_at', request.all().date)
        .fetch();
    console.log(posts);
    return response.json({ posts: posts.toJSON() })
});

Route.get   ('/ajax/posts_by_user', async ({ request, response }) => {
    const posts = await Post.query()
        .with('user')
        .where('user_id', 2)
        .fetch();
    console.log(posts);
    return response.json({ posts: posts.toJSON() })
}); 