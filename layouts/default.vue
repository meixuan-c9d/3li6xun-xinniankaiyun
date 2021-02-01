<template>
  <div class="frame flex flex-col absolute w-full h-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
    <div 
      v-if="isTopNavigationBarShown" 
      class="frame__row frame__row--weixin">
      <img :src="require('~/assets/kit-ios-top-bar.jpg')" alt="">
    </div>
    <Nuxt class="flex-grow" />
  </div>
</template>

<script>
// import "tailwindcss/tailwind.css"
if (process.client) {
  require('webp-in-css/polyfill')
}
export default {
  computed: {
    isTopNavigationBarShown() {
      return process.env.NODE_ENV !== 'production' ? true : false
      // return false
    }
  }
}
</script>

<style lang="postcss">
/*! @import */
@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
.frame {
  overflow: hidden;
  max-width: 414px;
  max-height: 812px;
  &__row {
    &--weixin {
      height: 64px;
      font-size: 0;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
figure {
  font-size: 0;
}
</style>