<template lang="pug">
  el-container
    el-main
      el-row(type='flex' justify='start')
        el-col(:span='8') ololo
          el-autocomplete.inline-input(v-model='productName' :fetch-suggestions='querySearch' placeholder='Продукт..' @select='handleSelect')
        div( v-for='product in addedProduct' v-bind:key="recept.key")
          div {{product}}


</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import Logo from '~/components/Logo.vue';

@Component({
  components: {
    Logo,
  },
})
export default class extends Vue {
  productName: string = ''
  addedProduct: Array<string> = []

  constructor() {
    super();
    this.getProducts()
    this.getRecepts()
  }

  async getProducts(){ await this.$store.dispatch('getProducts').then(() => {}).catch(() => {}) }
  async getRecepts() { await this.$store.dispatch('getRecepts').then(() => {}).catch(() => {}) }
  
  querySearch(queryString, callback) {
    var productArray = [];
    for(var item in this.$store.state.products){
      productArray.push({name: this.$store.state.products[item].name, value: this.$store.state.products[item].name, product: this.$store.state.products[item]})
    }
    var results = queryString ? productArray.filter(this.createFilter(queryString)) : productArray;
    callback(results);
  }
  createFilter(queryString) {
    return (link) => {
      return (link.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
    };
  }
  handleSelect(item) {
    console.log('autocomplete ', item);
  }

}
</script>
<style>
.foodcard{
  background: #f1f1f1;
  border-radius: 5px;
}




.grow { transition: all .2s ease-in-out; }
.grow:hover { transform: scale(1.1); }

.cart-empty{
  border-color: #5daf34 !important;
  background: #5daf34 !important;
  color: #fff  !important;
}
.cart-with-items{
  border-color: #5daf34 !important;
  background: #f0f9eb !important;
  color: #67C23A !important;
}
.margin-10{
  margin: 8px;
}
.product-card{
  max-width: 280px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
