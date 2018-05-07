<template>
  <div>
    <div v-bind:class="{'small-menu-bar': true, 'small-menu-visible': smallMenu, 'open': opened && smallMenu}">
        <div class="container">
          <div class="wrapper">
            <div class="small-menu-content">
              <div class="left-side-buttons">
                <router-link to="/">
                  <div class="small-menu-item homepage" @click="clearSearchPhrase">dziecimamy</div>
                </router-link>
                  <div class="small-menu-item social-media facebook"><a href="https://www.facebook.com/idziecimamy/"><font-awesome-icon class="fab fa-facebook-square" :icon="['fab', 'facebook-square']"/></a></div>
                  <div class="small-menu-item social-media instagram"><a href="https://www.instagram.com/kokornak.idziecimamy/"><font-awesome-icon class="fab fa-instagram" :icon="['fab', 'instagram']"/></a></div>
                  <div class="small-menu-item social-media twitter"><a href="https://twitter.com/kokornak"><font-awesome-icon class="fab fa-twitter" :icon="['fab', 'twitter']"/></a></div>
                  <div class="small-menu-item social-media google-plus"><a href="https://plus.google.com/107884031529380169655"><font-awesome-icon class="fab fa-google-plus-g" :icon="['fab', 'google-plus-g']"/></a></div>
              </div>
              <div class="right-side-buttons">
                <div class="small-menu-item search-menu-item hideable" id="search-menu-button"><font-awesome-icon class="search-icon" :icon="['fas', 'search']"/>
                  <div class="small-menu-popup" id="search-popup">
                    <div class="search-inputs">
                      <input type="text" placeholder="Wpisz szukaną frazę" v-model="search">
                    </div>
                  </div>
                  </div>
                <router-link to="/zacznij-tutaj" class="hideable"><div class="small-menu-item">Zacznij tutaj</div></router-link>
                <div class="small-menu-item hideable" id="categories-menu-item">Szufladki
                  <div class="small-menu-popup">
                    <div v-for="category in allCategories" :key="category.name" class="small-menu-popup-item" @click="$router.push(`/kategoria/${category.slug}`)">{{category.name}}</div>
                  </div>
                </div>
                <router-link to="/archiwum" class="hideable"><div class="small-menu-item">Stare dzieje</div></router-link>
                <router-link to="/o-mnie" class="hideable"><div class="small-menu-item" style="margin-right: -30px">Z kim masz do czynienia</div></router-link>
              </div>
              <div class="hamburger" @click="openMenu()">
               <div v-bind:class="{'bar': true, 'bar1': true, 'bar1-clicked': clicked, 'bar1-opened': opened}"></div>
               <div v-bind:class="{'bar': true, 'bar2': true, 'bar2-clicked': clicked, 'bar2-opened': opened}"></div>
               <div v-bind:class="{'bar': true, 'bar3': true, 'bar3-clicked': clicked, 'bar3-opened': opened}"></div>
              </div>
            </div>
            <div :class="{'mobile-menu-items': true, 'open-categories': openCategories}" v-show="clicked && smallMenu">
              <router-link to="/zacznij-tutaj">
                <transition name="slideout">
                  <div id="start-here-button" :class="{'mobile-menu-item': true, 'landed': landed}" style="transition-delay: 60ms">Zacznij tutaj</div>
                </transition>
              </router-link>
              <div @click="openCategories = !openCategories" :class="{'mobile-menu-item': true, 'landed': landed}" style="transition-delay: 120ms">Szufladki</div>
              <div :class="{'mobile-menu-item': true, 'mobile-menu-category-list': true, 'landed': landed}">
                <div class="mobile-category-list-container">
                  <div v-for="category in allCategories" :key="category.name" class="small-menu-popup-item" @click="$router.push(`/kategoria/${category.slug}`)">{{category.name}}</div>
                </div>
              </div>
              <router-link to="/archiwum"><div :class="{'mobile-menu-item': true, 'landed': landed}" style="transition-delay: 180ms">Stare dzieje</div></router-link>
              <router-link to="/o-mnie"><div :class="{'mobile-menu-item': true, 'landed': landed}" style="transition-delay: 240ms">Z kim masz do czynienia</div></router-link>
              <div :class="{'mobile-menu-item': true, 'social-media-links': true, 'landed': landed}" style="transition-delay: 320ms">
                <div class="small-menu-item social-media facebook"><a href="https://www.facebook.com/idziecimamy/"><font-awesome-icon class="fab fa-facebook-square" :icon="['fab', 'facebook-square']"/></a></div>
                <div class="small-menu-item social-media instagram"><a href="https://www.instagram.com/kokornak.idziecimamy/"><font-awesome-icon class="fab fa-instagram" :icon="['fab', 'instagram']"/></a></div>
                <div class="small-menu-item social-media twitter"><a href="https://twitter.com/kokornak"><font-awesome-icon class="fab fa-twitter" :icon="['fab', 'twitter']"/></a></div>
                <div class="small-menu-item social-media google-plus"><a href="https://plus.google.com/107884031529380169655"><font-awesome-icon class="fab fa-google-plus-g" :icon="['fab', 'google-plus-g']"/></a></div>
              </div>
              <div class="categories-menu">

              </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['smallMenu'],
  data () {
    return {
      clicked: false,
      opened: false,
      landed: false,
      openCategories: false,
      search: '',
    }
  },
  computed: {
    allCategories(){
      return this.$store.state.allCategories
    }
  },
  methods: {
    openMenu(){
      if(this.clicked){
        this.openCategories = false;
        this.landed = false;
        this.opened = false;
        setTimeout(()=>{this.clicked = false}, 200);
      }else{
        this.openCategories = false;
        this.clicked = true;
        setTimeout(()=>{this.opened = true; this.landed = true}, 200);
      }
    },
    clearSearchPhrase(){
      this.$store.commit('clearSearchPhrase')
    }
  },
  watch: {
    search(){
      this.$store.commit('setSearchPhrase', this.search)
    }
  }
}
</script>
<style scoped>
.page-transition-enter-active, .page-transition-leave-active {
  transition: none !important;
}
.page-transition-enter, .page-transition-leave-to{
  opacity: 1 !important;
}
</style>

