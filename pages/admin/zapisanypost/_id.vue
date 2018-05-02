<template>
<div>
  <posteditor v-on:deletePost="deleteThisPost()" v-bind:newpostprop="newpostprop" v-bind:editMode="false"/>
</div>
</template>
<script>
import posteditor from '@/components/posteditor.vue'
import IS_VALID from '@/apollo/queries/IS_VALID.graphql'
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
    const getPost =  context.app.provide.$apolloProvider.defaultClient.query({
      query: GET_POST_TO_EDIT,
      variables: {id: postId}
    });
    const valid = context.app.provide.$apolloProvider.defaultClient.query({query: IS_VALID});
    return Promise.all([valid, getPost])
    .then((res) => {
      return { 
      newpostprop: {
          title: res[1].data.Savedpost.title,
          articleHtml: res[1].data.Savedpost.articleHtml,
          category: {
            name: res[1].data.Savedpost.category
          },
          thumbnail: res[1].data.Savedpost.thumbnail,
          snippet: res[1].data.Savedpost.snippet,
          postDay: 0,
          postMonth: 0,
          postYear: 0
        }
       }
    })
    .catch(()=> {context.redirect('/admin/zaloguj')})
  }
}
</script>