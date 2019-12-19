<template lang="pug">
  el-container
    el-main
      el-row(type='flex' justify='center')
        el-col(v-if="receptCard != null" :span='4')

        el-col(v-if="receptCard != null" :span='16')
          el-card(shadow="always") 
            el-row(type='flex' justify='center')
              el-image(:src="receptCard.avatar")
            el-row(type='flex' justify='center')
              el-col
                h1(style="text-align: center") {{receptCard.name}}
                el-tag {{receptCard.category}}
                hr
                
                div.ingridients
                  ul.oglavl   
                    li(v-for='(amount, ingredient) in receptCard.ingredientsList') 
                      el-tooltip(placement="top")
                        div(slot="content")
                          el-image(style="width:100px;" :src="$store.state.products[ingredient].avatar")
                          div {{$store.state.products[ingredient].name}}
                          div {{$store.state.products[ingredient].description}}
                        b.text {{ingredient}}
                      span.page {{amount.amount}}
                        span {{amount.measure}}
                    //- span.page {{receptCard.ingredientsList[ingredient]}}
                
                      //- v-bind:key="ingredient.key"

                //- div.ingridients
                //-   ul.oglavl   
                //-     li(v-for='ingredient in this.receptCard.ingredientsList') 
                //-       el-tooltip(placement="top")
                //-         div(slot="content")
                //-           div {{ingredient.ingredientName}}
                //-           div {{ingredient.ingredientAmount}}
                //-         b.text {{ingredient.ingredientName}}
                //-       span.page {{ingredient.ingredientAmount}}

                el-row(type='flex' justify='center')
                  Logo(:ings="receptCard.ingredientsList")


                div {{receptCard.description}}

                div(v-for='tag in receptCard.tags')
                  el-tag {{tag}}
                div
                  i.far.fa-user  {{receptCard.metaData.autor}}
                div
                  i.far.fa-clock {{receptCard.metaData.timestamp}}

        el-col(v-if="receptCard != null" :span='4')

</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { Route } from "vue-router";
import Logo from '~/components/Logo.vue';

interface WithRoute {
  $route: Route;
}
@Component({
  components: {
    Logo
  }
})
export default class extends Vue implements WithRoute {
  receptCard: any = null;
  // ingridients: any = [];

  constructor() {
    super();
  }
  mounted() {
    this.displayRecept()
  }

  displayRecept(){
    for(var recept in this.$store.state.recepts){
      if(recept === this.$route.query.recept){
        this.receptCard = this.$store.state.recepts[recept]
      }
    }
       

  }

}
</script>

<style>

</style>
