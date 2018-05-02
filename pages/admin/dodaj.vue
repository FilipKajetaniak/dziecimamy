<template>
    <div class="admin-options">
        <router-link to="/admin/utworz">
          <div class="admin-option">
            <div class="option-name">Napisz nowy post</div>
          </div>
        </router-link>
        <router-link to="/admin/zapisane">
          <div class="admin-option">
            <div class="option-name">Dodaj zapisany post</div>
          </div>
        </router-link>
        <router-link to="/admin">
          <div class="admin-option blue-border">
            <div class="back-to-admin">Wróć</div>
          </div>
        </router-link>
        </div>
</template>

<script>
import IS_VALID from '@/apollo/queries/IS_VALID.graphql'
import { asyncify } from 'async';
export default {
  layout: 'admin',
  data () {
    return {
      
    }
  },
  asyncData(context){
    return context.app.provide.$apolloProvider.defaultClient.query({query: IS_VALID})
    .then(()=> {return})
    .catch(()=> {context.redirect('/admin/zaloguj')})
  }
}
</script>
<style>
</style>