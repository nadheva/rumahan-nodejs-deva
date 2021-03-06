'use strict'

const { _registerOptionsWithCommander } = require("@adonisjs/ace/src/Command")

const Post = use('App/Models/Post')

class PostController {

  async index({ request, response, view }) {
    const posts = await Post.all()

    return view.render('posts.index', { posts: posts.rows })
  }

  create({ request, response, view}) {
      return view.render('posts.create')
  }

  async store({ request, response, view, session}) {
      const post = new Post()

      post.judul = request.input('judul')
      post.isi   = request.input('isi')
      await post.save()

      session.flash({ notification: 'Data berhasil disimpan'})
      return response.route('posts.index')    
    }

    async edit({ request, response, view, params}) {
        const id = params.id
        const post = await Post.find(id)

        return view.render('posts.edit', {post: post})
    }

    async update({ request, response, view, params, session}) {
        const  id = params.id
        const post = await Post.find(id)
        

        post.judul = request.input('judul')
        post.isi = request.input('isi')
        await post.save()

        session.flash({notification: 'Data berhasil diupdate!'})
        return response.route('posts.index')
    }

    async delete({ request, response, view, params, session}) {
      const id = params.id
      const post = await Post.find(id)
      await post.delete()
    
      session.flash({ notification: 'Data Berhasil Dihapus!' })
      return response.route('posts.index')
    }
}

module.exports = PostController