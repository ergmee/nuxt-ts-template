<template lang="pug">
  el-container
    el-main
      /// Icon Menu ///
      el-row(type='flex' justify='start')
        el-col
          el-tooltip.item(effect='dark', content='New Recept', placement='top')
            el-button.grow(v-on:click="createNewRecept()" icon="fas fa-2x fa-file-plus" circle)
            //- @click='createNewRecept()'
            //- no-ssr 
            //-   el-button(icon="fas fa-2x fa-file-plus" circle @click='dialogTableVisible = true')
            //-     el-dialog(:visible.sync='dialogTableVisible', width='70%')
            //-       el-form(:model='data', :rules='rules', ref='form')
            //-         el-form-item(label='type', prop='type')
            //-           el-input(v-model='ololo')
            //-         el-input(type='textarea', :rows='2', placeholder='Please input', v-model='textarea')
            //-       div
            //-         span.dialog-footer(slot='footer')
            //-           el-button(type='primary' @click='saveRecept()') Save
            //-           el-button(@click='saveRecept()') Cancel

          el-tooltip.item(effect='dark', content='edit Recept', placement='top')
            el-button.grow(icon="fas fa-2x fa-th-large" circle)
          el-tooltip.item(effect='dark', content='edit Recept', placement='top')
            el-button.grow(icon="fas fa-2x fa-th-list" circle)
          el-tooltip.item(effect='dark', content='edit Recept', placement='top')
            el-button.grow(icon="fas fa-2x fa-th" circle)
      /// Icon Menu ///
      el-row(type='flex' justify='start')
        el-tag(:key='tag', v-for='tag in dynamicTags', closable='', :disable-transitions='false', @close='handleClose(tag)')
          | {{tag}}
      //////////////////////////////////////////////////////////////////////////////
      el-row.recept-card(:gutter='0' justify='center')
        el-col(:span='24' v-for='recept in receptsArray' v-bind:key="recept.key")
          el-card(:body-style="{ padding: '10px' }" shadow="always")
            el-col(:span='8')
              el-image(:src="recept.avatar")
              div
                el-tooltip.item(effect='dark', content='View', placement='top')
                  NuxtLink(v-bind:to="'/receptview?recept=' + encodeURIComponent(recept.name)")
                    el-button.grow(icon="far fa-2x fa-eye" circle)
                el-tooltip.item(effect='dark', content='Edit', placement='top')
                  NuxtLink(v-bind:to="'/receptedit?recept=' + encodeURIComponent(recept.name)")
                    el-button.grow(icon="far fa-2x fa-edit" circle)
                el-tooltip.item(effect='dark', content='Remove', placement='top')
                  el-button.grow(icon="far fa-2x fa-trash-alt" circle  v-on:click="askRemoveRecept(recept)")

            el-col(:span='16')
              div
                NuxtLink(style="font-size:32px; font-weight:900" v-bind:to="'/receptview?recept=' + encodeURIComponent(recept.name)") {{recept.name}}

              div 
                i.far.fa-clock {{new Date(recept.metaData.timestamp).toLocaleDateString()}}
                i.far.fa-user {{recept.metaData.autor}}

              el-tag.tag-category(style='margin: 5px;' ) {{recept.category}}

              div {{recept.description}}



              Logo(:ings="recept.ingredientsList")
              //- ul.nutrition-list
              //-   li
              //-     p калории
              //-     p ккал
                  
              //- div {{recept.photo}}


              span.ingridients(@click='openIngridients(recept.name)') Ингридиенты {{recept.ingredientsList.length}}
                i.el-icon--right(v-bind:class="isProductIngsClosed(recept.name) ? 'el-icon-arrow-down' : 'el-icon-arrow-up' ") 

              div.ingridients(v-bind:class="{ 'show-ingridients': isProductIngsClosed(recept.name)}")
                ul.oglavl Ингридиенты
                  li(v-for='(amount, ingredient) in recept.ingredientsList' v-bind:key="ingredient.key")
                    el-tooltip(placement="top")
                      div(slot="content")
                        el-image(style="width:100px;" :src="$store.state.products[ingredient].avatar")
                        div {{$store.state.products[ingredient].name}}
                        div {{$store.state.products[ingredient].description}}
                      b.text {{ingredient}}
                    span.page {{recept.ingredientsList[ingredient].amount}}
                      span {{recept.ingredientsList[ingredient].measure}}

              div
                i.fa-2x.fa-bookmark(style="color: orange;" v-bind:class="{ 'far': inFavorites, 'fas': !inFavorites }"  v-on:click="addToFavorites()")
                span в избранное {{recept.favoritesAdd}}

              span(:span='12' v-for='tag in recept.tags' v-bind:key="recept.key") 
                el-tag.tag-category(style='margin: 5px;' @click='addTagFilter(tag)') {{tag}}
            el-col
        
        //- el-col(v-if="productCard != null" :span='12')
        //- el-col(v-else :span='12') ololo

</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import Logo from '~/components/Logo.vue';

