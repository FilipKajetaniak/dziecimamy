<template>
<div class="container grey">
  <div class="wrapper-narrow">
  <div v-for="post in allBlogposts" :key="post.id" style="margin-bottom: 50px;">
      <div class="blog-post-big" @click="openPost(post.slug)">
        <div class="blog-post-big-image" v-bind:style="{backgroundImage: 'url(' + post.thumbnail + ')'}"></div>
        <div class="blog-post-big-text">
          <div class="blog-post-big-title" v-bind:style="{'color': post.category.color}">{{post.title}}
          </div>
          <div class="blog-post-big-description">{{post.snippet}}
          <div class="fade-out-gradient"></div>
          </div>
        </div>
        <div class="blog-post-big-bottom-elements">
          <div class="blog-post-big-date">{{daysAgo(turnDateToObject(post.postDay, post.postMonth, post.postYear))}}</div>
          <div class="blog-post-big-category" v-bind:style="{background: post.category.color}">{{post.category.name}}</div>
        </div>
      </div>
  </div>
  </div>
  </div>
</template>

<script>

export default {
  props: ['allBlogposts', 'ispage'],
  data () {
    return {
      number: 7,
      loading: 0
    }
  },
  computed:{
    isnotpage(){
      let x = this.ispage
      return true
    }
  },
  methods: {
  openPost(slug){
    this.$emit('hidePosts');
    setTimeout(() => {this.$router.push(`/${slug}`)},100)
  },
  turnDateToObject(day, month, year){
    let post = {
    d: day,
    m: month,
    y: year
    }
    return post
  },
  daysAgo(post){

    let todayDate = new Date();
    let currentDay = todayDate.getDate();
    let currentMonth = todayDate.getMonth() + 1;
    let currentYear = todayDate.getFullYear();

    let today = {
    d: currentDay,
    m: currentMonth,
    y: currentYear
    };

    const getDateString = post => {
    const toTwoDigits = num => {if(num < 10){return '0'+num}else{return num}};
    return `${toTwoDigits(post.d)}.${toTwoDigits(post.m)}.${post.y}`
    }


    let daysOfMonth = [0,31,28,31,30,31,30,31,31,30,31,30,31];

    const ifLeapYear = year => {if (year % 4){return false}else{return daysOfMonth[2] = 29}};

    ifLeapYear(today.y);

  if(today.d === post.d && today.m === post.m && today.y === post.y){
    return 'Dzisiaj'
  }
  else{
    if(today.y === post.y){
        if(today.m === post.m){

          if(today.d - post.d > 7){
          return getDateString(post);
          }else if(today.d - post.d === 7){
          return 'Tydzień temu'
          }else if (today.d - post.d === 1){
          return 'Wczoraj'
          }else{
          return today.d - post.d + ' dni temu'
          }

        }else if (today.m - post.m === 1)
        {

          if(today.d > 7){
          return getDateString(post);
          }else if(daysOfMonth[post.m] - post.d + today.d === 7){
          return 'Tydzień temu'
          }else if(daysOfMonth[post.m] - post.d + today.d > 7){
          return getDateString(post);
          }else if(daysOfMonth[post.m] - post.d + today.d === 1){
          return 'Wczoraj'
          }else{
          return daysOfMonth[post.m] - post.d + today.d + ' dni temu'
          }

        }
        else{
        return getDateString(post);
        }
    }else if(today.y - post.y === 1 && post.m === 12 && today.m === 1){

        if(today.d > 7){
          return getDateString(post);
          }else if(daysOfMonth[post.m] - post.d + today.d === 7){
          return 'Tydzień temu'
          }else if(daysOfMonth[post.m] - post.d + today.d > 7){
          return getDateString(post);
          }else if(daysOfMonth[post.m] - post.d + today.d === 1){
          return 'Wczoraj'
          }else{
          return daysOfMonth[post.m] - post.d + today.d + ' dni temu'
          }


    }else{
        return getDateString(post);
    }
    }
  }
  }
}
</script>

<style>

.blog-post-big{
  width: 100%;
  height: 400px;
  margin-top: 50px;
  border-radius: 10px;
  -webkit-box-shadow: 0px 4px 17px -5px rgba(179,179,179,0.68);
  -moz-box-shadow: 0px 4px 17px -5px rgba(179,179,179,0.68);
  box-shadow: 0px 4px 17px -5px rgba(179,179,179,0.68);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  background-color: white;
}

