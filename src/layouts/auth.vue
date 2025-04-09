<template>
  <el-container>
    <div :class="$style.authContainer">
      <div :class="$style.authWrapper">
        <slot />
      </div>
    </div>
  </el-container>
</template>

<style module>
.authContainer {
  min-height: 100vh;
  position: relative;
  flex: 1;
}
.authWrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgb(250, 251, 252);
  background-image: url(https://id-frontend.prod-east.frontend.public.atl-paas.net/assets/trello-left.4f52d13c.svg),
    url(https://id-frontend.prod-east.frontend.public.atl-paas.net/assets/trello-right.3ee60d6f.svg);
  background-repeat: no-repeat, no-repeat;
  background-attachment: fixed, fixed;
  background-size: 368px, 368px;
  background-position:
    left bottom,
    right bottom;
}
</style>
