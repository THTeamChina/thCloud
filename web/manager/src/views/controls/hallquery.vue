<template>
  <el-select v-model="selected"
             clearable
             :filterable="true"
             remote
             reserve-keyword
             :placeholder="placeholder"
             :remote-method="remoteMethod"
             :loading="loading">
    <el-option v-for="item in items"
               :key="item.Value"
               :label="item.Text"
               :value="item.Value">
    </el-option>
  </el-select>
</template>
<script>
  import { queryHall } from '@/api/query'

  export default {
    name: 'memberHall',
    data() {
      return {
        key: undefined,
        items: [],
        loading: false,
        valueQuery: false
      }
    },
    props: {
      value: {
        default: undefined
      },
      filter: {
        default: undefined
      },
      placeholder: {
        default: '请输入大厅名称'
      }
    },
    watch: {
      filter(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.$emit('input', undefined)
          this.remoteMethod(' ')
        }
      }
    },
    computed: {
      selected: {
        get() {
          if (!this.items.some(i => i.key === this.value) && this.value) {
            this.remoteMethod(this.value, true)
          }
          return this.value
        },
        set(newVal) {
          this.$emit('input', newVal)
        }
      }
    },
    methods: {
      remoteMethod(query, isValueQuery) {
        if (this.loading) {
          return
        }
        this.loading = true
        if (isValueQuery) {
          var item = this.items.filter(i => i.Value === query)
          if (item.length === 1) {
            this.$emit('input', item[0].Value)
            this.loading = false
            return
          }
        }
        queryHall(query).then(response => {
          this.items = response.data
          if (isValueQuery && !this.items.some(i => i.Value === this.Value)) {
            this.$emit('input', undefined)
          }
          this.loading = false
        })
      }
    },
    mounted() {
      this.remoteMethod()
    },
    created() {
      this.remoteMethod()
    }
  }
</script>