<style>
.slideout-enter-active, .slideout-leave-active {
  transition: opacity .5s;
}
.slideout-enter, .slideout-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}


.small-menu-bar{
    background-color: white;
    height: 60px;
    width: 100%;
    position: fixed;
    z-index: 1000;
    -webkit-box-shadow: 0px 4px 17px -5px rgba(179,179,179,0.48);
    -moz-box-shadow: 0px 4px 17px -5px rgba(179,179,179,0.48);
    box-shadow: 0px 4px 17px -5px rgba(179,179,179,0.48);
    transform: translateY(-62px);
    transition: all cubic-bezier(0,1.08,.59,.99) 500ms;
}

.open{
    height: 60px;
}

.mobile-homepage{
  color:#0097ff !important;
}

.mobile-menu-items{
  top: 10vh;
  bottom: 0;
  left: 0;
  height: 90vh;
  width: 100vw;
  position: fixed;
  z-index: 9990;
  /* margin-top: -10em; */
}

.mobile-menu-item:hover{
  color:#0068df !important;
}

.social-media-links{
  width: 100%;
  display: flex;
  justify-content: center;
}

.social-media-links > .social-media{
  line-height: 18vh;
}

.social-media-links > .social-media:last-of-type{
  margin-right: 0;
}

.mobile-menu-item{
  height: 18vh;
  line-height: 18vh;
  color: #0097ff;
  font-family: Nunito;
  font-size: 1.4em;
  font-weight: 700;
  cursor: pointer;
  text-align: center;
  letter-spacing: 1px;
  box-sizing: border-box;
  opacity: 0;
  transform: translateY(-10px);  
  transition: none;
}

.mobile-menu-category-list{
  line-height: 2.1em;
  height: 0vh;
  text-align: center !important;
  width: 100%;
  overflow: hidden;
  text-align: left;
  transition: all ease-in-out 10000ms;
  transition-delay: 0ms !important;
}

