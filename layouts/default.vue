<template>
    <div class="min-h-screen flex flex-col">
      <Nuxt />
      <Footer />
    </div>
  </template>
  
  <script>
  import Footer from '~/components/Footer.vue'
  
  export default {
    components: { Footer }
  }
  </script>
  