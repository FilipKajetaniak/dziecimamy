<template>
  <div class="container transparent">
    <div class="wrapper-narrow">
      <div class="pagination-buttons" v-show="!categoryMode">
        <div>
          <router-link rel="next" v-bind:to="prevPage()" class="change-page left-button"><font-awesome-icon style="font-size: 0.85em; margin-right: 5px;" :icon="['fas', 'arrow-left']"/> Nowsze posty</router-link>
        </div>
        <div class="pages-count">
          <router-link to="/" class="page-number">1</router-link>
          <router-link v-bind:to="`/strona/${number}`" v-for="number in pagesArray" :key="number" v-bind:class="{'page-number': true, activepage: pageIsActive(number)}"> {{number}} </router-link>
        </div>
        <div class="right-button-div">
          <router-link v-if="numberOfAllPosts > (Number(this.$route.params.page) * 10)" rel="prev" v-bind:to="nextPage()" class="change-page right-button">Starsze posty <font-awesome-icon style="font-size: 0.85em; margin-left: 5px;" :icon="['fas', 'arrow-right']"/></router-link>
        </div>
      </div>

      <div class="pagination-buttons" v-show="categoryMode">
        <div>
          <router-link rel="next" v-bind:to="prevCategoryPage()" class="change-page left-button"><font-awesome-icon style="font-size: 0.85em; margin-right: 5px;" :icon="['fas', 'arrow-left']"/> Nowsze posty</router-link>
        </div>
        <div class="pages-count">
          <router-link v-bind:to="`/kategoria/${slug}`" class="page-number">1</router-link>
          <router-link v-bind:to="`/kategoria/${slug}/strona/${number}`" v-for="number in pagesArray" :key="number" v-bind:class="{'page-number': true, activepage: pageIsActive(number)}"> {{number}} </router-link>
        </div>
        <div class="right-button-div">
          <router-link rel="prev"  v-if="numberOfAllPosts > (Number(this.$route.params.page) * 10)" v-bind:to="nextCategoryPage()" class="change-page right-button">Starsze posty <font-awesome-icon style="font-size: 0.85em; margin-left: 5px;" :icon="['fas', 'arrow-right']"/></router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['numberOfAllPosts','categoryMode', 'slug'],
  data () {
    return {
    }
  },
  computed: {
    pagesArray(){
      let array = [];
      for(let i = 2; i <= Math.ceil(this.numberOfAllPosts / 10); i++){
        array.push(i);
      }
      return array
    },
  },
  methods: {
    nextPage(){
      let newPage = Number(this.$route.params.page) + 1;
      return `/strona/${newPage}`
    },
    prevPage(){
      if (this.$route.params.page === "2"){
        return '/'
      }else{
      let newPage = Number(this.$route.params.page) - 1;
      return `/strona/${newPage}`
      }
    },
    nextCategoryPage(){
      let newPage = Number(this.$route.params.page) + 1;
      return `/kategoria/${this.slug}/strona/${newPage}`
    },
    prevCategoryPage(){
      if (this.$route.params.page === "2"){
        return `/kategoria/${this.slug}`
      }else{
      let newPage = Number(this.$route.params.page) - 1;
      return `/kategoria/${this.slug}/strona/${newPage}`
      }
    },
    pageIsActive(number){
      if (number === Number(this.$route.params.page)){
        return true
      }
      return false
    }
  },
  created(){

  }
}
</script>
<style>
.pagination-buttons{
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

.right-button-div{
  text-align: right;
  width: 100%;
}

.left-button{
  text-align: left;
}

.pages-count{
  font-family: Nunito;
  font-size: 1.2em;
  line-height: 1.7em;
  color: #d1d1d1;
  font-weight: 700;
  text-align: center;
}

.page-number{
  color: #d1d1d1;
}

.page-number:hover{
  color: rgb(85, 85, 85);
}

.activepage{
  color: rgb(85, 85, 85) !important;
  cursor: auto !important;
}

@media screen and (max-width: 770px) {
  .pages-count{
    display: none;
  }
  .pagination-buttons{
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-bottom: 50px;
  }
  .change-page{
    font-size: 1.1em;
  }
}
</style>