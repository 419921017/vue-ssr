<template>
  <div id="app">
    <Bar />
    <Foo />
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
