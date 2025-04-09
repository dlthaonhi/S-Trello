<template>
  <div :class="$style.copyright">
    <p>Copyright © {{ new Date().getFullYear() }} Atlassian</p>
    <p>This project is used for project-based learning.</p>
    <p>
      All rights to the copyrighted works (images, data, audios, texts, etc.) used in this project
      are owned by Atlassian.
    </p>
    <p>All other trademarks, logos and copyrights are property of their respective owners.</p>
  </div>
</template>

<style module>
.copyright {
  position: fixed;
  bottom: 15px;
  left: 15px;
  font-size: 10px;
  background-color: #ffffff36;
  border-radius: 5px;
}
</style>
