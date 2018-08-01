<template>
  <div>
    <v-app>
      <router-view/>
    </v-app>
  </div>
</template>
<script>
import headermenu from './components/headermenu/headermenu.vue'
export default {
  components: {
    headermenu
  }
}
</script>
