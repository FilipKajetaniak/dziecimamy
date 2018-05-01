<template>
  <div>
    <smallmenu v-bind:smallMenu="smallMenu" />
    <searchpage v-if="searchPhrase" />
    <div class="container grey" style="min-height: 90vh" v-else>
      <div class="wrapper-narrow-article">      
          <transition name="fade">
            <article  v-bind:class="{'blog-article': true, 'fadein': !loading}" >
              <div v-bind:class="{'article-date': true, 'fadein': !loading}">{{toTwoDigits(Blogpost.postDay)}}.{{toTwoDigits(Blogpost.postMonth)}}.{{Blogpost.postYear}}</div>
              <div v-bind:class="{'article-title': true, 'fadein': !loading}">
                  {{Blogpost.title}}
              </div>
              <div v-bind:class="{'article-text': true, 'fadein': !loading}" v-html="Blogpost.articleHtml">
              </div>
              <div v-bind:class="{'bottom-elements': true, 'fadein': !loading}">
                <div class="dividing-dots">...</div>
                <div class="share-on-facebook">Spodobał Ci się ten post? <span class="smile">😊</span><a v-bind:href="'https://www.facebook.com/sharer/sharer.php?u=dziecimamy.com/'+routeParam" target="_blank"><span class="fb-share"> Udostępnij go na Facebooku!</span></a></div>
              </div>          
            </article>
          </transition>
          <transition name="fade">
            <moreposts v-bind:postId="Blogpost.id" v-bind:id="Blogpost.category.id"></moreposts>
          </transition>
      </div>
    </div>
  </div>
</template>

<script>
import THIS_POST from '~/apollo/queries/THIS_POST.graphql'
import moreposts from '@/components/moreposts.vue'
import searchpage from '@/components/searchpage.vue'
import smallmenu from '@/components/smallmenu.vue'

export default {
  head () {
    return {
      'og:title': this.Blogpost.title,
      'og:url': `http://www.dziecimamy.com/${this.$route.params.slug}`,
      'og:image': this.Blogpost.thumbnail,
      'og:description': this.Blogpost.snippet
    }
  },
  data () {
    return {
      routeParam: this.$route.params.slug,
      Blogpost: {},
      loading: 0,
      show: false,
      fadein: false,
      smallMenu: true
    }
  },
  components: {
    moreposts,
    smallmenu,
    searchpage
  },
  asyncData(context) {
    let postSlug = context.params.slug;
    return context.app.provide.$apolloProvider.defaultClient.query({
      query: THIS_POST,
      variables: {
            slug: postSlug
    }
    })
    .then((res) => {
      return { Blogpost: res.data.Blogpost }
    })
  },
  methods: {
    toTwoDigits: num => {if(num < 10){return '0'+num}else{return num}},
    toggleSmallMenuStop(){
      document.removeEventListener('scroll', this.toggleSmallMenu);
      this.$store.commit('showMenu');
    },
    loadingChanged(){
      console.log('loading changed');
    },
    sendCatId(){
      this.$store.commit('setMorePostsCategory', this.Blogpost.category.id);
    }
  },
  watch: {
    '$route' (to, from){
      this.routeParam = this.$route.params.slug;
    },
    searchPhrase(newValue, prevValue){
      if(prevValue === '' && newValue !== ''){
        this.$scrollTo('.container', 1)
      }
    }
  },
  computed: {
    searchPhrase(){
      return this.$store.getters.getSearchPhrase
    }
  },
  mounted(){
  this.sendCatId();
  }
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: all ease-out 300ms;
  transition-delay: 10ms;
}
.fade-enter, .fade-leave-to{
  opacity: 0;
  transform: translateY(10px);
}
.fadein{
  opacity: 1 !important;
  transform: translateY(0px) !important;
}

.blog-article{
  width: inherit;
  margin-top: 100px;
  margin-bottom: 50px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 10px;
  background-color: white;
  padding: 50px 100px 100px;
  -webkit-box-shadow: 0px 4px 17px -5px rgba(179,179,179,0.48);
  -moz-box-shadow: 0px 4px 17px -5px rgba(179,179,179,0.48);
  box-shadow: 0px 4px 17px -5px rgba(179,179,179,0.48);
  opacity: 0;
  transform: translateY(10px);
  transition: all cubic-bezier(.3,.66,.56,1) 300ms;
  transition-delay: 1ms; 
}

.bottom-elements{
  opacity: 0;
  transform: translateY(10px); 
  transition: all cubic-bezier(.3,.66,.56,1) 300ms;
  transition-delay: 450ms;
}

.article-title{
    width: 100%;
    height: auto;
    /* text-align: center; */
    font-family: Nunito;
    color: #0097ff;
    font-weight: 800;
    font-size: 42px;
    letter-spacing: 2px;
    word-wrap: break-word;
    clear: both;
    margin-top: 50px;
    margin-bottom: 50px;
    opacity: 0;
    transform: translateY(10px);
    transition: all cubic-bezier(.3,.66,.56,1) 300ms;
    transition-delay: 150ms;
}
.image-wrapper{
    width: 100%;
    position: relative; 
}

