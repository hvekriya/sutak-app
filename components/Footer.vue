<template>
    <footer class="w-full py-4 text-center text-sm text-gray-600 border-t mt-8">
      <p>
        © {{ new Date().getFullYear() }} Developed by 
        <a href="https://github.com/dhruvruda" target="_blank" rel="noopener" class="text-blue-600 hover:underline">Dhruv Ruda</a> &amp; 
        <a href="https://github.com/hvekriya" target="_blank" rel="noopener" class="text-blue-600 hover:underline">Haresh Vekriya</a>
      </p>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'Footer',
  }
  </script>
  
  <style scoped>
  /* Optional: you can style footer further here */
  </style>
  