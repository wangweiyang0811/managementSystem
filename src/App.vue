<template>
  <div id="app">
    <transition name="fade">
      <router-view />
    </transition>
  </div>
</template>

<style lang="scss" scoped>
#app {
  width: 100%;
  height: 100%;
}
.fade-enter-active,
.fade-leave-avtive {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
