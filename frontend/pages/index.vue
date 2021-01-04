<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
    </v-col>
  </v-row>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  layout:"default",
  middleware:"authenticated",
  components: {
    Logo,
    VuetifyLogo
  }
}
</script>
