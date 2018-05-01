<template>
  <div class="admin-options">
    <categoryeditor v-bind:postlist="allBlogposts" v-bind:editMode="true" v-bind:categoryProperties="Category"/>
        <router-link to="/admin/kategorie">
          <div class="admin-option blue-border">
            <div class="back-to-admin">Wróć</div>
          </div>
        </router-link>
        </div>
</template>
<script>
import categoryeditor from '@/components/categoryeditor.vue'
import POST_LIST_WITH_ID from '~/apollo/queries/POST_LIST_WITH_ID.graphql'
import GET_CATEGORY from '~/apollo/queries/GET_CATEGORY.graphql'
import { asyncify } from 'async';

export default {
  layout: 'admin',
  components: {
    categoryeditor
  },
  data () {
    return {
      allBlogposts: [],
      Category: {}
    }
  },
  asyncData(context) {
    let getPostList = context.app.provide.$apolloProvider.defaultClient.query({query: POST_LIST_WITH_ID});
    let getCategoryInfo = context.app.provide.$apolloProvider.defaultClient.query({query: GET_CATEGORY, variables: {slug: context.params.slug}});
    
    return Promise.all([getPostList, getCategoryInfo])
    .then((res) => {
      return {allBlogposts: res[0].data.allBlogposts, Category: res[1].data.Category}
    })
  },
  created(){
    this.allBlogposts = this.allBlogposts.map((post)=>{
        let checkIfSelected=(id)=>{
            if(this.Category.posts.find((post)=>{return post.id === id})){
                return true
            }
            return false
        }

      return {
        id: post.id,
        title: post.title,
        selected: checkIfSelected(post.id)
      }
    });
  }
}
</script>