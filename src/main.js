import { createApp } from 'vue'
import App from './App.vue'
import { createI18n } from 'vue-i18n'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      name: 'Name',
      description: 'Description',
      id: 'ID',
      creator: 'Artist',
      owner: 'Owner',
      token_id: 'Token ID',
      image_thumbnail_url: 'Image',
      permalink: 'Permalink',
      image_original_url: 'Image',
      asset_contract: 'Contract',
      last_sale: 'Last sale',
      orders: 'Orders',
      username: 'Name',
      profile_img_url: 'Profile Image',
      address: 'Address'
    }
  }
})
createApp(App).use(i18n).mount('#app')
