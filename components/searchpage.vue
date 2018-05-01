<template>
    <div class="container grey" style="min-height: 100vh;">
        <div class="wrapper-narrow">
            <h2 class="searchpage">Wyniki wyszukiwania:</h2>
            <div class="loading" v-if="loading">Loading</div>
            <div class="search-results" v-else>
                <div v-if="allBlogposts.length">
                    <div @click="$router.push(`/${post.slug}`)" class="search-result" v-for="post in allBlogposts" :key="post.slug">
                        {{post.title}}
                    </div>
                </div>
                <div class="no-results" v-else>Ups nie znaleziono szukanej frazy! 😢</div>
            </div>
        </div>
    </div>
</template>
<script>
import SEARCH from '~/apollo/queries/SEARCH.graphql'
import { asyncify } from 'async';

export default {
  data () {
    return {
        allBlogposts: [],
        loading: 0
    }
  },
  computed: {
      searchPhrase(){
          return this.$store.getters.getSearchPhrase
      }
  },
  methods: {
      search(){
        if(this.searchPhrase){
            this.$apollo.query({
            query: SEARCH,
            loadingKey: 'loading',
            variables: {search: this.searchPhrase}
            }).then(res=>{
                this.allBlogposts = res.data.allBlogposts
            })
        }
      }
  },
  watch: {
      searchPhrase(){
          this.search()
      }
  },
  mounted(){
      this.search()
    }
}
</script>
<style>
.searchpage{
    padding-top: 100px;
    color: #0097ff;
    font-size: 2.4em;
    font-weight: 700;
    font-family: Nunito;
}
.search-result{
    color: rgb(153, 153, 153);
    font-weight: 700;
    font-size: 1.4em;
    letter-spacing: 0.5px;
    margin-bottom: 20px;
    font-family: Nunito;
    padding: 14px;
    background-color: white;
    border-radius: 10px;
    -webkit-box-shadow: 0px 4px 17px -5px rgba(179,179,179,0.48);
    -moz-box-shadow: 0px 4px 17px -5px rgba(179,179,179,0.48);
    box-shadow: 0px 4px 17px -5px rgba(179,179,179,0.48);
    cursor: pointer;
    transition: all cubic-bezier(.3,.66,.56,1) 200ms;
}

.search-result:last-of-type{
    margin-bottom: 50px;
}

.search-result:hover{
        transform: translateY(-5px);
  -webkit-box-shadow: 0px 9px 19px -5px rgba(179,179,179,0.45);
  -moz-box-shadow: 0px 9px 19px -5px rgba(179,179,179,0.45);
  box-shadow: 0px 9px 19px -5px rgba(179,179,179,0.45);  
  color: #0097ff;
}

.no-results{
  color: rgb(153, 153, 153);
  width: 100%;
  font-size: 1.5em;
  margin-top: 100px;
  text-align: center;
  font-family: Nunito; 
}
</style>
