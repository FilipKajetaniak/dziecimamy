<template>
    <ul class="year-list">
        <li v-for="month in months" :key="month.month" @click="month.show = !month.show"><span class="month">{{month.month}}</span><span class="count">
            {{year.filter(post => post.postMonth == months.indexOf(month)+1).length}}
            </span>
            <archivemonthlist :show="month.show" :posts="year.filter(post => post.postMonth == months.indexOf(month)+1)" />
        </li>
    </ul>
</template>
<script>
import archivemonthlist from '@/components/archivemonthlist.vue'
export default {
  props: ['year', 'show'],
  data () {
    return {
        months: [{month:'Styczeń',show: false},{month:'Luty',show: false},
        {month:'Marzec',show: false}, {month:'Kwiecień',show: false},
        {month:'Maj',show: false},{month:'Czerwiec',show: false},
        {month:'Lipiec',show: false},{month:'Sierpień',show: false},
        {month:'Wrzesień',show: false},{month:'Październik',show: false},
        {month:'Listopad',show: false},{month:'Grudzień',show: false}]
    }
  },
  components: {
      archivemonthlist
  }
}
</script>
<style>
.year-list{
    list-style: none;
}

.year-list li{
    margin-top: 5px;
    margin-bottom: 5px;
}

.month{
    cursor: pointer;
}

.month:hover{
    color: rgb(85, 85, 85);
}

</style>