<template>
    <div class="admin-options">
       <div class="option-name outside">Wszystkie publiczne posty <span class="count">({{count}})</span></div>
      <div class="saved-post" v-for="post in allBlogposts" V-bind:key="post">
        <div class="saved-post-title">{{post.title}}<div class="additional-info-buttons">
          <router-link v-bind:to="'/admin/edytuj/'+ post.id"><button class="option-button">Edytuj</button></router-link>
          <button class="option-button cancel" @click="deletePost(post.id)">Usuń</button>
          </div></div>
        <div class="additional-info">
          <div class="saved-post-snippet">{{post.snippet}}</div>
        </div>
      </div>
      <router-link to="/admin/">
        <div class="admin-option blue-border">
          <div class="back-to-admin">Wróć</div>
        </div>
      </router-link>
    </div>
</template>

<script>
import ALL_POSTS_TO_EDIT from '~/apollo/queries/ALL_POSTS_TO_EDIT.graphql'
import DELETE_POST from '~/apollo/queries/DELETE_POST.graphql'
import IS_VALID from '@/apollo/queries/IS_VALID.graphql'
import { asyncify } from 'async'

export default {
  layout: 'admin',
  data () {
    return {
      allBlogposts: [],
    }
  },
  computed: {
    count(){
      return this.$store.state.postList
    }
  },
  methods: {
    deletePost(id){
      this.$apollo.mutate({
        mutation: DELETE_POST,
        variables: {
          id: id
        }
      })
      .then(()=>{
        this.allBlogposts = this.allBlogposts.filter(element=>{
          return element.id != id;
        })
        this.$store.commit('showOk', 'Usunięto post!')
        window.location.reload(true);
      })
      .catch(()=>{
        this.$store.commit('showError')
      })
    }
  },
  asyncData(context) {
    const posts = context.app.provide.$apolloProvider.defaultClient.query({query: ALL_POSTS_TO_EDIT});
    const valid = context.app.provide.$apolloProvider.defaultClient.query({query: IS_VALID});
    return Promise.all([valid, posts])
    .then((res) => {
      return { allBlogposts: res[1].data.allBlogposts}
    })
    .catch(()=> {context.redirect('/admin/zaloguj')})
  }
}
</script>
<style>
.saved-post{
  width: 100%;
  border: rgb(197, 197, 197) 1px solid;
  margin-bottom: 20px;
  background-color: white;
 color: rgb(104, 104, 104);
 position: relative;
}

.saved-post-title{
  width: 100%;
  height: auto;
  line-height: 1.1em;
  background-color: white;
  padding-left: 10px;
  padding-right: 170px;
  padding-top: 10px;
  padding-bottom: 10px;
  color: black;
}

.saved-post:last-of-type{
  margin-bottom: 50px;
}

.additional-info{
  width: 100%;
  background-color: white;
  height: auto;
  padding: 10px;
}

.saved-post-snippet{
  width: 430px;
}

.option-button{
    background-color: rgb(104, 182, 255);
    border: rgb(84, 164, 238) 1px solid;
    border-radius: 4px;
    color: white;
    height: auto;
    width: auto;
    cursor: pointer;
    font-family: Nunito;
    font-size: 1em;
    line-height: 1em;
    padding: 5px 10px;
    opacity: 1;
}

.option-button:hover{
    opacity: 0.8;
}

.cancel{
    background-color: rgb(255, 104, 104);
    border: rgb(238, 84, 84) 1px solid;
    margin-left: 10px;
}

.additional-info-buttons{
  background-color: white;
  position: absolute;
  right: 10px;
  top: 10px;
  display: block;
}
</style>