import { h } from 'vue'
import { useI18n } from 'vue-i18n'
import QrcodeVue from 'qrcode.vue'

const renderFields = (label, field, level) => {
  const { t } = useI18n()
  level = level || 0
  field = field || 'undefined'
  const type = typeof field
  const header = h(`h${2 + level}`, {}, t(label))
  const res = [
  ]
  switch (type) {
    case 'string':
      if (label.indexOf('img') >= 0 || label.indexOf('image') == 0 && label.indexOf('original') < 0) {
        res.push(h('img', {width: 150, height: 150, src: field}))
        break;
      } else if (field.indexOf('http') == 0 || label == 'address') {
        const href = label == 'address' ? `https://etherscan.io/address/${field}` : field
        res.push(h('a',
          {href, target: '_blank'},
          h(QrcodeVue, {style: 'width: 150px; height: 150px;', value: href})))
        break;
      } else if (label.indexOf('color') >= 0) {
        res.push(h('div', {style: `background: #${field}; width: 50px; height: 50px`}))
        break;
      }
      res.push(h('span', {}, field))
      break;
    case 'number':
      res.push(h('span', {}, String(field)))
      break;
    case 'boolean':
      res.push(h('span', {}, `[${field ? 'X' : '_' }]`))
      break;
    case 'object':
      field && res.push(...Object.keys(field).map(key => {
        return renderFields(key, field[key], level + 1)
      }))
      break;
  }
  return h('div', {class: 'field_wrap'}, [header, h('div', {class: `field field--${level}`}, res)])
}

export default {
  name: 'Field',
  components: {QrcodeVue},
  props: {
    'field': {
      required: true
    },
    'label': {
      type: String,
      required: true 
    }
  },
  render() {
    return renderFields(this.label, this.field)
  }
}
