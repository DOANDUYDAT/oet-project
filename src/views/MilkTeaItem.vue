<template>
  <v-card>
    <v-card-text>
      <v-row class="milk-tea--item">
        <v-col >
          <h3 class="headline">MT-{{ product.id }}</h3>
          <h4 class="headline font-weight-bold">{{ product.name }}</h4>
          <v-sheet color="oet-blue-darken-1" class="my-3" :height="2"></v-sheet>
          <p class="font-weight-bold">Toppings:</p>
          <p class="font-weight-medium">{{ product.toppings }}</p>
          <p class="text-end title font-weight-black">${{ product.price }}</p>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/variables.scss';

.milk-tea--item {
  color: $oet-blue-darken-1;
}
</style>