<script setup>
import WorkSpace from './WorkSpace.vue'
import CreateBoard from '@/components/CreateBoard.vue'
import UserMenu from './UserMenu.vue'
</script>
<template>
  <nav :class="$style.headerNav">
    <router-link to="/" :class="$style.logo">
      <div>
        <div :class="$style.icon"></div>
      </div>
    </router-link>

    <div :class="$style.menu">
      <WorkSpace :class="$style.marginRight" />
      <CreateBoard :class="$style.marginRight" />
    </div>

    <div :class="$style.userAction">
      <UserMenu />
    </div>
  </nav>
</template>

<style module>
.headerNav {
  display: flex;
  box-sizing: border-box;
  max-height: 48px;
  padding: 8px;
  overflow: hidden;
  transition: background-color 300ms;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: hsla(218, 54%, 19.6%, 0.16);
  background-color: #ffffff;
  -webkit-backdrop-filter: blur(6px);
  backdrop-filter: blur(6px);
}

.logo {
  display: block;
  position: relative;
  height: 32px;
  padding: 0 8px;
  border-radius: 3px;
  flex-shrink: 0;
  margin-top: 0;
}

.menu button:hover,
.logo:hover {
  background-color: #091e4224;
  color: #44546f;
}

.icon {
  position: relative;
  width: 75px;
  height: 32px;
  margin: 0;
  padding: 8px 0;
  opacity: 1;
  filter: brightness(0) saturate(100%) invert(30%) sepia(53%) saturate(323%) hue-rotate(179deg)
    brightness(91%) contrast(88%);
}

.icon::after,
.icon::before {
  content: '';
  display: block;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-image: url('https://trello.com/assets/d947df93bc055849898e.gif');
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}

.icon::after {
  opacity: 0;
  background-image: url(https://trello.com/assets/87e1af7….gif);
}

.menu {
  display: flex;
  flex-basis: 100%;
}
.menu button[aria-expanded='true'] {
  background-color: #e9f2ff;
  color: #0c66e4;
}
.menu button[aria-expanded='true']:hover {
  background-color: #cce0ff;
}

.userAction {
  display: flex;
  flex-grow: 1;
  justify-content: flex-end;
}

.marginRight {
  margin-right: 5px;
}
</style>
