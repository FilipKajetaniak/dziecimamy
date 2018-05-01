<template>
<div>
  <posteditor v-on:deletePost="deleteThisPost()" v-bind:newpostprop="newpostprop" v-bind:editMode="false"/>
</div>
</template>
<script>
import posteditor from '@/components/posteditor.vue'
import GET_POST_TO_EDIT from '~/apollo/queries/GET_POST_TO_EDIT.graphql'
import DELETE_SAVED_POST from '~/apollo/queries/DELETE_SAVED_POST.graphql'
import { asyncify } from 'async'

export default {
  layout: 'admin',
  data () {
    return {
      newpostprop: {
        title: '',
        articleHtml: '',
        category: '',
        thumbnail: '',
        snippet: '',
        postDay: 0,
        postMonth: 0,
        postYear: 0,
      }
    }
  },
  components: {
    posteditor
  },
  methods: {
    deleteThisPost(){
      this.$apollo.mutate({
        mutation: DELETE_SAVED_POST,
        variables: {
          id: this.$route.params.id
        }
      }).then(
          this.$router.push('/admin')
      )
    }
  },
  asyncData(context) {
    let postId = context.params.id;
    return context.app.provide.$apolloProvider.defaultClient.query({
      query: GET_POST_TO_EDIT,
      variables: {
            id: postId
    }
    })
    .then((res) => {
      return { 
      newpostprop: {
          title: res.data.Savedpost.title,
          articleHtml: res.data.Savedpost.articleHtml,
          category: {
            name: res.data.Savedpost.category
          },
          thumbnail: res.data.Savedpost.thumbnail,
          snippet: res.data.Savedpost.snippet,
          postDay: 0,
          postMonth: 0,
          postYear: 0
        }
       }
    })
  }
}
</script>