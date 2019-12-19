<template lang="pug">
  el-container
    el-main

      el-row(type='flex' justify='start')
        el-col(:span='24')
          el-autocomplete.inline-input(v-model='curProductName', style='margin: 5px;' :change="autoChange" :fetch-suggestions='querySearch', placeholder='Продукт..', :trigger-on-focus='false', @select='handleSelect')
          el-select(v-model='curProductCategory', style='margin: 5px;', placeholder='Категория..')
            el-option(v-for='item in productCategories', :key='item', :label='item', :value='item')
          el-button(@click="createProduct()" :disabled='productIsExist() || curProductName.length === 0 || curProductCategory.length === 0') Create

        el-col
          el-tooltip.item(effect='dark', content='New Product', placement='top')
            el-button.grow(icon="fas fa-2x fa-layer-plus" circle)
          el-tooltip.item(effect='dark', content='New Th', placement='top')
            el-button.grow(icon="fas fa-2x fa-th" circle)
          //- el-tooltip.item(effect='dark', content='New Recept', placement='top')
          //-   el-button.grow(icon="fas fa-2x fa-file-plus" circle)
          //-   el-button.grow(icon="fas fa-2x fa-th-large" circle)
          //-   el-button.grow(icon="fas fa-2x fa-th-list" circle)
          //-   el-button.grow(icon="fas fa-2x fa-plus-square" circle)
          //-   el-button.grow(icon="fas fa-2x fa-sign-in" circle)
          //-   el-button.grow(icon="fas fa-2x fa-gas-pump" circle)
          //-   el-button.grow(icon="fas fa-2x fa-store" circle)
          //-   el-button.grow(icon="fas fa-2x fa-ghost" circle)
          //-   el-button.grow(icon="fas fa-2x fa-blender" circle)
          //-   el-button.grow(icon="fas fa-2x fa-mortar-pestle" circle)
          //-   el-button.grow(icon="fas fa-2x fa-cauldron" circle)
          //-   el-button.grow(icon="fas fa-2x fa-book" circle)
          //-   el-button.grow(icon="fas fa-2x fa-utensils-alt" circle)
          //-   el-button.grow(icon="fas fa-2x fa-scroll" circle)
          //-   el-button.grow(icon="far fa-2x fa-scroll-old" circle)
          //-   el-button.grow(icon="fas fa-2x fa-clipboard-check" circle)
          //-   el-button.grow(icon="fas fa-2x fa-tv-retro" circle)
          //-   el-button.grow(icon="fas fa-2x fa-door-open" circle)

      el-row(type='flex' justify='start')
        el-col(:span='10')
          el-pagination(background='' layout='prev, pager, next' :total='20')
      //- el-row(:gutter='12' justify='center')
      //-   el-breadcrumb(separator-class='el-icon-arrow-right')
      //-     el-breadcrumb-item(:to="{ path: '/' }") products
      //-     el-breadcrumb-item categories
      //-     el-breadcrumb-item mushrooms

      el-row(:gutter='12' justify='center')
        el-table(:data='foodCardsArray',  @row-click="rowClicked", style='width: 100%;' :row-class-name='tableRowClassName')
          el-table-column(label='date', min-width='15%')
            template(slot-scope='scope')
              i.far.fa-clock  {{new Date(scope.row.metaData.timestamp).toLocaleDateString()}}

          el-table-column(prop='avatar', label='avatar', min-width='10%')
            template(slot-scope='scope')
              img(:src='scope.row.avatar', min-width='70', height='70')
          el-table-column(sortable prop='name' label='name', min-width='20%')
            template(slot-scope='scope')
              div
                NuxtLink(v-bind:to="'/productview?product=' + encodeURIComponent(scope.row.name)") {{scope.row.name}}
              el-tag.tag-category(style='margin: 5px;') {{scope.row.category}}
          el-table-column(sortable prop='protein', label='Б', min-width='5%')
          el-table-column(sortable prop='fat', label='Ж', min-width='5%')
          el-table-column(sortable prop='carbohydrate', label='У', min-width='5%')
          el-table-column(sortable prop='kcal', label='ккал', min-width='10%')
          el-table-column(label='remove', min-width='10%')
            template(slot-scope='scope')
              el-button.grow(type="danger" style='margin: 5px;' icon="far fa-trash-alt" circle @click="deleteProduct(scope.row)")

