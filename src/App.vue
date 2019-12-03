<template>
  <v-app>
    <the-navigator></the-navigator>
    <v-content class="oet-content">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import TheNavigator from "./components/TheNavigator";

export default {
  data() {
    return {
      drawer: true
    };
  },
  computed: {
    checkHomePage() {}
  },
  components: {
    TheNavigator
  }
};
</script>
<style lang="scss" scoped>
@import "@/variables.scss";

.oet-content {
  background-color: $oet-grey-lighten-1;
}
</style>