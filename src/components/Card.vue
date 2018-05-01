<template>
  <img class="card" :src="link" alt="card" @click="open" :style="{'opacity': card.isDeleted ? 0 : 1}">
</template>

<script lang="ts" src="./Card.ts">
</script>

<style lang="scss">
.card {
  width: 100%;
}
</style>
