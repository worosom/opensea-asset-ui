<template>
  <div class="asset_container--outer">
    <div class="asset_container">
      <div
        class="asset_container_child">
        <field label="Artwork" :field="artworkField"/>
      </div>
      <div
        class="asset_container_child">
        <field label="Artist" :field="artistField"/>
      </div>
      <div
        class="asset_container_child">
        <field label="Owner" :field="ownerField"/>
      </div>
      <div
        class="asset_container_child asset_contract">
        <field label="asset_contract" :field="contractField"/>
      </div>
      <template v-for="key in fields"
          :key="key">
        <div
          class="asset_container_child">
          <field :label="key" :field="asset[key]"/>
        </div>
      </template>
    </div>
  </div>
</template>
<style lang="stylus">
.asset
  &_container
    width: 100%
    display: grid
    grid-auto-flow: row
    grid-template-columns: repeat(3, 1fr)
    grid-column-gap: 1rem
    grid-row-gap: 1rem
    &_child
      width: 100%
      height: 100%
      &.asset_contract
        grid-column: 1/4
        .field--0
          display: grid
          grid-auto-flow: row
          grid-template-columns: repeat(2, 1fr)
      .field
        position: relative
        word-wrap: break-word
        hyphens: auto
        &_wrap
          padding: 1rem
          position: relative
          h1, h2, h3, h4, h5, h6
            margin-top: 0
            margin-bottom: .5rem
          &:not(:first-child)
            margin-top: 1rem
          &::before, &::after
            content: ''
            position: absolute
            width: 77%
            height: 33%
            z-index: -1
            transition: width 150ms ease-out, height 150ms ease-out
          &::before
            top: 0
            left: 0
            border-top: solid 1px #AAA
            border-left: solid 1px #AAA
          &::after
            right: 0
            bottom: 0
            border-right: solid 1px #AAA
            border-bottom: solid 1px #AAA
          &:hover
            &::before, &::after
              width: 50%
              height: 50%


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
      const keys = ['name', 'image_thumbnail_url', 'permalink']
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
    }
  },
  beforeMount() {
    const { response, exec } = useAxios()
    exec({
      url: this.assetUrl,
      method: 'get'
    }).then(() => {
      this.asset = response.value.data
    })
  },
  data() {
    return {
      asset: {},
      fields
    }
  }
}
</script>
