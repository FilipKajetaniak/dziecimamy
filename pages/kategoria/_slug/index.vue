<template>
<div style="min-height: 90vh">
  <smallmenu v-bind:smallMenu="smallMenu" />
  <searchpage v-if="searchPhrase" />
  <div class="container grey" v-else>
    <div class="wrapper-narrow">
      <div class="category-name" v-bind:style="{color: categoryColor}">{{categoryName}}</div><br>
      <div class="category-description">{{categoryDescription}}</div>
    </div>
  </div>
  <blogposts v-bind:allBlogposts="allBlogposts" v-bind:ispage="true"/>
    <div class="container transparent">
    <div class="wrapper-narrow">           
      <router-link v-if="numberOfPosts > 10" rel="next" class="change-page right-button" v-bind:to="'/kategoria/'+ this.$route.params.slug +'/strona/2'">Starsze posty <font-awesome-icon style="transform: translateY(1px); font-size: 0.85em; margin-left: 5px;" :icon="['fas', 'arrow-right']"/></router-link>
    </div>
  </div>
</div>
</template>
<script>
import blogposts from '@/components/blogposts.vue'
import searchpage from '@/components/searchpage.vue'
import smallmenu from '@/components/smallmenu.vue'
import postsnav from '@/components/postsnav.vue'
import POSTS_BY_CATEGORY from '~/apollo/queries/POSTS_BY_CATEGORY.graphql'
import { asyncify } from 'async';

export default {
  data () {
    return {
      smallMenu: true,
      allBlogposts: [],
      categoryName: '',
      categoryDescription: '',
      numberOfPosts: 0
    }
  },
  components: {
    blogposts,
    postsnav,
    smallmenu,
    searchpage
  },
  computed: {
    categoryProp(){
      return this.$route.params.slug
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
  created(){
    this.$store.commit('setCategoryPostList', this.numberOfPosts)
  },
  asyncData(context) {
    return context.app.provide.$apolloProvider.defaultClient.query({
      query: POSTS_BY_CATEGORY,
      variables: {
            slug: context.params.slug,
            skip: 0
    }
    })
    .then((res) => {
      return {allBlogposts: res.data.Category.posts, categoryName: res.data.Category.name,
      categoryDescription: res.data.Category.description, categoryColor: res.data.Category.color,
      numberOfPosts: res.data.Category._postsMeta.count}
    })
  }
}
</script>
<style>
.category-name{
  margin-top: 100px;
  font-size: 2.4em;
  font-family: Nunito;
  font-weight: 700; 
}

.category-description{
    font-size: 1.4em;
    font-family: Nunito;
    font-weight: 300;
    color: rgb(153, 153, 153);
    letter-spacing: 0.5px;
    margin-bottom: 50px;
}
.right-button{
  margin-right: 0;
  margin-left: auto;
  float: right;
  clear: both;
}
.page-search{
  margin-top: 50px;
}
</style>