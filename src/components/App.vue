<template>
  <div id="app">
    <router-link to="/">Foo</router-link>
    <router-link to="/bar">Bar</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
import Bar from './Bar.vue';
import Foo from './Foo.vue';
export default {
  components: {
    Bar,
    Foo,
  },
};
</script>

<style scoped></style>