</template>
<script lang="ts">
import { Component, Vue} from 'nuxt-property-decorator';
import Logo from '~/components/Logo.vue';

@Component({
  components: {
    Logo,
  },
})

export default class extends Vue {
  foodFilter: string = '';
  foodCardsArray: any = [];
  productCategories: any = ['Масла и жиры', 'Овощи и зелень',  'Сырье и приправы', 'Грибы',  'Мясо',  'Рыба',  'говно', ];

  curProductName = '';
  curProductCategory = '';
  curProductAvatar = 'http://www.calorizator.ru/sites/default/files/imagecache/product_512/product/asp.jpg';
  selectedProduct = null;

  constructor() {
    super();
    this.updateProducts()
  }
  data(){
    return {
      category:"",
      avatar:"",
      name:"",
      protein:"",
      fat:"",
      carbohydrate:"",
      kcal:"",
      metaData: {autor: '', timestamp: ''}
    }
  }
  mounted() {
    console.log("mounted", Date.now())
  }
  rowClicked(rowObject){
    if(rowObject.name === this.curProductName){
      this.selectedProduct = null
      this.curProductName = ''
      this.curProductCategory = ''
    }
    else{
      this.selectedProduct = rowObject;
      this.curProductName = rowObject.name;
      this.curProductCategory = rowObject.category;
    }
  }
  autoChange(ololo){
    console.log("autoChange:", this.curProductName)
  }
  querySearch(queryString, callback) {
    console.log("querySearch:")
    var links = [];
    let productnames = Object.keys(this.$store.state.products)
    for(var i = 0; i < productnames.length; ++i){
      links.push({name: productnames[i], value: productnames[i]})
    }
    var results = queryString ? links.filter(this.createFilter(queryString)) : links;

    this.updateProducts()

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

  async deleteProduct(product){
    await this.$store.dispatch("removeProduct", product).then(() => {
      this.updateProducts()
    });
  }
  productIsExist(){
    if(this.$store.state.products){
      let r = this.curProductName in this.$store.state.products
      return r
    }
    return false
  }
  async createProduct(){
    if(this.productIsExist() || this.curProductName.length === 0 || this.curProductCategory.length === 0)
      return
    await this.$store.dispatch("createProduct", {
      name: this.curProductName, 
      avatar: this.curProductAvatar,
      category: this.curProductCategory,
      description :'описание продукта',
      protein: '99',
      fat: '99',
      carbohydrate: '99',
      kcal: '99',
      metaData: {autor: 'this.$store.state.AuthUser', timestamp: (Date.now() ) }
      }).then(() => {
        this.selectedProduct = null
        this.curProductName = ''
        this.curProductCategory = ''
        this.updateProducts()
    });
  }
  async updateProducts(){
    this.foodCardsArray = []
    try {
      await this.$store.dispatch('getProducts')
      .then(() => {
        
        for(var product in this.$store.state.products){
          if(this.curProductName.length === 0 || this.$store.state.products[product].name.toLowerCase().indexOf(this.curProductName.toLowerCase()) === 0 )
            this.foodCardsArray.push(this.$store.state.products[product])
        }

      })
      .catch(() => {})
    } catch (error) {
      throw error
    }
  }
  tableRowClassName({row, rowIndex}) {
    if(row.name === this.curProductName)
      return 'active';
    return '';
  }

}
</script>

<style>
.tag-category{
  cursor: pointer;
}
.tag-category:hover {
  background-color: #212e3e;
  color: #ffffff;
  border-color: #212e3e;
}

/* имена продуктов */
a:link {
    font-weight: bold;
    color: #00612c;
    cursor: pointer;
}
a:visited {
    font-weight: bold;
    color: #ff1f1f;
    cursor: pointer;
}
a:hover, a:active {
   color: #00c056
}


.el-table--enable-row-hover .el-table__body tr:hover>td{
background-color: #acc1da !important;
}

.active {
  background-color: #212e3e !important;
  color: rgb(233, 233, 233) !important;
}

.foodcard{
  background: #f1f1f1;
  border-radius: 5px;
}


.grow { transition: all .2s ease-in-out; }
.grow:hover { transform: scale(1.1); }

/* .cart-empty{
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
*/
</style>



