import ButtonGroup from '~mixins/button-group'

export default {
  name: 'v-btn-toggle',

  model: {
    prop: 'inputValue',
    event: 'change'
  },

  mixins: [ButtonGroup],

  props: {
    inputValue: {
      required: false
    },
    items: {
      type: Array,
      default: null
    },
    mandatory: Boolean,
    multiple: Boolean
  },

  computed: {
    classes () {
      return {
        'btn-toggle': true,
        'btn-toggle--selected': this.inputValue &&
          (!this.multiple || this.inputValue.length)
      }
    }
  },

  watch: {
    inputValue: {
      handler () {
        this.update()
      },
      deep: true
    }
  },

  methods: {
    isSelected (i) {
      const item = this.getValue(i)
      if (!this.multiple) {
        return this.inputValue === item
      }

      return this.inputValue.includes(item)
    },
    updateValue (i) {
      const item = this.getValue(i)
      if (!this.multiple) {
        if (this.mandatory && this.inputValue === item) return
        return this.$emit('change', this.inputValue === item ? null : item)
      }

      const items = this.inputValue.slice()

      const index = items.indexOf(item)
      if (index > -1) {
        items.length >= 1 && !this.mandatory && items.splice(index, 1)
      } else {
        items.push(item)
      }

      this.$emit('change', items)
    }
  },

  mounted () {
    if (this.items) {
      console.warn('The \'items\' props has been deprecated. v-btn-toggle now has a default slot where you can place buttons.')
      return
    }
  },

  render (h) {
    return h('div', { class: this.classes }, this.$slots.default)
  }
}
