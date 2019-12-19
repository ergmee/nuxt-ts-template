<template lang="pug">
  el-container
    el-main
      el-row(type='flex' justify='center')
        el-col(v-if="productCard != null" :span='4')
        el-col(v-if="productCard != null" :span='16')
          el-card(shadow="always") 
            el-row(type='flex' justify='center')
              el-col
                el-image(:src="productCard.avatar")
              el-col
                h1 {{productCard.name}}
                el-tag {{productCard.category}}
                hr
                div {{productCard.description}}
                hr
                el-row(type='flex' justify='center')
                  el-col
                    div protein
                    div fat
                    div carbohydrate
                    div kcal
                  el-col
                    div {{productCard.protein}}
                    div {{productCard.fat}}
                    div {{productCard.carbohydrate}}
                    div {{productCard.kcal}}
                    //- div {{productCard.metaData.autor}}
                    //- div {{new Date(productCard.metaData.timestamp).toLocaleDateString()}}
        el-col(v-if="productCard != null" :span='4')

</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { Route } from "vue-router";
interface WithRoute {
  $route: Route;
}
@Component({ components: {} })
export default class extends Vue implements WithRoute {
  productCard: null;
  constructor() {
    super();
  }
  mounted() {
    console.log("this.$route.query:", this.$route.query);
    this.displayCardbyName();
  }
  displayCardbyName() {
    if (this.$store.state.products) {
      let products = this.$store.state.products;
      // let product = this.$route.query.product
      for (var item in products) {
        if (item === this.$route.query.product) {
          this.productCard = products[item];
        }
      }
      console.log("this.productCard:", this.productCard);
      this.$forceUpdate();
    }
  }
}
</script>

<style>
</style>
