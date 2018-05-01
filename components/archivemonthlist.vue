<template>
    <ul v-show="show" class="month-list">
        <li v-for="post in posts" :key="post.slug"><router-link v-bind:to="'/'+post.slug" class="post-link">{{post.title}}</router-link></li>
    </ul>
</template>
<script>
export default {
  props: ['posts', 'show'],
  data () {
    return {
    }
  }
}
</script>
<style>
.month-list{
  list-style: none;
}

.month-list li{
  margin-top: 15px;
  margin-bottom: 15px;
}

.post-link{
  cursor: pointer;
}

.post-link:hover{
  color: #0097ff;
}
</style>