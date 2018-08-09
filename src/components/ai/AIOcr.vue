<template>
  <div id="ocr">
    <el-row>
      <el-col :span="12">
        <el-form label-width="120px">
          <el-form-item label="上传图片:">
            <el-upload
              ref="upload"
              class="upload"
              name="image"
              drag
              action="/ai/api/ocr/general/image"
              :data="extData"
              list-type="picture"
              :auto-upload="false"
              :limit="1"
              :on-success="onSuccess"
              :on-error="onError">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em>，或按下ctrl+v粘贴剪切板的图片</div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="识别语言:">
            <el-select v-model="languageType" placeholder="识别语言类型">
              <el-option label="中英文混合" value="CHN_ENG"></el-option>
              <el-option label="英文" value="ENG"></el-option>
              <el-option label="葡萄牙语" value="POR"></el-option>
              <el-option label="法语" value="FRE"></el-option>
              <el-option label="德语" value="GER"></el-option>
              <el-option label="意大利语" value="ITA"></el-option>
              <el-option label="西班牙语" value="SPA"></el-option>
              <el-option label="俄语" value="RUS"></el-option>
              <el-option label="日语" value="JAP"></el-option>
              <el-option label="韩语" value="KOR"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="进阶参数:">
            <el-checkbox label="检测朝向" v-model="detectDirection" disabled></el-checkbox>
            <el-checkbox label="检测语言" v-model="detectLanguage" disabled></el-checkbox>
            <el-checkbox label="返回置信度" v-model="probability" disabled></el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" @click="onSubmitOCR">图像识别</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="12">
        <div class="ocr-result">
          <p
            v-for="(res, index) in ocrResult"
            :key="res.words + index"
            :class="getProbability(res.probability.average)"
          >{{res.words}}</p>
          <img :src="ocrResultFileUrl" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import config from '../../config'

export default {
  name: 'AIOcr',
  data () {
    return {
      languageType: 'CHN_ENG', // 识别语言类型
      detectDirection: false,
      detectLanguage: true,
      probability: true,
      apiurl: config.apiurl,
      ocrResult: [],
      ocrResultFileUrl: '',
      isUploading: false
    }
  },
  computed: {
    extData () {
      return {
        language_type: this.languageType,
        detect_direction: this.detectDirection,
        detect_language: this.detectLanguage,
        probability: this.probability
      }
    }
  },
  methods: {
    onSubmitOCR () {
      if (!this.isUploading) {
        console.log('上传图片')
        this.$refs.upload.submit()
        this.isUploading = true
      }
    },
    onSuccess (response, file, fileList) {
      this.isUploading = false
      if (response.result) {
        this.ocrResult = response.data.words_result
        this.ocrResultFileUrl = file.url
      }
    },
    onError (err, file, fileList) {
      this.isUploading = false
      console.log(err)
    },
    getProbability (probability) {
      if (probability > 0.95) {
        return 'top'
      } else if (probability > 0.9) {
        return 'high'
      } else if (probability > 0.8) {
        return 'middle'
      } else if (probability > 0.7) {
        return 'low'
      } else {
        return 'bottom'
      }
    }
  }
}
</script>

<style lang="scss">
#ocr {
  padding: 20px 10px 0;
  // text-align: center;

  .upload {
    margin-bottom: 10px;
    display: inline-block;
    line-height: initial;

    .el-upload-dragger {
      padding: 0 10px;
    }
  }

  .ocr-result {
    p {
      margin: 0;
      margin-bottom: 10px;
      border-left: 3px solid transparent;
      line-height: 1.5em;
      padding-left: 6px;
      border-top: 1px solid rgba(0, 0, 0, 0.1);
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;

      &.top {
        border-left-color: green;
      }
      &.high {
        border-left-color: greenyellow;
      }
      &.middle {
        border-left-color: yellow;
      }
      &.low {
        border-left-color: orange;
      }
      &.bottom {
        border-left-color: orangered;
      }
    }

    img {
      max-width: 100%;
    }
  }
}
</style>
