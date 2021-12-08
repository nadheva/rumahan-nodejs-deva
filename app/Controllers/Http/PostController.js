'use strict'

const Post = use('App/Models/Post')

class PostController {

  async index({ request, response, view }) {
    const posts = await Post.all()

    return view.render('posts.index', { posts: posts.rows })
  }

}

module.exports = PostController