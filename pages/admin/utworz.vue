<template>
    <div>
        <posteditor v-bind:newpostprop="newpostprop" v-bind:editMode="false"/>
    </div>
</template>
<script>
import posteditor from '@/components/posteditor.vue'

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
    }
}
</script>