@Component({
  components: {
    Logo,
  }
  
})
export default class extends Vue{
  showReceptIngridients = {};
  receptsArray: any = [];
  ingridientsArray: any = [];
  inFavorites: boolean = false;
  dynamicTags: Array<string> = [];

  constructor() {
    super();
    this.getProducts();
    this.updateRecepts();
  }

  createNewRecept(){
    // let tcs = this.$store.state.techCards
    // let cardNamePrefix = "Новая карта "
    // var newCardNumber = 0
    // for(var i = 1; i < 99999; ++i){
    //   if(!(cardNamePrefix + i in tcs) ){
    //     newCardNumber = i
    //     break
    //   }
    // }
    // let newCardName = cardNamePrefix + newCardNumber
    // this.$router.replace({ path: '/editTechCard?techCard=' + newCardName})
    // this.$router.replace({ path: '/receptedit?recept='})
    console.log("this:", this)
    return false
  }

  isProductIngsClosed(name){
    let r = name in this.showReceptIngridients
    return !r
  }
  
  openIngridients(name){
    if(name in this.showReceptIngridients){
      delete this.showReceptIngridients[name]
    }else{
      this.showReceptIngridients[name] = 1
    }
    this.$forceUpdate()
  }
  
  // calc(recept){
    // for(var ing in recept.ingredientsList){
      // let productForCalc = recept.ingredientsList[ing].ingName
      // console.log("количество", recept.ingredientsList[ing].amount)
      // console.log("recept.ingredientsList[ing]:", recept.ingredientsList[ing])
      // console.log("recept:", recept.name, productForCalc)
      // console.log("carbohydrate:", this.$store.state.products[productForCalc].carbohydrate)
      // console.log("fat:", this.$store.state.products[productForCalc].fat)
    // }
  // }
  askRemoveRecept(recept){
    console.log('askRemoveRecept!',recept);
  }
  async getProducts(){ await this.$store.dispatch('getProducts').then(() => {}).catch(() => {}) }

  addTagFilter(tag) {
    console.log("tag:", this.dynamicTags.includes(tag))

    if( !(this.dynamicTags.includes(tag)) ){
      this.dynamicTags.push(tag);
    }
  }
  handleClose(tag) {
    this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
  }
  addToFavorites() {
    this.inFavorites = !this.inFavorites;
    console.log("addToFavorites:");
  }
  onCommandDropdown() {
    console.log("onCommandDropdown:");
  }
  async updateRecepts() {
    // вот это надо считать калории из продуктов а из рецептов выпилять
    await this.$store
      .dispatch("getRecepts")
      .then(() => {
        for (var recept in this.$store.state.recepts) {
          this.receptsArray.push(this.$store.state.recepts[recept]);
        }
        // console.log("this.ingridientsArray:", this.ingridientsArray)
      })
      .catch(() => {});
  }
}
</script>

<style>
ul.oglavl {
    padding: 0;
    margin: 0;
    list-style-type: none; 
    }
ul.oglavl li {
    border-bottom: 2px dotted rgb(0, 0, 0); /* Необязателен. Здесь задается толщина, тип и цвет точек */
    position: relative;
    margin-bottom:5px; /* Необязателен. Задается для установки расстояния между блоками li */
    padding-bottom: 5px;
    }
    
ul.oglavl li span {
    /* background-color: #FFF; Это необходимо, чтобы перекрыть точки фоном */
    margin: 0;
    padding-bottom: 5px;
    }

ul.oglavl li span.text, ul.oglavl li span.page {
    bottom: -5px; /* Смещаем значимые блоки, чтобы они перекрыли точки */
    }

ul.oglavl span.text {
    position :relative;
    margin-right:7em; /* Задается чтобы текст не заходил на номера страниц */
    padding-right:20px; /* Необязателен. Задается чтобы точки не подходили вплотную к концу текста */
    
    }
    
ul.oglavl span.page {
  position: absolute;
  right: 0;
  padding-left:20px; /* Необязателен. Задается чтобы точки не подходили вплотную к номерам страниц */
  }

.ingridients{
  display: block;
  background: #bfffa2;
  border: #5daf34 solid 1px;
  border-radius: 5px;
  cursor: pointer;
  margin: 15px; 
  padding: 15px;
}

.show-ingridients{
  display: none;
}
/* .nutrition-list ul {
  background: #5daf34;
  border: #5daf34 solid;
  border-radius: 5px;
} */
.nutrition-list p {
  padding: 0px;
  margin: 0px;
}
.nutrition-list li {
  background: #bfffa2;
  display: inline-block;
  text-align: center;
  padding: 5px;
  margin: 5px;
  border: #5daf34 solid 1px;
  border-radius: 5px;
}

.recept-card {
  background: #f1f1f1;
  border-radius: 5px;
}

.grow {
  transition: all 0.2s ease-in-out;
}
.grow:hover {
  transform: scale(1.1);
}

.cart-empty {
  border-color: #5daf34 !important;
  background: #5daf34 !important;
  color: #fff !important;
}
.cart-with-items {
  border-color: #5daf34 !important;
  background: #f0f9eb !important;
  color: #67c23a !important;
}
.margin-10 {
  margin: 8px;
}
.product-card {
  max-width: 280px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
