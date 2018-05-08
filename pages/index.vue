<template>
<div>
  <smallmenu v-bind:smallMenu="smallMenu" />
    <div v-bind:class="{fadeout: !show}">
      <searchpage v-if="searchPhrase"/>
      <div v-else>
        <blogheader/>
        <blogposts v-on:hidePosts="show = false" v-bind:allBlogposts="allBlogposts.slice(0,5)" v-bind:ispage="false"/>
        <newsletter v-bind:description="newsletterDescription" v-show="allBlogposts.length > 4" style="margin-bottom: 50px !important;"/>
        <blogposts v-on:hidePosts="show = false" v-bind:allBlogposts="allBlogposts.slice(5,10)" v-bind:ispage="true"/>
        <div class="container transparent">
          <div class="wrapper-narrow">           
            <router-link v-if="numberOfAllPosts > 10" rel="next" class="change-page right-button" v-bind:to="'/strona/'+2">Starsze posty <righticon class="right-icon"/></router-link>
          </div>
        </div>
      </div>
    </div>
</div>
</template>

<script>
import blogposts from '@/components/blogposts.vue'
import smallmenu from '@/components/smallmenu.vue'
import blogheader from '@/components/blogheader.vue'
import newsletter from '@/components/newsletter.vue'
import searchpage from '@/components/searchpage.vue'
import righticon from '@/components/righticon.vue'
import ALL_POSTS from '~/apollo/queries/ALL_POSTS.graphql'
import PAGE_DESCRIPTION from '~/apollo/queries/PAGE_DESCRIPTION.graphql'
import { asyncify } from 'async'

export default {
  data () {
    return {
      smallMenu: false,
      newsletterDescription: '',
      Yoff: 0,
      show: true
    }
  },
    asyncData(context) {
    let skip = 0;
    let postsQuery = context.app.provide.$apolloProvider.defaultClient.query({
      query: ALL_POSTS,
      variables: {
        skip: skip
      }
    });
    let descriptionQuery = context.app.provide.$apolloProvider.defaultClient.query({query: PAGE_DESCRIPTION});

    return Promise.all([postsQuery, descriptionQuery])
    .then((res) => {
      return {
        allBlogposts: res[0].data.allBlogposts,
        newsletterDescription: res[1].data.PageContent.pageDescription
      }
    })
  },
  components: {
    blogposts,
    blogheader,
    newsletter,
    smallmenu,
    searchpage,
    righticon
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
    Yoff: function(){
      if(this.Yoff > 666 || this.$store.getters.getSearchPhrase){
        this.smallMenu = true
      }else{
        this.smallMenu = false
      }
    },
    searchPhrase(newValue, prevValue){
      if(prevValue === '' && newValue !== ''){
        this.$scrollTo('.container', 1)
      }else if(prevValue !== '' && newValue === ''){
        this.$scrollTo('.container', 1, {offset: 700})
      }
    }
  },
  mounted(){
    document.addEventListener('scroll', ()=>{
      this.Yoff = window.pageYOffset;
    })
  }
}
</script>

<style>
.fadeout{
  opacity: 0;
  transition: 100ms opacity;
}
.right-button{
  margin-right: 0;
  margin-left: auto;
  float: right;
  clear: both;
  color: #d1d1d1 !important;
}
.right-icon{
  height: 0.83em;
  fill: #d1d1d1;
  transform: translateY(3px);
  margin-left: 5px;
}

@media screen and (max-width: 770px){
  .right-button{
    margin-bottom: 50px;
  }
}
</style>