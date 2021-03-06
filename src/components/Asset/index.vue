<template>
  <div class="asset_container--outer">
    <div class="asset_container">
      <div
        class="asset_container_child">
        <field label="Artwork" :field="artworkField" :loading="loading"/>
      </div>
      <div
        v-if="false"
        class="asset_container_child">
        <field label="Creator" :field="artistField" :loading="loading"/>
      </div>
      <div
        v-if="false"
        class="asset_container_child">
        <field label="Owner" :field="ownerField" :loading="loading"/>
      </div>
      <div
        class="asset_container_child last_sale">
        <field label="last_sale" :field="lastSaleField" :loading="loading"/>
      </div>
      <template v-for="key in fields"
          :key="key">
        <div 
          :class="`asset_container_child asset_container_child--${key}`">
          <field :label="key" :field="asset[key]" :loading="loading"/>
        </div>
      </template>
    </div>
  </div>
</template>
<style lang="stylus">
.asset
  &_container
    @media (min-width:961px)
      margin: 0 auto
      max-width: 961px
    width: 100%
    display: grid
    grid-auto-flow: row
    @media (min-width:961px)
      grid-template-columns: repeat(3, 1fr)
    grid-column-gap: 1rem
    grid-row-gap: 1rem
    &_child
      width: 100%
      height: 100%
      &--asset_contract
        @media (min-width:961px)
          grid-column: 1/4
        .field--asset_contract
          display: grid
          grid-template-columns: 1fr 1fr
          @media (min-width:961px)
            grid-template-columns: 1fr 1fr 1fr
          grid-column-gap: 1rem
      &.asset_contract
        grid-column: 1/4
        .field--0
          display: grid
          grid-auto-flow: row
          @media (min-width:961px)
            grid-template-columns: repeat(2, 1fr)
          grid-column-gap: 1rem
      &.last_sale
        @media (min-width:961px)
          grid-column: 2/4
        .field--transaction
          display: grid
          grid-template-columns: 1fr 1fr
          grid-column-gap: 1rem
          .field_wrap
            &--transaction
              @media (min-width:961px)
                grid-column: 1/3
            &--block_number
              margin-top: 0
            &--block_hash
              grid-column: 1/3

      .field
        position: relative
        word-wrap: break-word
        hyphens: auto
        transition: background 200ms
        .string
          display: grid
          grid-template-columns: repeat(auto-fit, .6rem)
          cursor: default
          .char
            text-align: center
            height: 1.2rem
            transition: background-color 1000ms ease
            &::selection
              color: #333
              background-color: #AAA
            &:hover
              background-color: #333
              transition: background-color 250ms ease
        &_wrap
          padding: 1rem
          position: relative
          transition: transform 200ms ease-out, filter 200ms ease-out
          transform: scale(1)
          filter: opacity(1)
          h1, h2, h3, h4, h5, h6
            font-family: "blender";
            margin-top: 0
            margin-bottom: .5rem
            cursor: default
            &::selection
              color: #333
              background-color: #AAA
          &:not(:first-child)
            margin-top: 1rem
          &::before, &::after
            content: ''
            position: absolute
            width: 77%
            height: 33%
            z-index: -1
          &--0
            &:before, &:after
              transition: width 150ms ease-out, height 150ms ease-out, transform 500ms ease-out 3000ms
          &--1
            &:before, &:after
              transition: width 150ms ease-out, height 150ms ease-out, transform 500ms ease-out 3500ms
          &--2
            &:before, &:after
              transition: width 150ms ease-out, height 150ms ease-out, transform 500ms ease-out 4000ms
          &--3
            &:before, &:after
              transition: width 150ms ease-out, height 150ms ease-out, transform 500ms ease-out 4500ms
          &--4
            &:before, &:after
              transition: width 150ms ease-out, height 150ms ease-out, transform 500ms ease-out 5000ms
          &:before
            top: 0
            left: 0
            border-top: solid 1px #AAA
            border-left: solid 1px #AAA
            transform-origin: 0 0
          &:after
            right: 0
            bottom: 0
            border-right: solid 1px #AAA
            border-bottom: solid 1px #AAA
            transform-origin: 100% 100%
          &:hover
            &::before, &::after
              width: 50%
              height: 100%
    .field_wrap--loading
      transform-origin: 50% 50%
      transform: scale(.0)
      filter: opacity(0)
      &:before, &:after
        transform: scale(.0)

*::-webkit-scrollbar
    height: 2ex
    width: 2ex
*::-webkit-scrollbar-track
    background: #555
*::-webkit-scrollbar-thumb
    background-color: #CCC
    border-radius: 0px
    border: solid .25rem #555
</style>
<script>
import useAxios from 'vue3-use-axios'
import Field from './Field'
import fields from './fields.json'

export default {
  props: {
    'assetUrl': {
      type: String,
      required: true
    }
  },
  components: {Field},
  computed: {
    artworkField() {
      const field = {}
      const keys = ['name', 'description', 'image_preview_url', 'permalink']
      keys.map(key => field[key] = this.asset[key])
      return field
    },
    artistField() {
      const field = {}
      if (Object.keys(this.asset).indexOf('creator') >= 0) {
        field['name'] = this.asset['creator']['user']['username']
        field['profile_img_url'] = this.asset['creator']['profile_img_url']
        field['address'] = this.asset['creator']['address']
      }
      return field
    },
    ownerField() {
      const field = {}
      if (Object.keys(this.asset).indexOf('owner') >= 0) {
        field['name'] = this.asset['owner']['user']['username']
        field['profile_img_url'] = this.asset['owner']['profile_img_url']
        field['address'] = this.asset['owner']['address']
      }
      return field
    },
    contractField() {
      let field = {}
      if (Object.keys(this.asset).indexOf('asset_contract') >= 0) {
        field['meta'] = {
          'name': this.asset['asset_contract']['name'],
          'owner': this.asset['asset_contract']['owner'],
          'created_date': this.asset['asset_contract']['created_date'],
          'symbol': this.asset['asset_contract']['symbol'],
          'asset_contract_type': this.asset['asset_contract']['asset_contract_type'],
          'schema_name': this.asset['asset_contract']['schema_name']
        }
        field['links'] = {
          'address': this.asset['asset_contract']['address'],
          'external_link': this.asset['asset_contract']['external_link'],
          'image_url': this.asset['asset_contract']['image_url']
        }
      }
      return field
    },
    lastSaleField() {
      let field = {}
      const lastSale = this.asset['last_sale'] || require('./transaction.js').default
      field = {
        'total_price': lastSale['total_price'] / Math.pow(10, lastSale['payment_token']['decimals']) + lastSale['payment_token']['symbol'],
        'created_date': lastSale['created_date'],
        'transaction': {
          'block_hash': lastSale['transaction']['block_hash'],
          'from_account': {
            'name': lastSale['transaction']['from_account']['user']['username'],
            'profile_img_url': lastSale['transaction']['from_account']['profile_img_url'],
            'address': lastSale['transaction']['from_account']['address']
          },
          'to_account': {
            'name': lastSale['transaction']['to_account']['user']['username'],
            'profile_img_url': lastSale['transaction']['to_account']['profile_img_url'],
            'address': lastSale['transaction']['to_account']['address']
          },
        }
      }
      return field
    }
  },
  beforeCreate() {
    const { response, exec } = useAxios()
    exec({
      url: this.assetUrl,
      method: 'get'
    }).then(() => {
      this.asset = response.value.data
      this.loading = false
    })
  },
  data() {
    return {
      asset: {},
      fields,
      loading: true
    }
  }
}
</script>
