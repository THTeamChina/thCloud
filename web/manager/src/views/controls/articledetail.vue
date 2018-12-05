<template>
  <div>
    <el-dialog title="通知公告" :visible="dialogVisible" @update:visible="val => dialogVisible = val" @open="fetchData" :fullscreen="equip">
      <div style="min-height:200px" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
        <div v-if="detail">
          <h2>{{detail.Title}}</h2>
          <div class="time">发布时间：{{detail.Created|parseTime}}</div>

          <div class="content " v-html="detail.Content" />
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import { getDetail } from '@/api/article'

  export default {
    name: 'articledetail',
    props: {
      id: {
        type: Number,
        default: 0
      },
      visible: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      dialogVisible: {
        get() {
          return this.visible
        },
        set(newVal) {
          this.$emit('update:visible', newVal)
        }
      }
    },
    data() {
      return {
        detail: undefined,
        loading: false,
        equip: !!navigator.userAgent.toLocaleLowerCase().match(/ipad|mobile/i)
      }
    },
    methods: {
      fetchData() {
        this.detail = undefined
        if (this.loading) {
          return
        }
        this.loading = true
        getDetail(this.id).then(res => {
          this.detail = res.data
          this.detail.Content = this.detail.Content.replace(/\r\n/g, '<br>')
          this.detail.Content = this.detail.Content.replace(/\n/g, '<br>')
          this.loading = false
        })
      }
    }
  }
</script>
<style scoped>


  h2 {
    margin: 0;
    padding: 0 0 10px;
    text-align:center
  }

  .content{
    padding:0 20px;
  }

  .time {
    color: #9c9c9c;
    text-align:center;
    left: 40px;
  }

</style>
