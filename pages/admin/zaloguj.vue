<template>
<form class="login-form" @submit.prevent="login()">
    <input type="text" v-model="email" placeholder="login">
    <input type="password" v-model="password" placeholder="hasło">
    <button type="submit" class="option-button">Zaloguj</button><br>
    <span class="error" v-show="error">Coś poszło nie tak, spróbuj jeszcze raz!</span>
</form>
</template>
<script>
import LOGIN from '~/apollo/queries/LOGIN.graphql'
import { asyncify } from 'async';
import Cookie from 'js-cookie'

export default {
  layout: 'clear',
  data () {
    return {
      email: '',
      password: '',
      error: false
    }
  },
  methods: {
      login(){
        this.error = false;
          this.$apollo.mutate({
              mutation: LOGIN,
              variables: {
                  email: this.email,
                  password: this.password
              }
          })
          .then((res)=>{
              localStorage.setItem('token', res.data.signinUser.token);
              this.$store.commit('setToken', res.data.signinUser.token);
              Cookie.set('jwt', res.data.signinUser.token);
              this.$router.push('/admin')
          })
          .catch(()=>{
            this.error = true;
          })
      }
  }
}
</script>
<style>
.login-form{
    width: 400px;
    margin: 50px auto;
}

.login-form input{
    width: 100%;
    margin: 10px 0;
    font-size: 1.2em;
}

.login-form button{
    margin: 15px 0;
}

.option-button{
    background-color: rgb(104, 182, 255);
    border: rgb(84, 164, 238) 1px solid;
    border-radius: 4px;
    color: white;
    height: auto;
    width: auto;
    cursor: pointer;
    font-family: Nunito;
    font-size: 1em;
    line-height: 1em;
    padding: 5px 10px;
    opacity: 1;
    outline: none;
}

.option-button:hover{
    opacity: 0.8;
}

.cancel{
    background-color: rgb(255, 104, 104);
    border: rgb(238, 84, 84) 1px solid;
}

.input{
    width: 100%;
    resize: none;
    margin-bottom: 10px;
    border: rgb(197, 197, 197) 1px solid;
    transition: all 50ms ease-in-out;
}

.input:focus{
    outline: none;
    border: rgb(84, 164, 238) 1px solid;
    -webkit-box-shadow: 0px 0px 2px 1px rgba(85,164,238,0.44);
    -moz-box-shadow: 0px 0px 2px 1px rgba(85,164,238,0.44);
    box-shadow: 0px 0px 2px 1px rgba(85,164,238,0.44);
}

.error{
    color: rgb(238, 84, 84);
    font-family: Nunito;
}

</style>