.article-date{
    font-family: Nunito;
    color: rgb(219, 219, 219);
    font-size: 15px;
    font-weight: 800;
    float: left;
    opacity: 0;
    transform: translateY(10px); 
    transition: all cubic-bezier(.3,.66,.56,1) 300ms;
    transition-delay: 100ms;
}


.article-text{
    font-family: Lora;
    color: black;
    font-size: 1.2em;
    line-height: 1.6em;
    position: relative;
    width: 100%;
    overflow: hidden;
    opacity: 0;
    transform: translateY(10px);
    transition: all cubic-bezier(.3,.66,.56,1) 300ms;
    transition-delay: 300ms;

}

.article-text > img {
  display: block;
  margin-left: 50%;
}

.article-text > h1 {
    /* font-size: 1.6em;
    font-weight: 800;
    font-family: Nunito; */

    font-size: 1.4em;
    font-weight: bold;
    font-family: Lora;
    color: #333333 ;
    letter-spacing: 1px;
}

.article-text > blockquote:before{
    content: '„';
}

.article-text > blockquote:after{
  content: '”';
}

.article-text > blockquote {
    font-style: italic;
    margin-left: 0;
    padding-left: 15px;
    border-left: 5px solid #f8b724;
    font-size: 1.2em;
}
.svg-arrow{
  display: inline;
  transform: translateY(1.5px)
}


.blog-post-image{
    max-width: 100%;
    height: auto;
    display: block;
    margin: 0 auto;
}

.back-button{
    font-family: Nunito;
    color: #f26d5b;
    font-size: 1.2em;
    line-height: 1.7em;
    font-weight: 800;
    cursor: pointer;
}

.back-button:hover{
  color: #492540;
}

.fa-arrow-left{
  margin-right: 5px;
  transform: translateY(0.5px);
}

.dividing-dots{
  text-align: center;
  font-size: 2em;
  letter-spacing: 19px;
  margin-bottom: 30px;
}

.share-on-facebook{
  font-size: 1.4em;
  font-family: Nunito;
  font-weight: 300;
  margin-bottom: 30px;
  color: #666; 
  letter-spacing: 0.5px;
  width: 100%;
  text-align: center;
  margin-bottom: 70px;
}
.smile{
  margin-left: 1px;
}

/* DISQUS STYLES */
#disqus_thread a {
  color: #f26d5b;
}
/* DISQUS STYLES */

@-moz-keyframes wigglez {
    0%   {}
    5%  {transform: translateX(2px)}
    10%  {transform: translateX(-2px)}
    15% {transform: translateX(2px)}
    20% {transform: translateX(0px)}
    100% {transform: translateX(0px)}
}

@-webkit-keyframes wigglez {
    0%   {}
    5%  {transform: translateX(2px)}
    10%  {transform: translateX(-2px)}
    15% {transform: translateX(2px)}
    20% {transform: translateX(0px)}
    100% {transform: translateX(0px)}
}

@-o-keyframes wigglez {
    0%   {}
    5%  {transform: translateX(2px)}
    10%  {transform: translateX(-2px)}
    15% {transform: translateX(2px)}
    20% {transform: translateX(0px)}
    100% {transform: translateX(0px)}
}

@keyframes wigglez {
    0%   {}
    5%  {transform: translateX(2px)}
    10%  {transform: translateX(-2px)}
    15% {transform: translateX(2px)}
    20% {transform: translateX(0px)}
    100% {transform: translateX(0px)}
}

.fb-share{
  font-weight: 700;
  color: #4080ff;
  cursor: pointer;
  margin-left: 5px;
  display: inline-block;
  -webkit-animation: wigglez 3000ms infinite;
  -moz-animation:    wigglez 3000ms infinite;
  -o-animation:      wigglez 3000ms infinite;
  animation:         wigglez 3000ms infinite;
}

@media screen and (max-width: 1300px) {

}

@media screen and (max-width: 770px) {
    .blog-article{
      margin-top: 60px;
      margin-left: auto;
      margin-right: auto;
      border-top-right-radius: 0px;
      border-top-left-radius: 0px;
      background-color: white;
      padding: 40px 40px 40px;
    }

    .article-title{
      font-size: 1.9em;
      margin-top: 28px;
      margin-bottom: 0px;
    }

    img{
      height: auto;
      width: 100%;
    }

    .article-text{
      margin-top: 0;
      font-size: 1.1em;
    }

    .share-on-facebook{
      font-size: 1.3em;
    }

    .fb-share{
      margin-top: 20px;
      font-size: 1.3em;
    }
   }
   @media screen and (max-width: 430px) {
    .blog-article{
      margin-top: 60px;
      margin-left: auto;
      margin-right: auto;
      border-top-right-radius: 0px;
      border-top-left-radius: 0px;
      background-color: white;
      padding: 20px 20px 20px;
    }
   }
</style>
