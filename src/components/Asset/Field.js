import { resolveDirective, withDirectives, h } from 'vue'
import { useI18n } from 'vue-i18n'
import QrcodeVue from 'qrcode.vue'
import Character from './Character'
import BlockHash from './BlockHash.vue'


export default {
  props: ['label', 'field', 'loading'],
  data() {
    return {
      fieldVisibility: false
    }
  },
  methods: {
    renderFields(label, field, level, loading, parent) {
      const { t } = useI18n()
      level = level || 0
      field = field || 'undefined'
      let type;
      switch (label) {
        case 'block_hash':
          type = label
          break;
        default:
          type = typeof field
          break;
      }
      const visible = this.fieldVisibility && !this.loading
      const header = h(`h${2 + level}`, {}, t(label))
      const res = [
      ]
      switch (type) {
        case 'number':
          field = String(field)
          res.push(h('div', {class: 'string'}, field.split('').map(char => h(Character, {class: 'char', char, loading: visible}))))
          break;
        case 'string':
          if (loading) {
            break;
          }
          if (label.indexOf('img') >= 0 || label.indexOf('image') == 0 && label.indexOf('original') < 0) {
            res.push(h('img', {style: 'width: 100%; maxWidth: 150px', src: field}))
            break;
          } else if (field.indexOf('http') == 0 || label == 'address') {
            const href = label == 'address' ? `https://etherscan.io/address/${field}` : field
            res.push(h('a',
              {href, target: '_blank'},
              h(QrcodeVue, {width: null, height: null, style: 'width: 100%', value: href, renderAs: 'svg'})))
            break;
          } else if (label.indexOf('color') >= 0) {
            res.push(h('div', {style: `background: #${field}; width: 50px; height: 50px`}))
            break;
          }
          res.push(h('div', {class: 'string'}, field.split('').map(char => h(Character, {class: 'char', char, loading: visible}))))
          break;
        case 'boolean':
          res.push(h('span', {}, `[${field ? 'X' : '_' }]`))
          break;
        case 'object':
          field && res.push(...Object.keys(field).map(key => {
            return this.renderFields(key, field[key], level + 1, loading, field)
          }))
          break;
        case 'block_hash':
          if (field !== 'undefined') {
            res.push(h(BlockHash, {blockHash: field, parent}))
          }
          break;
      }
      const elements = h('div', {
        class: `field_wrap field_wrap--${label} ${!visible ? 'field_wrap--loading' : ''} field_wrap--${level}`
      },
        [
          header,
          h('div',
            {class: `field field--${label} ${!visible ? 'field--loading' : ''} field--${level}`},
            res
          )
        ]
      )

      return elements
    }
  },
  render() {
    const observeVisibilityDirective = resolveDirective('observe-visibility')
    return withDirectives(
      this.renderFields(this.label, this.field, 0, this.loading),
      [
        [
          observeVisibilityDirective,
          {
            once: true,
            intersectionObserver: { threshold: 0.0 },
            throttle: 250,
            trottleOptions: { leading: 'visible' },
            callback: (val) => this.fieldVisibility = val
          }
        ]
      ]
    )
  }
}
