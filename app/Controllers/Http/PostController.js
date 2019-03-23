'use strict'

const Post = use('App/Models/Post')

class PostController {
    async home({ view }) {
        const posts = await Post.all();
        return view.render('index', { posts: posts.toJSON() })
    }
}

module.exports = PostController
