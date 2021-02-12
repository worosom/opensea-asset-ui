import { createApp } from 'vue'
import App from './App.vue'
import { createI18n } from 'vue-i18n'
import ObserveVisibility from 'vue-observe-visibility';


const i18n = createI18n({
  legacy: false,
  missing: (locale, key) => key.split('_').map(phrase => phrase.replace(/^\w/, c => c.toUpperCase())).join(' '),
  locale: 'en',
  messages: {
    en: {
      id: 'ID',
      token_id: 'Token ID',
      image_thumbnail_url: 'Image',
      image_original_url: 'Image',
      image_preview_url: 'Image',
      asset_contract: 'Contract',
      last_sale: 'Last Transaction',
      username: 'Name',
      profile_img_url: 'Profile Image',
      total_price: 'Last Price',
      created_date: 'Date',
      block_hash: 'Block Transactions',
      block_number: 'Block Number',
      from_account: 'Buyer',
      to_account: 'Seller'
    }
  }
})
const app = createApp(App)
app.use(ObserveVisibility)
app.use(i18n)
app.mount('#app')
