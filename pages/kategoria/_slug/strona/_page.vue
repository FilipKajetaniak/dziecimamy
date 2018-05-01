<template>
<div>
  <smallmenu v-bind:smallMenu="smallMenu"/>
  <div v-bind:class="{fadeout: !show}">
    <searchpage v-if="searchPhrase" />
    <div v-else style="padding-top: 1px;">
      <blogposts v-on:hidePosts="show = false" v-bind:allBlogposts="allBlogposts" v-bind:ispage="true" style="margin-top: 100px;"/> 
      <postsnav v-bind:numberOfAllPosts="numberOfAllPosts" v-bind:categoryMode="true"
      v-bind:slug="slug"/>
    </div>
  </div>
</div>
</template>
<script>
import blogposts from '@/components/blogposts.vue'
import searchpage from '@/components/searchpage.vue'
import smallmenu from '@/components/smallmenu.vue'
import postsnav from '@/components/postsnav.vue'
import POSTS_BY_CATEGORY from '~/apollo/queries/POSTS_BY_CATEGORY.graphql';
import { asyncify } from 'async';

export default {
  data () {
    return {
        smallMenu: true,
        allBlogposts: [],
        categoryName: '',
        categoryDescription: '',
        slug: this.$route.params.slug,
        numberOfAllPosts: 0,
        show: true
    }
  },
  components: {
    blogposts,
    postsnav,
    smallmenu,
    searchpage
  },
  computed: {
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
      query: POSTS_BY_CATEGORY,
      variables: {
        slug: context.params.slug,
        skip: skip
      }
    })
    .then((res) => {
      return {allBlogposts: res.data.Category.posts, categoryName: res.data.Category.name,
      categoryDescription: res.data.Category.description, categoryColor: res.data.Category.color,
      numberOfAllPosts: res.data.Category._postsMeta.count}
    })
  }
}
</script>
<style>
.fadeout{
  opacity: 0;
  transition: 100ms opacity;
}
.page-search{
  margin-top: 50px;
}

</style>