<template>
   <div class="admin-options">
       <div class="option-name outside">Zmień treść "Zacznij tutaj"</div>
       <textarea class="input content-editor" v-model="startHere"></textarea>
       <button class="option-button green-button" style="margin-bottom: 50px;" @click="updateStartHere()">Zmień</button>
       <button class="option-button cancel" style="margin-left: 10px;">Anuluj</button>
        <router-link to="/admin/kontent">
          <div class="admin-option blue-border">
            <div class="back-to-admin">Wróć</div>
          </div>
        </router-link>
        </div>
</template>
<script>
import START_HERE from '~/apollo/queries/START_HERE.graphql'
import IS_VALID from '@/apollo/queries/IS_VALID.graphql'
import UPDATE_START_HERE from '~/apollo/queries/UPDATE_START_HERE.graphql'
import { asyncify } from 'async'
export default {
  layout: 'admin',
  data () {
    return {
        startHere: ''
    }
  },
  methods: {
      updateStartHere(){
          let startHere = this.startHere;
          this.$apollo.mutate({
              mutation: UPDATE_START_HERE,
              variables: {
                  startHere: startHere
              }
          })
          .then(()=>{
              this.$store.commit('showOk', 'Pomyślnie zmieniono "Zacznij tutaj"!');
              this.$router.push('/admin/kontent');
              window.location.reload(true);
          })
          .catch(()=>{
              this.$store.commit('showError')
          })
      }
  },
  asyncData(context) {
    const starthere = context.app.provide.$apolloProvider.defaultClient.query({query: START_HERE});
    const valid = context.app.provide.$apolloProvider.defaultClient.query({query: IS_VALID});
    return Promise.all([valid, starthere])
    .then((res) => {
     return {startHere: res[1].data.PageContent.startHere}
    })
    .catch(()=> {context.redirect('/admin/zaloguj')})
  }
}
</script>
<style>
</style>