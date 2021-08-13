<template>
  <div>Bar

    <div>
      {{$store.state.name}}
    </div>
  </div>
</template>

<script>
export default {
  asyncData(store) {
    return store.dispatch('changeName')
  }
};
</script>

<style scoped>
div {
  color: red;
}
</style>
