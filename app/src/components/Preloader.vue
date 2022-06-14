<template>
  <div class="fe-preloader">
    <div class="fe-preloader__loader" />
  </div>
</template>

<script>
export default {
  name: 'Preloader',
}
</script>

<style scoped>
.fe-preloader {
  position: absolute;
  top: 0;
  background: rgb(123 123 123 / 50%);
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.fe-preloader__loader {
  width: 50px;
  height: 50px;
  animation: rotating 1500ms linear infinite;
  border-radius: 50%;
  border: 5px solid #ffffff;
  border-left-color: transparent;
  box-sizing: border-box;
}

@keyframes rotating {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
