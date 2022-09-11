<template>
  <div class="container">
    <NavBar/>
    <h1 class="mt-5">home page</h1>
    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed saepe cum sint aperiam tempore assumenda distinctio laudantium ipsum amet cupiditate. Repellat quibusdam, qui id tempora accusantium voluptatem porro autem ea!</p>
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
