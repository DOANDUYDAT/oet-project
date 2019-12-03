<template>
  <v-navigation-drawer v-model="drawer" app color="oet-blue-darken-1" dark>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="text-center headline font-weight-bold">Milk Tea Store</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
    <v-list>
      <v-list-item v-for="store in listStores" :key="store.id" :to="'/stores/' + store.id" exact>
        <v-list-item-content>
          <v-list-item-title class="text-center">{{ store.name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { milkTeaServices } from "@/_api";
import { mapActions, mapState } from 'vuex';
export default {
  data() {
    return {
      listStores: []
    };
  },
  props: {
  },
  computed: {
   ...mapState('navigator', ['drawerStatus']),
   drawer: {
     get() {
       return this.drawerStatus;
     },
     set(value) {
       this.$store.dispatch('navigator/changeDrawer', { value: value });
     }
   }
  },
  methods: {
    async getListStores() {
      this.listStores = await milkTeaServices.getListStores();
    },
    
  },
  created() {
    this.getListStores();
  }
};
</script>