.blog-post-big-text{
  position: relative;
  width: 50%;
  min-height: 400px;
  float: left;  
  box-sizing: border-box;
}

.fade-out-gradient{
  display: none;
}

.blog-post-big:first-of-type{
  margin-top: 0 !important;
}

.blog-post-big-title{
  margin-left: 50px;
  margin-top: 45px;
  margin-right: 50px;
  line-height: 35px;
  display: inline-block;
  font-family: Nunito;
  color: #f26d5b;
  font-weight: 800;
  font-size: 30px;
  letter-spacing: 2px;
  overflow-wrap: break-word;
  word-wrap: break-word;
  -ms-word-break: break-all;
  word-break: break-word;
  -ms-hyphens: auto;
  -moz-hyphens: auto;
  -webkit-hyphens: auto;
  hyphens: auto;
  width: 100%;
  padding-right: 80px;
  box-sizing: border-box;
}


.blog-post-big-description{
  margin-left: 50px;
  margin-top: 40px;
  margin-right: 50px;
  margin-bottom: 150px;
  font-family: Lora;
  color: rgb(83, 83, 83);
  font-size: 1.1em;
  overflow-wrap: break-word;
  word-wrap: break-word;
  -ms-word-break: break-all;
  word-break: break-word;
  -ms-hyphens: auto;
  -moz-hyphens: auto;
  -webkit-hyphens: auto;
  hyphens: auto;
}

.blog-post-big-description::after{
  content: '...'
}

.blog-post-big-date{
  margin-bottom: 10px;
  width: 40%;
  font-family: Nunito;
  color: #bbb;
  font-size: 15px;
  font-weight: 800;
  letter-spacing: 0.5px;
  background-color: white;
}

.blog-post-big-category{
  font-family: Nunito;
  color: white;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.5px;
  display: inline;
  border-radius: 80px;
  padding-left: 10px;
  padding-right: 10px;
}

.blog-post-big-bottom-elements{
  position: absolute;
  width: 50%;
  height: 20px;
  padding-top: 50px;
  bottom: 0;
  padding-left: 50px;
  padding-bottom: 108px;
  background-color: white;
  background: -webkit-linear-gradient(to bottom, transparent 0%, white 25%);
  background: -moz-linear-gradient(to bottom, transparent 0%, white 25%);
  background: linear-gradient(to bottom, transparent 0%, white 25%);
  box-sizing: border-box;
}

.blog-post-big-image{
  overflow: hidden;
  width: 50%;
  height: 100%;
  margin-right: 0;
  margin-left: auto;
  float: right;  
  background-size: cover;
  background-position: center;
}

.blog-post-big-image > img{
  width: auto;
  height: 140%;
  margin-left: auto;
  margin-right: auto;
}

.load-more{
  border: none;
  text-align: center;
  margin-bottom: 25px;;
}

.load-more > span:hover{
  cursor: pointer;
  color: #999;
}
@media screen and (max-width: 1000px) {
  .blog-post-big-description{
    margin-top: 20px;
  }
}

@media screen and (max-width: 770px) {
   .blog-post-big{
    max-width: 500px;
    height: auto;
    margin-left: auto;
    margin-right: auto;
  }
  .blog-post-big-image{
    width: 100%;
    height: 300px;
    margin-right: 0;
    margin-left: auto;
  }

  .fade-out-gradient{
    background-color: transparent;
    height: 50px;
    width: 100%;
    display: block;
    position: absolute;
    z-index: 2;
    bottom: 80px;
    background: -webkit-linear-gradient(to bottom, transparent 0%, white 100%);
    background: -moz-linear-gradient(to bottom, transparent 0%, white 100%);
    background: linear-gradient(to bottom, transparent 0%, white 100%);
  }

  .blog-post-big-description{
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 15px;
    height: 130px;
    margin-bottom: 80px;
    overflow: hidden;
    color: #666;
    font-size: 1.05em;
  }

  .blog-post-big-title{
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 15px;
    hyphens: auto;
    overflow-wrap: break-word;
    word-wrap: break-word;
    -ms-word-break: break-all;
    word-break: break-word;
    -ms-hyphens: auto;
    -moz-hyphens: auto;
    -webkit-hyphens: auto;
    box-sizing: border-box;
  }

  .blog-post-big-text{
    width: 100%;
    min-height: 200px;
  }

  .blog-post-big-bottom-elements{
    width: 100%;
    bottom: 20px;
    padding-left: 20px;
    padding-bottom: 50px;
  }
}
</style>
