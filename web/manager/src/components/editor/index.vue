<template>
  <div>
    <div ref="editor" style="text-align:left"></div>
  </div>
</template>

<script>
  import E from 'wangeditor'
  import { mapGetters } from 'vuex'

  export default {
    name: 'editor',
    data() {
      return {
        editor: undefined
      }
    },
    props: {
      value: {
        default: undefined
      }
    },
    mounted() {
      this.editor = new E(this.$refs.editor)
      this.editor.customConfig.uploadImgHeaders = {
        'Authorization': this.token,
        'oauthid': this.token
      }
      this.editor.customConfig.uploadImgMaxSize = 2 * 1024 * 1024
      this.editor.customConfig.uploadFileName = 'files'
      this.editor.customConfig.uploadImgMaxLength = 5
      this.editor.customConfig.menus = [
        'bold',
        'fontSize',
        'foreColor',
        'backColor', // 背景颜色
        'image', // 插入图片
        'undo', // 撤销
        'redo' // 重复
      ]
      this.editor.customConfig.uploadImgHooks = {
        customInsert(insert, result, editor) {
          result.forEach(i => {
            insert(process.env.BASE_API + i)
          })
        }
      }
      this.editor.customConfig.uploadImgServer = process.env.BASE_API + '/api/upload/editor'
      this.editor.customConfig.onchange = (html) => {
        this.$emit('input', html)
      }
      this.editor.create()
    },
    watch: {
      value: function (val) {
        this.editor.txt.html(val)
      }
    },
    computed: {
      ...mapGetters([
        'token'
      ])
    }
  }
</script>
