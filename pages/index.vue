<template>
  <div class="wrapperView flex">
    <main class="view flex-grow relative">

      <transition
        @enter="whenSubviewEnter"
        @leave="whenSubviewLeave"
        :css="false"
        mode="out-in"
      >
        <Preloader v-if="!isPreloaded" />
        <Component 
          v-else
          ref="subview"
          v-bind:is="currentSubview" 
        />
      </transition>
      
    </main>
  </div>
</template>

<script>
import { 
  mapState,
  mapMutations
} from 'vuex'
import { gsap } from 'gsap'

export default {
  mounted() {
    if (window.scriptLoadedJweixin) {
      this.$wxConfig()
    } else {
      const elScriptJweixin = document.getElementById('jweixin')
      elScriptJweixin.onload = this.$wxConfig
    }
  },
  components: {
    Start: () => import('~/components/Start'),
    ChooseObject: () => import('~/components/ChooseObject'),
    GetStick: () => import('~/components/GetStick'),
    StickDetail: () => import('~/components/StickDetail')
  },
  computed: {
    ...mapState([
      'isPreloaded',
      'currentSubview',
      'result'
    ])
  },
  methods: {
    ...mapMutations(['updateIsInteractLocked']),
    whenSubviewEnter(el) {
      if (el.classList.contains('start')) {
        const timeline = gsap.timeline()

        const tweenSlogan = gsap.timeline()
        const elsSlogan = [...el.querySelectorAll('.start__cell--slogan')]
        tweenSlogan
          .add(gsap.from(elsSlogan[0], { autoAlpha: 0}))
          .add(gsap.from(elsSlogan[1], { autoAlpha: 0}))
          .add(gsap.from(elsSlogan[2], { autoAlpha: 0}))
        

        
        const tweenTitleCharacters = gsap.fromTo(
          [...el.querySelectorAll('.start__item--title')],
          {
            autoAlpha: 0,
            scale: 0
          },
          {
            autoAlpha: 1,
            scale: 1,
            stagger: .25,
            ease: "elastic.out(1, 0.5)"
          }
        )

        const tweenTitleOutline = gsap.fromTo(
          '.start__cell--outline',
          {
            autoAlpha: 0,
            yPercent: -2.5
          },
          {
            autoAlpha: 1,
            yPercent: 0,
            duration: 2.5,
            ease: "expo.out"
          }
        )

        const tweenStars = gsap.fromTo(
          [...el.querySelectorAll('.start__cell--star')],
          {
            autoAlpha: 0,
            scale: .5
          },
          {
            autoAlpha: 1,
            scale: 1,
            duration: .5,
            yoyo: true,
            yoyoEase: true,
            repeat: -1,
            stagger: .2,
          }
        )

        const tweenSloganAndOutline = gsap.to(
          [...elsSlogan, '.start__cell--outline'],
          {
            autoAlpha: 0
          }
        )

        const tweenTitleCharactersAlignToCenter = 
        this.$refs.subview.$_tweenTitleCharacters()

        const tweenStartButton = gsap.from(
          '.start__button--start',
          {
            duration: .5,
            scale: 0,
            ease: "elastic.out(1, 0.75)"
          }
        )

        const tweenBeamAndHaloWrapper = gsap.from(
          ['.wrapperBeam', '.wrapperHalo'],
          {
            // autoAlpha: 0,
            scale: 0,
            duration: .35,
            ease: "expo.out"
          }
        )

        timeline
          .add(tweenSlogan)
          .add(tweenTitleCharacters, '>')
          .add(tweenTitleOutline, '>-.5')
          .add(tweenStars, '<.5')
          .add(tweenSloganAndOutline, '>1')
          .add(tweenTitleCharactersAlignToCenter,'<.5')
          .add(tweenStartButton)
          .add(tweenBeamAndHaloWrapper, '<-1')
          
          
      }

      if (el.classList.contains('chooseObject')) {
        const timeline = gsap.timeline()
        const elsRole = [...el.querySelectorAll('.chooseObject__cell--option')]
        const tweenRolesAppear = gsap.from(
          elsRole,
          {
            scale: 0,
            stagger: .15,
            ease: "expo.out",
            duration: .5
          }
        )
        const tweenRolesFadeDown = gsap.to(
          elsRole,
          {
            autoAlpha: .6,
            duration: .5 
          }
        )

        const tweenRolesShake = gsap.to(
            elsRole,
            {
              // onStart: () => {
              //   elsRole.forEach(element => 
              //       element.classList
              //         .add('shake', 'shake-constant')
              //   )
              // },
              scale: .75,
              ease: "elastic.out(1, 0.5)",
              onComplete: () => {
                this.updateIsInteractLocked({ value: false })
              }
            }
          )

        // timeline
        //   .add(tweenRolesAppear)
        //   .add(tweenRolesFadeDown, '>')
        //   .add(tweenRolesShake, '>-.7')
        timeline
          .add(tweenRolesAppear)
          .add(tweenRolesShake)
          .add(tweenRolesFadeDown)
          
      }

      if (el.classList.contains('getStick')) {
        const timeline = gsap.timeline()

        // const elBucket = el.querySelector('.getStick__cell--bucket')
        const elBucket = el.querySelector('.getStick__cell--shaking')
        const tweenBucketAppear = gsap.from(elBucket, {
          autoAlpha: 0,
          scale: .35,
          duration: 1.5,
          ease: "elastic.out(1, 0.5)",
        })

        const tweenBeamWrapper = gsap.fromTo(
          el.querySelector('.wrapperBeam'),
          {
             scale: 0,
          },
          {
            scale: 1,
            duration: .5,
            ease: "expo.out",
            onComplete: () => {
              this.$refs.subview.$refs.beam.animate()
            }
          }
        )

        const tweenShakeButton = gsap.from(
          el.querySelectorAll('.getStick__button--shake'),
          {
            scale: 0,
            duration: .5,
            scale: 0,
            ease: "elastic.out(1, 0.75)"
          }
        )

        timeline
          .add(tweenBucketAppear)
          .add(tweenBeamWrapper, '<')
          .add(tweenShakeButton, '<')
      }

      if (el.classList.contains('stickDetail')) {
        const timeline = gsap.timeline()

        const tweenSponsorAppear = gsap.from(
          el.querySelector('.stickDetail__cell--sponsor'),
          {
            autoAlpha: 0,
          }
        )

        const tweenResultAppear = gsap.from(
          el.querySelector('.stickDetail__cell--result'),
          {
            autoAlpha: 0,
            scale: 5,
            ease: "expo.out",
            duration: .75
          }
        )

        const tweenButtonsAppear = gsap.from(
          [...el.querySelectorAll('.stickDetail__button')],
          {
            scale: 0,
            duration: .5,
            scale: 0,
            ease: "elastic.out(1, 0.75)",
            stagger: .15
          }
        )


        function getCornerInitialX(offset) {
          return index => {
            if (index === 0 || index === 2) {
              return offset * -1
            } else if (index === 1 || index === 3) {
              return offset
            } 
          }
        }

        function getCornerInitialY(offset) {
          return index => {
            if (index === 0 || index === 1) {
              return offset * -1
            } else if (index === 2 || index === 3) {
              return offset
            } 
          }
        }

        const tweenCornerGlyphIn = gsap.from(
          el.querySelectorAll('.stickDetail__cell--cornerGlyph'),
          {
            xPercent: getCornerInitialX(100),
            yPercent: getCornerInitialY(100),
            autoAlpha: 0,
            duration : .35,
            ease: "expo.out"
          }
        )

        const tweenCornerGlyphOut = gsap.to(
          el.querySelectorAll('.stickDetail__cell--cornerGlyph'),
          {
            xPercent: getCornerInitialX(50),
            yPercent: getCornerInitialY(50),
            autoAlpha: 0,
            duration : .24,
            ease: "expo.out"
          }
        )

        const timelineGlyph = gsap.timeline({
          repeat: -1
        })
        timelineGlyph.timeScale(.75)   

        timelineGlyph
          .add(tweenCornerGlyphIn)
          .add(tweenCornerGlyphOut, '>1.1')

        timeline
          .add(tweenSponsorAppear)
          .add(tweenResultAppear)
          .add(timelineGlyph, '>1.25')
          .add(tweenButtonsAppear)
          
          
      }
    },
    whenSubviewLeave(el, done) {

      const generalFadeOut = function(done) {
        gsap.to(el, {
          duration: .5,
          autoAlpha: 0,
          onComplete: done
        })
      }

      if (el.classList.contains('getStick')) {
        const elImage = new Image()
        elImage.onload = () => {
          generalFadeOut(done)
        }
        elImage.src = this.result.sheet
      } else {
        generalFadeOut(done)
      }

    }
  }
}
</script>

<style>
.view {
  border: solid .1px;
  border-image-source: url('~assets/border/basic.svg');
  border-image-slice: 30%;
  border-image-repeat: repeat;
  border-image-width: 16px;
  background-color: #f0550a;


}
</style>