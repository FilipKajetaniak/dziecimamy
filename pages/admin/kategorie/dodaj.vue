<template>
  <div class="admin-options">
    <categoryeditor v-bind:postlist="allBlogposts" v-bind:editMode="false" v-bind:categoryProperties="Category"/>
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
import IS_VALID from '@/apollo/queries/IS_VALID.graphql'
import { asyncify } from 'async';

export default {
  layout: 'admin',
  components: {
    categoryeditor
  },
  data () {
    return {
      allBlogposts: [],
      Category: {
        id: '',
        name: '',
        slug: '',
        color: '',
        description: '',
        posts: []
      }
    }
  },
  asyncData(context) {
    const postList = context.app.provide.$apolloProvider.defaultClient.query({query: POST_LIST_WITH_ID})
    const valid = context.app.provide.$apolloProvider.defaultClient.query({query: IS_VALID});
    return Promise.all([valid, postList])
    .then((res) => {
      return {allBlogposts: res[1].data.allBlogposts}
    })
    .catch(()=> {context.redirect('/admin/zaloguj')})
  },
  created(){
    this.allBlogposts = this.allBlogposts.map((post)=>{
      return {
        id: post.id,
        title: post.title,
        selected: false
      }
    });
  }
}
</script>