<template>
<div class="more-posts" v-show="Category.posts.length || additionalCategory.length">Sprawdź też inne posty z kategorii <span class="category-color" v-bind:style="{'color': Category.color}">{{Category.name}}</span>:
    <div class="more-posts-grid">
        <div class="more-posts-item" @click="openPost(post.slug)" v-for="post in Category.posts" :key="post.id">
                <div class="more-posts-thumbnail">
                    <div class="more-posts-thumbnail-image" v-bind:style="{backgroundImage: 'url(' + post.thumbnail + ')'}"></div>
                    <div class="more-posts-title" v-bind:style="{'color': Category.color}">{{post.title}}</div>
                </div>    
        </div>
        <div class="more-posts-item" @click="openPost(post.slug)" v-for="post in additionalCategory" :key="post.id">
                <div class="more-posts-thumbnail">
                    <div class="more-posts-thumbnail-image" v-bind:style="{backgroundImage: 'url(' + post.thumbnail + ')'}"></div>
                    <div class="more-posts-title" v-bind:style="{'color': Category.color}">{{post.title}}</div>
                </div>       
        </div>
    </div>
</div>
</template>

<script>
import MORE_POSTS from '~/apollo/queries/MORE_POSTS.graphql';
import EVEN_MORE_POSTS from '~/apollo/queries/EVEN_MORE_POSTS.graphql';
import { asyncify } from 'async';

export default {
  props: ['postId', 'id'],
  data () {
    return {
        Category: {
          color: '',
          id: '',
          name: '',
          posts: []  
        },
        additionalCategory: {}
    }
  },
  computed: {
  },
    watch: {
    '$route' (to, from){
      this.postSlug = this.$route.params.slug;
    },
    Category(){
        if(this.Category._postsMeta.count > 4){
        this.fetchEvenMorePosts(4 - this.Category.posts.length)
        }
    }
  },
  methods: {
    openPost(slug){
        this.$emit('switchPost');
        setTimeout(() => {this.$router.push(`/${slug}`)},100)
    },
      fetchEvenMorePosts(first){
          this.$apollo.query({              
               query: EVEN_MORE_POSTS,
               variables: {
                   id: this.id,
                   postID: this.postId,
                   first: first
               }
          })
          .then((res)=>{
              this.additionalCategory=res.data.Category.posts     
          })
      }
  },
  apollo: { 
    Category: {
        query: MORE_POSTS,
        variables() {
            return {
                id: this.id,
                postId: this.postId
            }
        }
    }
    }
  }
</script>

<style>
.more-posts{
  font-size: 1.4em;
  font-family: Nunito;
  font-weight: 300;
  margin-bottom: 30px;
  color: rgb(153, 153, 153); 
  letter-spacing: 0.5px;
  width: 100%;
}
.more-posts-grid{
    width: 100%;
    margin-top: 40px;
}

.more-posts-item{
    height: 250px;
    width: 22%;
    margin: 0 auto;
    float: left;
    margin: 0 1%;
    margin-bottom: 30px;
}

/* .more-posts-item:first-of-type{
    margin-left: 0;
}

.more-posts-item:last-of-type{
    margin-right: 0;
} */

.more-posts-thumbnail{
    width: 100%;
    height: 250px;
    border-radius: 10px;
    background-color: white;
  -webkit-box-shadow: 0px 4px 17px -5px rgba(179,179,179,0.48);
  -moz-box-shadow: 0px 4px 17px -5px rgba(179,179,179,0.48);
  box-shadow: 0px 4px 17px -5px rgba(179,179,179,0.48);
  transition: all cubic-bezier(.3,.66,.56,1) 200ms;
  cursor: pointer;
  overflow: hidden;
  position: relative;
}

.more-posts-thumbnail-image{
    height: 240px;
    width: 100%;
    background-image: url('');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat; 
}

.more-posts-thumbnail:hover{
      transform: translateY(-5px);
  -webkit-box-shadow: 0px 9px 19px -5px rgba(179,179,179,0.45);
  -moz-box-shadow: 0px 9px 19px -5px rgba(179,179,179,0.45);
  box-shadow: 0px 9px 19px -5px rgba(179,179,179,0.45);
}

.category-color{
    color: rgb(0, 78, 102);
    font-weight: 700;
}

.more-posts-title{
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
    padding-top: 8px;
    padding-left: 14px;
    padding-bottom: 10px;
    padding-right: 14px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    word-wrap: break-word;
    font-size: 0.9em;
    font-weight: 700;
    background-color: white;
}

@media screen and (max-width: 770px){
    .more-posts-title{
       width: inherit;
       box-sizing: border-box;
    }
    .more-posts-grid{
        width: 90%;
        grid-column-gap: 5%;
        margin: 25px auto;
    }

    .more-posts-title{
        width: 100%;
    }

    .more-posts-item{
        width: 44%;
        margin: 0 3%;
        float: left;
        text-align: left;
        margin-bottom: 30px;
    }

    .more-posts{
        font-size: 1.2em;
        text-align: center;
    }
}

@media screen and (max-width: 430px){


    .more-posts-grid{
        grid-column-gap: 20px;
        width: 90%;
        margin: 25px auto;
    }
    .more-posts-item{
        text-align: left;
        margin-bottom: 30px;
        float: left;
        margin: 0 auto;
        width: 100%;
        margin-bottom: 20px;
    }

    .more-posts{
        font-size: 1.2em;
        text-align: center;
    }
}
</style>