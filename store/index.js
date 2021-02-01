import SHEET_HONGYUN from '~/assets/stick-detail/hongyun.webp'
import SHEET_CAIXUE from '~/assets/stick-detail/caixue.webp'
import SHEET_JIANKANG from '~/assets/stick-detail/jiankang.webp'
import SHEET_NAFU from '~/assets/stick-detail/nafu.webp'
import SHEET_QIANCHENG from '~/assets/stick-detail/qiancheng.webp'
import SHEET_PINGAN from '~/assets/stick-detail/pingan.webp'
import SHEET_YUANFA from '~/assets/stick-detail/yuanfa.webp'
import SHEET_XINHUAI from '~/assets/stick-detail/xinhuai.webp'
import SHEET_ZHAOCAI from '~/assets/stick-detail/zhaocai.webp'

import POSTER_HONGYUN from '~/assets/stick-detail/posters/hongyun.jpg'
import POSTER_CAIXUE from '~/assets/stick-detail/posters/caixue.jpg'
import POSTER_JIANKANG from '~/assets/stick-detail/posters/jiankang.jpg'
import POSTER_NAFU from '~/assets/stick-detail/posters/nafu.jpg'
import POSTER_QIANCHENG from '~/assets/stick-detail/posters/qiancheng.jpg'
import POSTER_PINGAN from '~/assets/stick-detail/posters/pingan.jpg'
import POSTER_YUANFA from '~/assets/stick-detail/posters/yuanfa.jpg'
import POSTER_XINHUAI from '~/assets/stick-detail/posters/xinhuai.jpg'
import POSTER_ZHAOCAI from '~/assets/stick-detail/posters/zhaocai.jpg'


export const state = () => ({
  isInteractLocked: true,
  isPreloaded: false,
  currentSubview: '',
  // currentSubview: 'ChooseObject',
  // currentSubview: 'Start',
  // currentSubview: 'GetStick',
  // currentSubview: 'StickDetail',
  gameTitleCharacters: [
    {}, {}, {}, {}, {}
  ],
  sticks: [
    {
      id: 'hongyun',
      backgroundColor: '#f0550a',
      borderColor: '#47b9d1 ',
      sheet: SHEET_HONGYUN,
      poster: POSTER_HONGYUN
      
    },
    {
      id: 'nafu',
      backgroundColor: '#6FB826',
      borderColor: '#ed85b8',
      sheet: SHEET_NAFU,
      poster: POSTER_NAFU
    },
    {
      id: 'zhaocai',
      backgroundColor: '#E33434',
      borderColor: '#54d1a4',
      sheet: SHEET_ZHAOCAI,
      poster: POSTER_ZHAOCAI
    },
    {
      id: 'pingan',
      backgroundColor: '#4A9BDB',
      borderColor: '#dbac67',
      sheet: SHEET_PINGAN,
      poster: POSTER_PINGAN
    },
    {
      id: 'jiankang',
      backgroundColor: '#7B53CF',
      borderColor: '#b1cc5e',
      sheet: SHEET_JIANKANG,
      poster: POSTER_JIANKANG
    },
    {
      id: 'qiancheng',
      backgroundColor: '#3063D9',
      borderColor: '#f7d752',
      sheet: SHEET_QIANCHENG,
      poster: POSTER_QIANCHENG
    },
    {
      id: 'yuanfa',
      backgroundColor: '#CF4091',
      borderColor: '#60c465',
      sheet: SHEET_YUANFA,
      poster: POSTER_YUANFA
    },
    {
      id: 'caixue',
      backgroundColor: '#F7AF1E',
      borderColor: '#998deb',
      sheet: SHEET_CAIXUE,
      poster: POSTER_CAIXUE
    },
    {
      id: 'xinhuai',
      backgroundColor: '#31B585',
      borderColor: '#e88f48',
      sheet: SHEET_XINHUAI,
      poster: POSTER_XINHUAI
    },
  ],
  objectChosen: '',
  result: null,
  // result: {
  //   id: 'hongyun'
  // }
})

export const mutations = {
  updateIsInteractLocked(state, { value }) {
    state.isInteractLocked = value
  },
  updateIsPreloaded(state, { value }) {
    state.isPreloaded = value
  },
  updateCurrentSubview(state, { value }) {
    state.currentSubview = value
  },
  updateObjectChosen(state, { value }) {
    state.objectChosen = value
  },
  updateResult(state, { value }) {
    state.result = value
  }
}

export const actions = {
  getStick({ state, commit }) {
    const value = state.sticks[
      Math.floor(
        Math.random() * 
        state.sticks.length
      )
    ]
    commit('updateResult', {
      value
    })
  }
}
