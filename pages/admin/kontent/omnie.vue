<template>
   <div class="admin-options">
       <div class="option-name outside">Zmień treść "o mnie"</div>
       <textarea class="input content-editor" v-model="aboutMe"></textarea>
       <button class="option-button green-button" style="margin-bottom: 50px;" @click="updateAboutMe()">Zmień</button>
       <button class="option-button cancel" style="margin-left: 10px;">Anuluj</button>
        <router-link to="/admin/kontent">
          <div class="admin-option blue-border">
            <div class="back-to-admin">Wróć</div>
          </div>
        </router-link>
        </div>
</template>
<script>
import ABOUT_ME from '~/apollo/queries/ABOUT_ME.graphql'
import UPDATE_ABOUT_ME from '~/apollo/queries/UPDATE_ABOUT_ME.graphql'
import IS_VALID from '@/apollo/queries/IS_VALID.graphql'
import { asyncify } from 'async'
export default {
  layout: 'admin',
  data () {
    return {
        aboutMe: ''
    }
  },
  methods: {
      updateAboutMe(){
          let aboutMe = this.aboutMe;
          this.$apollo.mutate({
              mutation: UPDATE_ABOUT_ME,
              variables: {
                  aboutMe: aboutMe
              }
          })
          .then(()=>{
              this.$store.commit('showOk', 'Pomyślnie zmieniono "o mnie"!');
              this.$router.push('/admin/kontent');
              window.location.reload(true);
          })
          .catch(()=>{
              this.$store.commit('showError')
          })
      }
  },
  asyncData(context) {
    const about = context.app.provide.$apolloProvider.defaultClient.query({query: ABOUT_ME});
    const valid = context.app.provide.$apolloProvider.defaultClient.query({query: IS_VALID});
    return Promise.all([valid, about])
    .then((res) => {
     return {aboutMe: res[1].data.PageContent.aboutMe}
    })
    .catch(()=> {context.redirect('/admin/zaloguj')})
  }
}
</script>
<style>
</style>