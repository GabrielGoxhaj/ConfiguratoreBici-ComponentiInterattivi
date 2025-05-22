<template>
  <canvas ref="bjsCanvas" width="1000" height="500" />
  <br />
  <div class="wheel-color-selector-wrapper" style="display: flex;">
    <div class="card-wheels red-wheels" @click="changeWheelsColor('red')"><img src="./components/img/red-tire.jpg"></div>
    <div class="card-wheels green-wheels" @click="changeWheelsColor('green')"><img src="./components/img/green-tire.jpg"></div>
    <div class="card-wheels white-wheels" @click="changeWheelsColor('white')"><img src="./components/img/white-tire.png"></div>
    <div class="card-wheels black-wheels" @click="changeWheelsColor('black')"><img src="./components/img/black-tire.jpg"></div>
  </div>
</template>

<script>
import { ref, onMounted } from "@vue/runtime-core";
import { createScene, changeWheelsColorFn } from "./scenes/MyFirstScene.js";

export default {
  name: "BabylonScene",
  setup() {
    const bjsCanvas = ref(null);

    onMounted(() => {
      if (bjsCanvas.value) {
        createScene(bjsCanvas.value);
      }
    });

    function changeWheelsColor(color) {
      changeWheelsColorFn(color);
    }

    return {
      bjsCanvas,
      changeWheelsColor,
    };
  },
};
</script>

<style>
.card-wheels {
  max-width: 100px;
  max-height: 150px;
  margin: 10px;
  cursor: pointer;
}

.card-wheels img {
  max-width: 100px;
  max-height: 150px;
}
</style>