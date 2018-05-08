<template>
  <div>
    <smallmenu v-bind:smallMenu="smallMenu" />
    <div v-bind:class="{fadeout: switchPost}">
      <searchpage v-if="searchPhrase" />
      <div class="container grey" style="min-height: 90vh" v-else>
        <div class="wrapper-narrow-article">      
            <transition name="fade">
              <article  class="blog-article" v-show="loaded">
                <div class="article-date">{{toTwoDigits(Blogpost.postDay)}}.{{toTwoDigits(Blogpost.postMonth)}}.{{Blogpost.postYear}}</div>
                <div class="article-title">
                    {{Blogpost.title}}
                </div>
                <div class="article-text" v-html="Blogpost.articleHtml">
                </div>
                <div class="bottom-elements">
                  <div class="dividing-dots">...</div>
                  <div class="share-on-facebook">Spodobał Ci się ten post? <span class="smile">😊</span><a v-bind:href="'https://www.facebook.com/sharer/sharer.php?u=dziecimamy.com/'+routeParam" target="_blank"><span class="fb-share"> Udostępnij go na Facebooku!</span></a></div>
                </div>
                <smallnewsletter v-bind:message="newsletterDescription" v-bind:visible="showSmallNewsletter"/>
                <div class="comments-container">
                  <div id="disqus_thread"></div>
                </div>
              </article>
            </transition>
            <transition name="fade">
              <moreposts  v-on:switchPost="switchPost = true" v-bind:postId="Blogpost.id" v-bind:id="Blogpost.category.id"></moreposts>
            </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import THIS_POST from '~/apollo/queries/THIS_POST.graphql'
import PAGE_DESCRIPTION from '~/apollo/queries/PAGE_DESCRIPTION.graphql'
import moreposts from '@/components/moreposts.vue'
import searchpage from '@/components/searchpage.vue'
import smallnewsletter from '@/components/smallnewsletter.vue'
import smallmenu from '@/components/smallmenu.vue'

export default {
  data () {
    return {
      routeParam: this.$route.params.slug,
      Blogpost: {},
      show: false,
      fadein: false,
      smallMenu: true,
      loaded: false,
      switchPost: false,
      newsletterDescription: '',
      Yoff: 0,
      showSmallNewsletter: false
    }
  },
  components: {
    moreposts,
    smallmenu,
    searchpage,
    smallnewsletter
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
    .catch((e) => {
      error({ statusCode: 404, message: 'Post not found' })
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
    },
    getNewsletterMessage(){
      this.$apollo.query({query: PAGE_DESCRIPTION})
      .then(res => {this.newsletterDescription = res.data.PageContent.pageDescription})
    },
    showNewsletter(){
      this.showSmallNewsletter = true;
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
  created(){
    this.getNewsletterMessage();
  },
  mounted(){
    const stopChecking = () => {
      document.removeEventListener('scroll', checkOffset);
      this.showNewsletter();
    };
    const checkOffset = event => {
        let offset = document.querySelector('.comments-container').offsetTop - window.innerHeight + 250;
        if (window.pageYOffset > offset && this.newsletterDescription){
          stopChecking();
        };
    };
    if(document.querySelector('.comments-container')){
      document.addEventListener('scroll', checkOffset)
    };

    this.sendCatId();
    this.loaded = true;

    var disqus_config = function () {
      this.page.url = `http://localhost:3000/${this.Blogpost.slug}`;  // Replace PAGE_URL with your page's canonical URL variable
      this.page.identifier = this.Blogpost.id; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
    };

    (function() {
      var d = document, s = d.createElement('script');
      s.src = 'https://dzikapapryka-2.disqus.com/embed.js';
      s.setAttribute('data-timestamp', +new Date());
      (d.head || d.body).appendChild(s);
    })();
  }
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: all ease-out 400ms;
}
.fade-enter, .fade-leave-to{
  opacity: 0;
  transform: translateY(10px);
}

.fadeout{
  opacity: 0;
  transition: 100ms opacity;
}

.comments-container{
  width: 100%;
  min-height: 1px;
  height: auto;
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
}

.article-title{
    width: 100%;
    height: auto;
    font-family: Nunito;
    color: #0097ff;
    font-weight: 800;
    font-size: 42px;
    letter-spacing: 2px;
    word-wrap: break-word;
    clear: both;
    margin-top: 50px;
    margin-bottom: 50px;
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
}


.article-text{
    font-family: Lora;
    color: black;
    font-size: 1.2em;
    line-height: 1.6em;
    position: relative;
    width: 100%;
    overflow: hidden;
}

.article-text > img {
  display: block;
  margin-left: 50%;
}

.article-text > h1 {
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

.blog-post-image{
    max-width: 100%;
    height: auto;
    display: block;
    margin: 0 auto;
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
  margin-bottom: 40px;
}
.smile{
  margin-left: 1px;
}

/* DISQUS STYLES */
#disqus_thread a {
  color: #0099ff;
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
