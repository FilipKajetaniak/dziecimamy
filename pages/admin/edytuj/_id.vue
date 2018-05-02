<template>
<div>
  <posteditor v-on:deletePost="deleteThisPost()" v-bind:newpostprop="newpostprop" v-bind:editMode="true"/>
</div>
</template>
<script>
import posteditor from '@/components/posteditor.vue'
import GET_EXISTING_POST_TO_EDIT from '~/apollo/queries/GET_EXISTING_POST_TO_EDIT.graphql'
import DELETE_SAVED_POST from '~/apollo/queries/DELETE_SAVED_POST.graphql'
import IS_VALID from '@/apollo/queries/IS_VALID.graphql'
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
    const post = context.app.provide.$apolloProvider.defaultClient.query({
      query: GET_EXISTING_POST_TO_EDIT,
      variables: {
            id: postId
    }
    })

  const valid = context.app.provide.$apolloProvider.defaultClient.query({query: IS_VALID});
    return Promise.all([valid, post])
    .then((res) => {
      return { 
        newpostprop: {
            title: res[1].data.Blogpost.title,
            articleHtml: res[1].data.Blogpost.articleHtml,
            category: res[1].data.Blogpost.category,
            thumbnail: res[1].data.Blogpost.thumbnail,
            snippet: res[1].data.Blogpost.snippet,
            postDay: res[1].data.Blogpost.postDay,
            postMonth: res[1].data.Blogpost.postMonth,
            postYear: res[1].data.Blogpost.postYear
          }
        }
    })
    .catch(()=> {context.redirect('/admin/zaloguj')})
  }
}
</script>