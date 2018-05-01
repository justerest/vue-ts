<template>
  <div :style="{'pointer-events': isDisabled ? 'none' : 'all'}">
    {{score}}
    <div class="deck">
      <card v-for="(_, i) in cards" :key="i" :index="i"> </card>
    </div>
  </div>
</template>

<script lang="ts" src="./Deck.ts">
</script>

<style lang="scss">
.deck {
  display: grid;
  grid-template-columns: repeat(6, auto);
  grid-gap: 15px;
  max-width: 1200px;
  margin: auto;
}
</style>
