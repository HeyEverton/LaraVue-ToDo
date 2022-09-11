<template>
  <div class="home">
    <NavBar />
    <h1>home page</h1>
  </div>
</template>

<script>
// @ is an alias to /src

import NavBar from '@/components/Partials/TheHeader'

export default {
  name: 'HomeView',
  components: {

    NavBar
  }
}
</script>
