import { h } from 'vue'

export default {
  props: {
    'char': {
      type: String,
      required: true,
      default: ' '
    }
  },
  data() {
    return {
      charCode: this.char.charCodeAt(0) + Math.floor(Math.random() * 512 - 256)
    }
  },
  methods: {
    update() {
      const d = this.char.charCodeAt(0) - this.charCode
      if (Math.abs(d) > 0) {
        this.charCode += Math.sign(d)
        requestAnimationFrame(() => {
          this.update()
        })
      }
    }
  },
  mounted() {
    requestAnimationFrame(() => {
      this.update()
    })
  },
  computed: {
    character() { return String.fromCharCode(this.charCode) }
  },
  render() {
    return h('span', {class: 'char'}, this.character)
  }
}
