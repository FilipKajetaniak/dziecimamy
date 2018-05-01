<template>
  <div>
    <nuxt />
    <blogfooter />
  </div>
</template>

<script>
import blogfooter from '@/components/blogfooter.vue'

export default {
  data () {
    return {
      allCategories: []
    }
  },
  components: {
    blogfooter
  },
  watch: {
    '$route' (to, from){
      this.$store.commit('clearSearchPhrase')
    }
}
}
</script>
