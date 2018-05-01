<template>
<div>
    <nav id="options-bar">
        <div class="buttons-left">
            <router-link to="/admin"><button class="option-button nav-button" style=" margin-left: 10px;">Panel administracyjny</button></router-link>
            <router-link to="/admin/dodaj"><button class="option-button nav-button" style=" margin-left: 10px;">Dodaj post</button></router-link>
            <router-link to="/admin/edytuj"><button class="option-button nav-button" style=" margin-left: 10px;">Edytuj posty</button></router-link>
        </div>
        <div class="buttons-right">
            <button class="option-button cancel" style=" margin-right: 10px;" @click="logout">Wyloguj</button>
        </div>
    </nav>
<transition name="slide">
    <div class="status-alerts ok" v-show="ok"><font-awesome-icon style="margin-right: 10px;" :icon="['fas', 'check']"/>{{message}}</div>
</transition>
<transition name="slide">
    <div class="status-alerts wrong" v-show="error"><font-awesome-icon style="margin-right: 10px;" :icon="['fas', 'times']"/>Oops coś poszło nie tak!</div>
</transition>
</div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  methods: {
      logout(){
          this.$store.dispatch('logout');
          window.location.reload(true);
      }
  },
  computed: {
      error(){
          return this.$store.state.error
      },
      ok(){
          return this.$store.state.ok
      },
      message(){
          return this.$store.state.message
      }
  }
}
</script>
<style>
.slide-enter-active, .slide-leave-active {
  transition: all .2s;
}
.slide-enter, .slide-leave-to{
  transform: translateY(-60px);
}

#options-bar{
    height: 50px;
    line-height: 50px;
    width: 100%;
    position: fixed;
    background-color: rgb(104, 182, 255);
    z-index: 900;
    display: flex;
    justify-content: space-between;
}

.nav-button{
    border: none !important;
}
.status-alerts{
    position: fixed;
    z-index: 99999;
    width: 600px;
    left: 50%;
    margin-left: -300px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    color: white;
    font-size: 1.3em;
}

.ok{
    background-color: springgreen;
}

.wrong{
    background-color: rgb(238, 84, 84);
}
</style>