.mobile-category-list-container{
  transform: translateY(-350px);
  opacity: 0;
  overflow-y: auto;
  transition: all cubic-bezier(0,1.08,.59,.99) 300ms;
  transition-delay: 0ms !important;
}

.mobile-menu-popup-item{
  padding-left: 15px;
  padding-right: 15px;
  color: #d1d1d1;
  width: 100%;
  transition: all ease-in-out 80ms;
}


.open-categories > .mobile-menu-item::after{
  width: 100%;
  transition-delay: 300ms !important;
  transition: width ease-out 200ms;
}

.open-categories #start-here-button{
  height: 0vh !important;
  opacity: 0;
  transform: translateY(-10vh);
  overflow: hidden;
}

.open-categories .mobile-menu-category-list{
  height: 74vh;
  /* padding-top: 18px; */
  transition-delay: 500ms !important;
}

.open-categories > .mobile-menu-category-list::after{
  width: 0;
}

.open-categories .mobile-category-list-container{
  transform: translateY(18px);
  opacity: 1;
  transition-delay: 500ms !important;
}

.open-categories{
  /* margin-top: -10em; */
  transform: translateY();
}


.landed{
  opacity: 1;
  transform: translateY(0); 
  transition-property: transform,opacity;
  transition: cubic-bezier(0,1.08,.59,.99) 400ms;
}

.mobile-menu-item::after {
    content: "";
    display: block;
    margin: 0 auto;
    width: 10%;
    border-bottom: 2px solid #d1d1d157;
}

.social-media-links::after{
  display: none;
}


.small-menu-visible{
  transform: translateY(0);
  transition: 400ms all;
}

a:link{
  text-decoration: none;
  color: inherit;
}
a:visited{
  text-decoration: none;
  color: inherit;
}
a:hover{
  text-decoration: none;
  color: inherit;
}
a:active{
  text-decoration: none;
  color: inherit;
}

.small-menu-content{
  width: 100%;
  display: flex;
  justify-content: space-between;
  z-index: 9999;
}

.right-side-buttons{
  display: flex;
  justify-content: space-evenly;
  letter-spacing: 0.5px;
}

.right-side-buttons > a{
  margin-right: 30px;
}

.right-side-buttons .small-menu-item:last-child{
  margin-right: 0;
}


.left-side-buttons{
  display: flex;
  justify-content: space-evenly;
}

.hamburger{
  height: 22px;
  width: 22px;
  font-size: 1.5em;
  line-height: 60px;
  cursor: pointer;
  display: none;
  margin-top: auto;
  margin-bottom: auto;
  position: relative;
  box-sizing: border-box;
}

.hamburger > .bar{
  width: inherit;
  height: 0.13em;
  background-color: #d1d1d1;
  position: absolute;
  border-radius: 3px;
}

.hamburger > .bar1{ 
  top: 0px;
  transition: all cubic-bezier(.13,1.02,.18,.9) 200ms;
}

.hamburger > .bar2{
  top: 50%;
  opacity: 1;
  height: 0.135em;
  margin-top: -0.067em;

}

.hamburger > .bar3{
  bottom: 0;
  transition: all cubic-bezier(.13,1.02,.18,.9) 200ms;
}

.hamburger:hover > .bar{
  background-color: #0097ff;
  transform-origin: center;
}

.bar1-clicked{
transform: translateY(11px) translateY(-0.065em);
transition: all cubic-bezier(.13,1.02,.18,.9) 200ms;
}

.bar2-clicked{
opacity: 1;
}

.bar3-clicked{
transform: translateY(-11px) translateY(0.065em);
transition: all cubic-bezier(.13,1.02,.18,.9) 200ms;
}

.bar1-opened{
  transform-origin: center;
  transform: translateY(11px) translateY(-0.065em) rotate(45deg);
  transition: all cubic-bezier(.13,1.02,.18,.9) 200ms;
}

.bar2-opened{
  opacity: 0 !important;
}

.bar3-opened{
  transform-origin: center;
  transform: translateY(-11px) translateY(0.065em) rotate(-45deg);
  transition: all cubic-bezier(.13,1.02,.18,.9) 200ms;
}

