<template lang="pug">
  el-container
    .container-fluid.top-title
      el-col(:span='8')
        img(src="logo.png")
        div Уникальные стеллажи "Водолей"
      el-col(:span='16')
        .contacts_box
          div
            i.far.fa-map-marker-alt
              span Новосибирск:  (383) 353-56-27 
          div
            i.far.fa-map-marker-alt
              span Москва:  (495) 767-45-04

        el-row.top-block 
          ul.dots
            li
              NuxtLink(to='/') 
                el-tooltip(placement="top" content="О компании")
                  i.awesome-icons.zoom.far.fa-lg.fa-city 
            li
              NuxtLink(to='/') 
                el-tooltip(placement="top" content="Клиентам")
                  i.awesome-icons.zoom.far.fa-lg.fa-address-card
            li
              NuxtLink(to='/') 
                el-tooltip(placement="top" content="Доставка")
                  i.awesome-icons.zoom.far.fa-lg.fa-shipping-fast 
            li
              NuxtLink(to='/icebox') 
                el-tooltip(placement="top" content="Схемы сборки")
                  i.awesome-icons.zoom.far.fa-lg.fa-warehouse-alt 
            li
              NuxtLink(to='/') 
                el-tooltip(placement="top" content="Контакты")
                  i.awesome-icons.zoom.far.fa-lg.fa-file-invoice 
            li
              NuxtLink(to='/products') 
                el-tooltip(placement="top" content="products")
                  i.awesome-icons.far.fa-lg.fa-hamburger.zoom 
            li
              NuxtLink(to='/recepts')
                el-tooltip(placement="top" content="recepts")
                  i.awesome-icons.far.fa-lg.fa-file-invoice.zoom
            li
              NuxtLink(to='/')
                i.awesome-icons.far.fa-lg.fa-shopping-cart.zoom
                span
                  mark.rubberBand 10
        el-row
          //- i.awesome-icons.zoom.far.fa-lg.fa-file-invoice Контакты
    el-row.tac
      el-col(:span='8')
        el-menu.el-menu-vertical-demo(default-active='2', 
        @open='handleOpen', 
        @close='handleClose', 
        background-color='#29364b', 
        text-color='#cccccc', 
        active-text-color='#ffffff')
          el-submenu(index='1')
            template(slot='title')
              i.el-icon-location
              span Navigator One
            el-menu-item-group(title='Group One')
              el-menu-item(index='1-1') item one
              el-menu-item(index='1-2') item one
            el-menu-item-group(title='Group Two')
              el-menu-item(index='1-3') item three
            el-submenu(index='1-4')
              template(slot='title') item four
              el-menu-item(index='1-4-1') item one
          el-menu-item(index='2')
            i.el-icon-menu
            span Navigator Two
          el-menu-item(index='3', disabled='')
            i.el-icon-document
            span Navigator Three
          el-menu-item(index='4')
            i.el-icon-setting
            span Navigator Four
      el-col(:span='16')
        nuxt
    el-footer.footer
      el-row(:gutter='20' type='flex' justify='center' style="background-color:#000000;") 
        b(style="margin:24px; color:white;" ) ololo © 2019
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
@Component
export default class extends Vue {
  constructor() { super(); }



  handleOpen(key, keyPath) {
    console.log(key, keyPath);
  }
  handleClose(key, keyPath) {
    console.log(key, keyPath);
  }

}






</script>

<style>
/* footer {
    clear: both;
    position: relative;
    height: 200px;
    margin-top: -200px;
} */

body {
  font-family: Rubik,sans-serif;
  /* background-color: #1d2634; */
}


.zoom:hover {
    transform:scale(1.2);
    -moz-transform:scale(1.2);
    -webkit-transform:scale(1.2);
    -ms-transform:scale(1.2);
    -o-transform:scale(1.2);
    color: #ffffff;
}
.awesome-icons {
    /* background-color: #FFF; */
    color: #cccccc;
}

.top-block {
    display: flex;
    justify-content: flex-start;
}
.top-title {
    height: 90px;
    background: #29364b;
    border: 1px solid #cccccc;
    padding: 0;
    /* background: url(/logo.png); */
}
.contacts_box{
    color: #cccccc;
    background: #1d2634;
    border: 1px solid #cccccc;
    padding: 0;
}
/* .colors{
    background: #29364b;
    background: #1d2634;
    background: #3a92fd;
    background: #84888f;
} */
</style>