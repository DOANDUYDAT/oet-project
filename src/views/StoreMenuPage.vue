<template>
  <v-container>
    <v-row justify="space-around" align="center" class="py-8 px-3">
      <v-icon @click.stop="changeDrawer" v-if="!drawerStatus">mdi-menu</v-icon>
      <h2
        class="text-center display-1 flex-grow-1 font-weight-medium milk-tea--text"
      >{{ store.name }} Menu</h2>
    </v-row>
    <v-row align="center">
      <v-col cols="3">
        <v-btn color="oet-blue-darken-1" class="white--text px-8" @click="filterProducts">Filter</v-btn>
      </v-col>
      <div class="flex-grow-1"></div>
      <v-col cols="3" class="text-end">
        <h3 class="milk-tea--text">Sort By</h3>
      </v-col>
      <v-col cols="4" sm="3" lg="2">
        <v-select v-model="sort" dense color="oet-blue-darken-1" :items="sortItems" outlined hide-details></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title class="milk-tea--text font-weight-bold">Toppings:</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="6" md="3" v-for="item in filterItems" :key="item.value">
                <v-checkbox
                  color="oet-blue-darken-1"
                  v-model="filters"
                  :value="item.value"
                  hide-details
                >
                  <template v-slot:label>
                    <div class="font-weight-bold milk-tea--text">{{ item.text }}</div>
                  </template>
                </v-checkbox>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-if="listProducts.length > 0" class="pt-10">
      <v-col v-for="product in productsSorted" :key="product.id" cols="12" sm="6" md="4" lg="3">
        <milk-tea-item :product="product"></milk-tea-item>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MilkTeaItem from "./MilkTeaItem";
import { milkTeaServices } from "@/_api";
import { mapState } from "vuex";

export default {
  data() {
    return {
      store: {},
      listProductsId: [],
      listProducts: [],
      sort: "name-asc",
      sortItems: [
        {
          value: "name-asc",
          text: "Name (Asc)"
        },
        {
          value: "name-dsc",
          text: "Name (Dsc)"
        },
        {
          value: "price-asc",
          text: "Price (Asc)"
        },
        {
          value: "price-dsc",
          text: "Price (Dsc)"
        }
      ],
      productsFiltered: [],
      filters: [],
      filterItems: [
        {
          value: "Milk Foam",
          text: "Milk Foam"
        },
        {
          value: "White Pearl",
          text: "White Pearl"
        },
        {
          value: "Pearl",
          text: "Pearl"
        },
        {
          value: "Aloe",
          text: "Aloe"
        }
      ]
    };
  },
  components: {
    MilkTeaItem
  },
  computed: {
    ...mapState("navigator", ["drawerStatus"]),
    productsSorted() {
      let productsSorted = [];
      switch (this.sort) {
        case "name-asc":
          this.sortProductsByNameAsc();
          break;
        case "name-dsc":
          this.sortProductsByNameDsc();
          break;
        case "price-asc":
          this.sortProductsByPriceAsc();
          break;
        case "price-dsc":
          this.sortProductsByPriceDsc();
          break;
        default:
          break;
      }
      productsSorted = [...this.productsFiltered];
      return productsSorted;
    }
  },
  methods: {
    async getStore(storeId) {
      this.store = await milkTeaServices.getStore(storeId);
    },
    async getListProductsId(storeId) {
      this.listProductsId = await milkTeaServices.getListProductsId(storeId);
    },
    async getListProducts() {
      this.listProducts = [];
      await this.getListProductsId(this.store.id);
      const listProductsId = this.listProductsId;
      for (let i = 0; i < listProductsId.length; i++) {
        const product = await milkTeaServices.getProduct(listProductsId[i]);
        this.listProducts.push(product);
      }
    },
    async getData() {
      const storeId = this.$route.params.storeId;
      await this.getStore(storeId);
      await this.getListProducts();
      this.productsFiltered = this.listProducts;
    },
    changeDrawer() {
      this.$store.dispatch("navigator/changeDrawer", { value: true });
    },
    sortProductsByNameAsc() {
      this.productsFiltered.sort(function(a, b) {
        var x = a.name.toLowerCase();
        var y = b.name.toLowerCase();
        if (x < y) {
          return -1;
        }
        if (x > y) {
          return 1;
        }
        return 0;
      });
    },
    sortProductsByNameDsc() {
      this.sortProductsByNameAsc();
      this.productsFiltered.reverse();
    },
    sortProductsByPriceAsc() {
      this.productsFiltered.sort(function(a, b) {
        var x = a.price;
        var y = b.price;
        if (x < y) {
          return -1;
        }
        if (x > y) {
          return 1;
        }
        return 0;
      });
    },
    sortProductsByPriceDsc() {
      this.sortProductsByPriceAsc();
      this.productsFiltered.reverse();
    },
    filterProducts() {
      const filters = this.filters;
      this.productsFiltered = this.listProducts.filter(e => {
        let filterStatus = true;
        for (let i = 0; i < filters.length; i++) {
          const result = e.toppings.search(filters[i]);
          if (result < 0) {
            filterStatus = false;
            break;
          }
        }
        return filterStatus;
      });
      
    }
  },
  created() {
    this.getData();
  },
  watch: {
    $route: "getData"
  }
};
</script>

<style lang="scss" scoped>
@import "@/variables.scss";

.milk-tea--text {
  color: $oet-blue-darken-1;
}
</style>

