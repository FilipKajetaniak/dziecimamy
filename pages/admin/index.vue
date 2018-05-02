<template>
    <div>      
        <div class="admin-options">
          <router-link to="/admin/ustawienia">
            <div class="admin-option">
              <div class="option-name">Ustawienia Bloga</div>
              <div class="option-description">Opis, kategorie, o mnie, zacznij tutaj</div>
            </div>
          </router-link>
          <router-link to="/admin/dodaj">
            <div class="admin-option">
              <div class="option-name">Dodaj Post</div>
              <div class="option-description">Utwórz nowy post lub dodaj z zapisanych</div>
            </div>
          </router-link>
          <router-link to="/admin/edytuj">
            <div class="admin-option">
              <div class="option-name">Edytuj posty</div>
              <div class="option-description">Edytuj lub usuń posty</div>
            </div>
          </router-link>
          <div class="admin-option red-border">
            <div class="log-out" @click="logout">Wyloguj i wróć do strony głównej</div>
          </div>
        </div>
    </div>
</template>

<script>
import IS_VALID from '@/apollo/queries/IS_VALID.graphql'
import { asyncify } from 'async';
export default {
  layout: 'admin',
  methods: {
    logout(){
      this.$store.dispatch('logout');
      this.$router.push('/');
    }
  },
  asyncData(context){
    return context.app.provide.$apolloProvider.defaultClient.query({query: IS_VALID})
    .catch(() => {context.redirect('/admin/zaloguj')})
  }
}
</script>
<style>
</style>