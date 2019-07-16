'use strict'

const Post = use('App/Models/Post');
const CloudinaryService = use('Cloudinary')

class PostController {
    async home({ view , session, auth }) {
        const posts = await Post.query()
        .with('user')
        .fetch();
        return view.render('index', { posts: posts.toJSON() })
    }


    async userPosts({view, auth}) {
        const posts = await auth.user.posts().fetch();

        return view.render('user-posts', { posts: posts.toJSON() })
    }

    
    async create({ request, response, session, auth}) {
        const post = request.all(); 
        const file = request.file('image');
        var cloudinaryResponse;
        if(file) {
            try {
                cloudinaryResponse = await CloudinaryService.uploader.upload(file.tmpPath);
                await auth.user.posts().create({
                    title: post.title,
                    description: post.description,
                    image_url: cloudinaryResponse.secure_url,
                    user_id: auth.user.id
                });
                session.flash({ message: 'Your post has been posted!' });
            } catch (e) {
                session.flash({message: 'Error'});
            }
            return response.redirect('back');
        } else {
            await auth.user.posts().create({
                title: post.title,
                description: post.description,
                image_url: null,
                user_id: auth.user.id
            });
            session.flash({ message: 'Your post has been posted!' });
            return response.redirect('back');
        }

    }

    async delete({ response, session, params}) {
        const post = await Post.find(params.id);
        await post.delete();
        session.flash({ message: 'Your post has been removed'});
        return response.redirect('back');
    }


    async edit({ params, view }) {
        const post = await Post.find(params.id);
        return view.render('edit-post', { post: post });
    }


    async update ({ response, request, session, params }) {
        const post = await Post.find(params.id);
        post.title = request.all().title;
        post.description = request.all().description;
        post.image_url = request.all().image_url;
        post.user_id = request.all().user_id;

        await post.save();
        session.flash({ message: 'Your post has been updated. '});
        return response.redirect('/user_posts');
    }
}

module.exports = PostController
