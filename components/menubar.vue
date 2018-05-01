<template>
      <div class="menu-bar">
        <div class="container transparent" style="overflow: visible !important;">
          <div class="wrapper">
            <div class="menu-buttons">
              <router-link to="/zacznij-tutaj"><div class="menu-button">Zacznij tutaj</div></router-link>
              <div class="menu-button" id="categories-menu-button">Szufladki
                  <div class="small-menu-popup small-menu-absolute">
                    <div v-for="category in allCategories" :key="category.name" class="small-menu-popup-item" @click="$router.push(`/kategoria/${category.slug}`)">{{category.name}}</div>
                  </div>
                </div>
              <router-link to="/archiwum"><div class="menu-button">Stare dzieje</div></router-link>
              <router-link to="/o-mnie"><div class="menu-button">Z kim masz do czynienia</div></router-link>
          </div>
        </div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {

  },
  mounted(){
  },
  computed: {
    allCategories(){
      return this.$store.state.allCategories
    }
  }
}
</script>

<style>
.menu-bar{
  width: 100%;
  position: absolute;
  z-index: 10;
}

.small-menu-absolute{
  position: absolute !important;
}

#categories-menu-button:hover > .small-menu-popup{
  display: block;
  transform: translateY(0px);
  opacity: 1;
  height: auto;
  animation-name: menu-popup;
  animation-duration: 0.3s;
  animation-fill-mode: both;
}

.hamburger-button{
  height: 100px;
  line-height: 100px;
  font-size: 2em;
  color: #0097ff;
  cursor: pointer;
  margin-left: 30px;
  display: none;
  transition: cubic-bezier(.12,1,.76,.95) 200ms;
}

.hamburger-button:hover{
  color: #0097ff;
}

.menu-buttons{
  display: flex;
  justify-content: center;
  font-family: Nunito;
  height: 60px;
  line-height: 60px;
  margin-right: 0;
}

.mobile-menu{
  font-family: Nunito;
  line-height: 100px;
  margin-left: 30px;
  transition: cubic-bezier(.12,1,.76,.95) 200ms;
  opacity: 0;
  transform: translateY(-50px);
  height: 0px;
}

.visible{
  height: 400px;
  opacity: 1;
  margin-top: 0;
  transform: translateY(0px);
}

.hidden{
  display: none;
}


.small-menu{
  height: 78px;
  line-height: 80px;
}


.menu-button{
  margin-left: 40px;
  margin-right: 40px;
  color: rgb(111, 193, 255);
  font-weight: 700;
  cursor: pointer;
}
.menu-button:hover{
  color: #0097ff;
}

@media screen and (max-width: 1100px) {
    .menu-button{
      margin-left: 20px;
      margin-right: 20px;
    }
}

@media screen and (max-width: 770px) {
     .menu-buttons{
      display: none;
    }
    .hamburger-button{
      display: inline-block;
    }
    /* .mobile-menu{
      display: block;
    } */
}

@media screen and (min-width: 770px) {
    .mobile-menu{
      display: none;
    }
}
</style>
