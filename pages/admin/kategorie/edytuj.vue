<template>
   <div class="admin-options">
     <div class="option-name outside">Wszystkie kategorie:</div>
           <div class="saved-post" v-for="category in categories" V-bind:key="category.id">
        <div class="saved-post-title">{{category.name}}</div>
        <div class="additional-info">
          <router-link v-bind:to="'/admin/kategorie/'+category.slug">
             <button class="option-button">Edytuj</button>
          </router-link>
          <button class="option-button cancel" style="margin-left: 10px;" @click="deleteCategory(category.id)">Usuń</button>
        </div>
      </div>
        <router-link to="/admin/kategorie">
          <div class="admin-option blue-border">
            <div class="back-to-admin">Wróć</div>
          </div>
        </router-link>
        </div>
</template>
<script>
import DELETE_CATEGORY from '~/apollo/queries/DELETE_CATEGORY.graphql'
import CATEGORY_HOW_MANY_POSTS from '~/apollo/queries/CATEGORY_HOW_MANY_POSTS.graphql'
import { asyncify } from 'async'
export default {
  layout: 'admin',
  data () {
    return {
      
    }
  },
  computed:{
    categories(){
      return this.$store.state.allCategories
    }
  },
  methods:{
    deleteCategory(id){
      this.$apollo.query({
        query: CATEGORY_HOW_MANY_POSTS,
        variables: {
          id: id
        }
      })
      .then((res)=>{
        if(res.data.Category._postsMeta.count){
          alert(`Uwaga, do kategorii którą chcesz usunąć przypisane jest ${res.data.Category._postsMeta.count} postów! Zamiast usuwać tą kategorię możesz jej nadać inną nazwę i kolor!`)
        }else{
          this.$apollo.mutate({
            mutation: DELETE_CATEGORY,
            variables: {
              id: id
            }
          })
          .then(()=>{
            this.$store.commit('showOk', 'Pomyślnie usunięto post');
            window.location.reload(true);
          })
        }
      })
    }
  }
}
</script>