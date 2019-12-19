<template lang="pug">
  el-container
    el-main
      el-row(type='flex' :gutter='0' justify='center')
        el-col(:span='24' )
          el-form(v-if="recept !== null" ref='form')
            /// name ///
            el-form-item
              el-input(v-model='recept.name' placeholder='Recept name') 
            /// category ///
            el-form-item
              el-select(v-model='recept.category', value-key='value', placeholder='Select')
                el-option(v-for='item in categories', :key='item.value', :label='item.label', :value='item.value')
                  i.far(v-bind:class='item.icon')
                  span  {{ item.label }}
            /// ingredientsList ///
            el-form-item
              el-row(v-for="(ingredient, key) in recept.ingredientsList" :key='ingredient.value')
                el-col(:span='6')
                  el-input(v-model='ingredient.name' placeholder='Выбрать ингридиент..') 
                el-col(:span='6')
                  el-input(v-model='ingredient.amount' placeholder='amount') 
                el-col(:span='6')
                  el-select(v-model='ingredient.measure', value-key='value', placeholder='Select')
                    el-option(v-for='item in measures', :key='item.value', :label='item.label', :value='item')
                      span  {{ item.label }}
                el-col(:span='6')
                  el-button.grow(type="danger" style='margin: 5px;' icon="far fa-trash-alt" circle @click="deleteIngredient(key)")
              el-row
                el-col(:span='6')
                  el-button.grow(type="success" style='margin: 5px;' icon="far fa-plus" circle @click="addIngredient( 1,'грамм')" )
            /// description ///
            el-form-item
              el-input(v-model='recept.description' type='textarea' :autosize="{ minRows: 8, maxRows: 12}" placeholder='Описание рецепта')
            /// Logo Component ///
            el-form-item
              el-row(type='flex' justify='center')
                Logo(:ings="recept.ingredientsList")
            /// avatar ///
            el-form-item
              img(:src="recept.avatar")
            el-form-item
              el-button(type='primary', @click='onSubmit') Create
              el-button Cancel

</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import Logo from "~/components/Logo.vue";

@Component({
  components: {
    Logo
  }
})
export default class extends Vue {
  constructor() {
    super();
  }
  recept: any = null;
  categories = [
    { icon: "fa-turkey", value: "Заготовки", label: "Заготовки" },
    { icon: "fa-pie", value: "Выпечка и десерты", label: "Выпечка и десерты" },
    { icon: "fa-steak", value: "Основные блюда", label: "Основные блюда" },
    { icon: "fa-wheat", value: "Завтраки", label: "Завтраки" },
    { icon: "fa-salad", value: "Салаты", label: "Салаты" },
    { icon: "fa-soup", value: "Супы", label: "Супы" },
    { icon: "fa-pizza-slice", value: "Паста и пицца", label: "Паста и пицца" },
    { icon: "fa-cookie", value: "Закуски", label: "Закуски" },
    { icon: "fa-hamburger", value: "Сэндвичи", label: "Сэндвичи" },
    { icon: "fa-wine-bottle", value: "Напитки", label: "Напитки" },
    { icon: "fa-prescription-bottle", value: "Соусы и маринады", label: "Соусы и маринады", },
    { icon: "fa-soup", value: "Бульоны", label: "Бульоны" }
  ];
  measures = [
    { id: 1, value: "банка", label: "банка" },
    { id: 2, value: "головка", label: "головка" },
    { id: 3, value: "грамм", label: "грамм" },
    { id: 4, value: "зубчик", label: "зубчик" },
    { id: 5, value: "килограмм", label: "килограмм" },
    { id: 6, value: "кусок", label: "кусок" },
    { id: 7, value: "литр", label: "литр" },
    { id: 8, value: "миллилитр", label: "миллилитр" },
    { id: 9, value: "накончикеножа", label: "накончикеножа" },
    { id: 10, value: "повкусу", label: "повкусу" },
    { id: 11, value: "пучок", label: "пучок" },
    { id: 12, value: "стакан", label: "стакан" },
    { id: 13, value: "столоваяложка", label: "столоваяложка" },
    { id: 14, value: "чайнаяложка", label: "чайнаяложка" },
    { id: 15, value: "штука", label: "штука" },
    { id: 16, value: "щепотка", label: "щепотка" },
    { id: 17, value: "стебель", label: "стебель" },
    { id: 18, value: "дэш", label: "дэш" },
    { id: 19, value: "веточка", label: "веточка" }
  ];
  mounted() {
    const urlParams = new URLSearchParams(window.location.search);
    var receptName = urlParams.get("recept");
    this.getRecept(receptName);
  }
  addIngredient( amount, measure) {
    this.recept.ingredientsList['Новый Ингридиент'] = {name: 'Новый Ингридиент', amount: amount, measure: measure}
    this.$forceUpdate()
  }
  deleteIngredient(ingredient) {
    delete this.recept.ingredientsList[ingredient]
    this.$forceUpdate()
  }
  getRecept(receptName) {
    this.recept = JSON.parse(JSON.stringify(this.$store.state.recepts[receptName]));

  }
  async onSubmit() {
    console.log("onSubmit:");
    await this.$store
      .dispatch("saveRecept", {
        name: this.recept.name,
        avatar: this.recept.avatar,
        category: this.recept.category,
        description: this.recept.description,
        ingredientsList: this.recept.ingredientsList,
        favoritesAdd: false,
        tags: ["тег рецепта 1", "тег рецепта 2"],
        photo: [{ imgName: "recept photo", imgPath: "recept photo" }],
        metaData: { autor: "АВТОР РЕЦЕПТА", timestamp: Date.now() }
      })
      .then(() => {})
      .catch(() => {});
  }
}
</script>

<style>
</style>
