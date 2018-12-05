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
  import { queryMembers } from '@/api/query'

  export default {
    name: 'memberQuery',
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
        default: '请输入 编号/手机号/姓名 进行搜索'
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
        queryMembers(query).then(response => {
          this.items = response.data
          if (isValueQuery && !this.items.some(i => i.Value === this.Value)) {
            this.$emit('input', undefined)
          }
          this.loading = false
        })
      }
    },
    created() {
      this.remoteMethod(' ')
    }
  }
</script>
