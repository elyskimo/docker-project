<template>
  <div class="posts">
    <h1>Posts</h1>
    <p>
      <input type="text" v-model="title" placeholder="titre"/>
    </p>
    <p>
      <textarea v-model="description" placeholder="description"/>
    </p>
    <p>
      <button @click="createPost">Enregistrer</button>
    </p>
<!--    <button @click="getPosts">GET POSTS</button>-->

    <div v-for="post in posts"
    :key="post.id"
    >
      <p>
        <span><b>{{ post.title }}</b></span><br />
        <span>{{ post.description }}</span>
        <button @click="deletePost(post._id)">Supprimer</button>
      </p>
    </div>
  </div>
</template>

<script>
import PostsService from '@/services/PostsService'
import Api from '@/services/Api'
export default {
  name: 'posts',
  data () {
    return {
      posts: [],
      title: '',
      description: ''
    }
  },
  mounted () {
    this.getPosts()
  },
  methods: {
    async getPosts () {
      const response = await PostsService.fetchPosts()
      this.posts = response.data
    },
    async createPost () {
      if (this.title.length > 0 || this.description.length > 0) {
        const response = await Api().post('posts', {title: this.title, description: this.description})
        console.log(response)
        await this.getPosts()
      } else {
        console.log('veuillez remplir tous les champs')
      }
    },
    async deletePost (id) {
      const response = await Api().post('delete', {id: id})
      console.log(response)
      await this.getPosts()
    }
  }
}
</script>
