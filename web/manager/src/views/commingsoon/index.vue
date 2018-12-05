<template>
  <div class="commingsoon">
    <img :src="require('./commingsoon.png')"/>
  </div>
</template>
<script>
  export default {
    name: 'commingsoon'
  }
</script>

<style scoped>
  .commingsoon{
    margin:50px 20px;
    text-align:center;
  }

  .commingsoon img{
    max-width:300px;
  }
</style>
