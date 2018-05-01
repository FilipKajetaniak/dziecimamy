<template>
<div>
  <smallmenu v-bind:smallMenu="smallMenu"/>
  <searchpage v-if="searchPhrase"/>
  <div v-else style="padding-top: 100px">
  <!-- <div class="space"></div> -->
  <blogposts v-bind:allBlogposts="allBlogposts" v-bind:ispage="true"/> 
  <postsnav v-bind:numberOfAllPosts="numberOfAllPosts" v-bind:categoryMode="false"/>
  </div>
</div>
</template>
<script>
import blogposts from '@/components/blogposts.vue'
import smallmenu from '@/components/smallmenu.vue'
import searchpage from '@/components/searchpage.vue'
import postsnav from '@/components/postsnav.vue'
import blogheader from '@/components/blogheader.vue'
import ALL_POSTS from '~/apollo/queries/ALL_POSTS.graphql';
import { asyncify } from 'async';

export default {
  data () {
    return {
      smallMenu: true,
      Yoff: 0
    }
  },
  components: {
    blogheader,
    blogposts,
    postsnav,
    smallmenu,
    searchpage
  },
  computed: {
    numberOfAllPosts(){
      return this.$store.state.postList
    },
    searchPhrase(){
      return this.$store.getters.getSearchPhrase
    }
  },
  watch: {
    searchPhrase(newValue, prevValue){
      if(prevValue === '' && newValue !== ''){
        this.$scrollTo('.container', 1)
      }
    }
  },
  asyncData(context) {
      let skip = (Number(context.params.page) - 1) * 10;
      return context.app.provide.$apolloProvider.defaultClient.query({
      query: ALL_POSTS,
      variables: {
        skip: skip
      }
    })
    .then((res) => {
      return {allBlogposts: res.data.allBlogposts}
    })
  }
}
</script>
<style>
.page-search{
  margin-top: 50px;
}
</style>