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
      creator: 'Creator',
      owner: 'Owner',
      token_id: 'Token ID',
      image_thumbnail_url: 'Image',
      permalink: 'Permalink',
      image_original_url: 'Image',
      image_preview_url: 'Image',
      asset_contract: 'Contract',
      last_sale: 'Last Transaction',
      orders: 'Orders',
      username: 'Name',
      profile_img_url: 'Profile Image',
      address: 'Address',
      total_price: 'Last Price',
      created_date: 'Date',
      transaction: 'Transaction',
      block_hash: 'Block Hash',
      block_number: 'Block Number',
      from_account: 'Buyer',
      to_account: 'Seller'
    }
  }
})
createApp(App).use(i18n).mount('#app')
