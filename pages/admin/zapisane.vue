<template>
    <div class="admin-options">
      <div class="option-name outside">Wszystkie zapisane posty <span class="count">({{count}})</span></div>
      <div class="saved-post" v-for="post in allSavedposts" V-bind:key="post">
        <div class="saved-post-title">{{post.title}}</div>
        <div class="additional-info">
          <div class="saved-post-snippet">{{post.snippet}}</div>
          <router-link v-bind:to="'/admin/zapisanypost/'+ post.id">
             <button class="option-button">Dodaj</button>
          </router-link>
          <button class="option-button cancel" @click="deleteSavedPost(post.id)">Usuń</button>
        </div>
      </div>
        <router-link to="/admin/dodaj">
          <div class="admin-option blue-border">
            <div class="back-to-admin">Wróć</div>
          </div>
        </router-link>
        </div>
</template>

<script>
import ALL_SAVED_POSTS from '~/apollo/queries/ALL_SAVED_POSTS.graphql'
import DELETE_SAVED_POST from '~/apollo/queries/DELETE_SAVED_POST.graphql'
import { asyncify } from 'async'

export default {
  layout: 'admin',
  data () {
    return {
      allSavedposts: [],
    }
  },
  computed: {
    count(){
      return this.allSavedposts.length
    }
  },
  methods: {
    deleteSavedPost(id){
      this.$apollo.mutate({
        mutation: DELETE_SAVED_POST,
        variables: {
          id: id
        }
      }).then(()=>{
        this.allSavedposts = this.allSavedposts.filter(element=>{
          return element.id != id;
        });
        this.$store.commit('showOk', 'Usunięto zapisany post!');
        window.location.reload(true);
      })
      .catch(()=>{
        this.$store.commit('showError');
      })
    }
  },
  asyncData(context) {
    let skip = 0;
    return context.app.provide.$apolloProvider.defaultClient.query({
      query: ALL_SAVED_POSTS
    })
    .then((res) => {
      return { allSavedposts: res.data.allSavedposts}
    })
  }
}
</script>
<style>
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
</style>