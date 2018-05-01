<template>
   <div class="admin-options">
       <div class="option-name outside">Zmień opis</div>
       <textarea class="input content-editor" v-model="pageDescription"></textarea>
       <button class="option-button green-button" style="margin-bottom: 50px;" @click="updateDescription()">Zmień</button>
       <button class="option-button cancel" style="margin-left: 10px;">Anuluj</button>
        <router-link to="/admin/kontent">
          <div class="admin-option blue-border">
            <div class="back-to-admin">Wróć</div>
          </div>
        </router-link>
        </div>
</template>
<script>
import PAGE_DESCRIPTION from '~/apollo/queries/PAGE_DESCRIPTION.graphql'
import UPDATE_PAGE_DESCRIPTION from '~/apollo/queries/UPDATE_PAGE_DESCRIPTION.graphql'
import { asyncify } from 'async'
export default {
  layout: 'admin',
  data () {
    return {
        pageDescription: ''
    }
  },
  methods: {
      updateDescription(){
          let description = this.pageDescription;
          this.$apollo.mutate({
              mutation: UPDATE_PAGE_DESCRIPTION,
              variables: {
                  description: description
              }
          })
          .then(()=>{
              this.$store.commit('showOk', 'Pomyślnie zmieniono opis!');
              this.$router.push('/admin/kontent');
              window.location.reload(true);
          })
          .catch(()=>{
              this.$store.commit('showError')
          })
      }
  },
  asyncData(context) {
    return context.app.provide.$apolloProvider.defaultClient.query({query: PAGE_DESCRIPTION})
    .then((res) => {
     return {pageDescription: res.data.PageContent.pageDescription}
    })
  }
}
</script>
<style>
</style>