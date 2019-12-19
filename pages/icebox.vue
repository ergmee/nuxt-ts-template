<template lang="pug">
  el-container
    el-main
      el-row(type='flex' justify='start')
        el-col(:span='8') IceBox


</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component({
  components: {
  },
})
export default class extends Vue {
  constructor() {
    super();
  }

}
</script>
<style>

</style>
