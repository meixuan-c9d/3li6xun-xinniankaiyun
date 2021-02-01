<template>
  <div class="halo absolute top-0 left-0">
    <figure>
      <img 
        :data-src="require('~/assets/start/halo.png')"
        :src="require('~/assets/start/halo.low.png')"
        alt=""
        class="lazyload absolute w-full h-full"
      />
    </figure>
  </div>
</template>
<script>
import 'lazysizes'
import { gsap } from 'gsap'
export default {
  methods: {
    animate() {
      gsap.to(this.$el, {
      duration: 3,
      scale: 1.325,
      autoAlpha: .85,
      repeat: -1,
      ease: "back.inOut(1.7)",
      yoyo: true
    })    
    }
  },
  mounted() {
    this.animate()
    
  }
}
</script>
<style lang="postcss">
.halo {
  width: 100vw;
  height: 100%;
  img {
    width: 100%;
  }

}
</style>