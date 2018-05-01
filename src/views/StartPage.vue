<template>
  <div class="start-page">
    <img src="@/assets/StartGame.png" alt="StartGame">
    <div class="start-page__title">MEMORY GAME</div>
    <router-link class="button" to="/deck">Начать игру</router-link>
  </div>
</template>

<style lang="scss">
.start-page {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
}
.title {
  opacity: 0.85;
  font-family: OpenSans-Bold;
  font-size: 28px;
  color: #ffffff;
  letter-spacing: 0.2px;
}
</style>