.small-menu-item{
  height: 60px;
  line-height: 60px;
  color: #d1d1d1;
  font-family: Nunito;
  font-weight: 800;
  cursor: pointer;
  margin-right: 30px;
}

.small-menu-item:hover{
  color: #0097ff;
}

.small-menu-popup{
  min-width: 150px;
  background-color: white;
  position: fixed;
  z-index: 2000;
  margin-top: -5px;
  margin-left: -15px;
  border-radius: 8px;
  display: none;
  height: 0;
  transform: translateY(-20px);
  opacity: 0;
  -webkit-box-shadow: 0px 4px 17px -5px rgba(179,179,179,0.88);
  -moz-box-shadow: 0px 4px 17px -5px rgba(179,179,179,0.88);
  box-shadow: 0px 4px 17px -5px rgba(179,179,179,0.88);
}

  .search-icon{
    font-size: 0.9em; 
    transform: translateY(1px)
  }

.small-menu-popup-item{
  padding-left: 15px;
  padding-right: 15px;
  color: #d1d1d1;
  transition: all ease-in-out 80ms;
}

.small-menu-popup-item:hover{
    color: #0097ff;
}

@keyframes menu-popup{
  0%   { opacity: 0; display: none; transform: translateY(-20px);}
  1%   { opacity: 0; display: block; transform: translateY(-20px);}
  100%   { opacity: 1; display: block; transform: translateY(0px);}
}


#categories-menu-item:hover > .small-menu-popup{
  display: block;
  transform: translateY(0px);
  opacity: 1;
  height: auto;
  animation-name: menu-popup;
  animation-duration: 0.3s;
  animation-fill-mode: both;
}

#search-menu-button:hover > .small-menu-popup{
  display: block;
  transform: translateY(0px);
  opacity: 1;
  height: auto;
  animation-name: menu-popup;
  animation-duration: 0.3s;
  animation-fill-mode: both;
}

.homepage{
  font-size: 1.4em;
  color: #0097ff;
  font-weight: 700;
  letter-spacing: 0.9px;
}

.social-media{
  color: #d1d1d1;
  font-size: 1.4em;
  font-weight: 300;
}

.social-media:hover{
  color: #8d8d8d;
}

.facebook:hover{
  color: #3b5998;
}

.instagram:hover{
  color: black;
}

.google-plus:hover{
  color: #de5f54;
}

.twitter:hover{
  color: #00aced;
}

.search-inputs{
  padding: 15px;
  padding-bottom: 5px;
  color: #d1d1d1;
  transition: all ease-in-out 80ms;
}

#search-popup{
  margin-left: -114px;
}

.search-inputs input{
  border-radius: 5px;
  width: 200px;
  border: none;
  background-color: #fafafa;
  font-size: 1.2em;
  padding: 10px;
  outline: none;
  color: #0097ff;
}

.search-inputs input::-webkit-input-placeholder {
  color: #c5c5c5;
  font-family: Nunito;
  text-decoration: none;
}
.search-inputs input::-moz-placeholder {
  color: #c5c5c5;
  font-family: Nunito;
  text-decoration: none;
}
.search-inputs input:-ms-input-placeholder {
  color: #c5c5c5;
  font-family: Nunito;
  text-decoration: none;
}
.search-inputs input:-moz-placeholder {
  color: #c5c5c5;
  font-family: Nunito;
  text-decoration: none;
}



@media screen and (min-width: 1083px) {
  .mobile-menu-items{
    display: none !important;
  }
}

@media screen and (max-width: 1083px) {
  .right-side-buttons .hideable{
    display: none;
  }
  .right-side-buttons{
    display: inline-block !important;
    margin-right: 0;
    margin-left: auto;
  }

  .hamburger{
    display: inline;
  }
  .open{
    height: 100%;
  }
}
@media screen and (max-width: 770px) {
  .left-side-buttons > .social-media{
    display: none;
  }
  .hamburger{
    margin-right: 20px;
  }
  .homepage{
    margin-left: 20px;
  }
}

@media screen and (max-width: 460px) {
  .mobile-menu-category-list{
    width: 400px;
    text-align: left !important;
    margin-left: auto;
    margin-right: auto;
    padding-left: 20px;
  }
}
</style>
