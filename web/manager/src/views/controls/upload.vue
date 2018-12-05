<template>
  <el-upload class="avatar-uploader"
             :action="action"
             :show-file-list="false"
             :headers="headers"
             :on-success="handleAvatarSuccess"
             :before-upload="beforeAvatarUpload">
    <img v-if="image" :src="image" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>
<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'imageupload',
    data() {
      return {
        action: process.env.BASE_API + '/api/upload/images',
        image: undefined,
        headers: {
          Authorization: undefined,
          oauthid: undefined
        }
      }
    },
    props: ['value'],
    created() {
      this.headers.Authorization = this.token
      this.headers.oauthid = this.token
      this.image = this.value
    },
    methods: {
      handleAvatarSuccess(res) {
        this.imageUrl = process.env.BASE_API + res
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
          this.$message.error('上传图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
      }
    },
    computed: {
      ...mapGetters([
        'token'
      ]),
      imageUrl: {
        get() {
          return this.value
        },
        set(val) {
          this.image = val
          this.$emit('input', val)
          this.$emit('change', val)
        }
      }
    }
  }
</script>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
