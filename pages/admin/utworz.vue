<template>
    <div>
        <posteditor v-bind:newpostprop="newpostprop" v-bind:editMode="false"/>
    </div>
</template>
<script>
import posteditor from '@/components/posteditor.vue'
import IS_VALID from '@/apollo/queries/IS_VALID.graphql'
import { asyncify } from 'async';

export default{
    layout: 'admin',
    components: {
        posteditor
    },
    data (){
        return{
            newpostprop: {
                title: '',
                articleHtml: '',
                category: '',
                date: '',
                id: 0,
                thumbnail: '',
                postDay: 0,
                postMonth: 0,
                postYear: 0,
                snippet: ''
            }
        }
    },
  asyncData(context){
    return context.app.provide.$apolloProvider.defaultClient.query({query: IS_VALID})
    .then(()=> {return})
    .catch(()=> {context.redirect('/admin/zaloguj')})
  }
}
</script>