<template>
  <div id="ocr" @keyup.enter="onPaste">
    <el-row>
      <el-col :xs="24" :sm="12">
        <el-form label-width="120px">
          <el-form-item label="上传图片:">
            <el-upload
              ref="upload"
              class="upload"
              name="image"
              drag
              action="/api/ai/api/ocr/general/image"
              :data="extData"
              list-type="picture"
              accept=".jpg,.png"
              :auto-upload="false"
              :limit="1"
              :on-success="onSuccess"
              :on-error="onError"
              :before-upload="beforeUpload">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em>，或按下ctrl+v粘贴剪切板的图片</div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过1MB</div>
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
      <el-col :xs="24" :sm="12">
        <div class="ocr-result">
          <p
            v-for="(res, index) in ocrResult"
            :key="res.words + index"
            :class="getProbability(res.probability.average)"
          >
            <el-tooltip effect="dark" placement="top-start">
              <div slot="content" v-html="getProbabilityTip(res.probability)"></div>
              <div class="probability-tip"></div>
            </el-tooltip>
            {{res.words}}
          </p>
          <img :src="ocrResultFileUrl" />
        </div>
        <div class="translate-result" v-if="ocrResult && ocrResult.length > 0">
          <el-button size="small" type="primary" @click="onTranslate">翻译</el-button>
          <div>{{translateResult}}</div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
const translate = require('google-translate-api-without-node')

const isPasteImage = function (items) {
  let i = 0
  let item
  while (i < items.length) {
    item = items[i]
    if (item.type.indexOf('image') !== -1) {
      return item
    }
    i++
  }
  return false
}

export default {
  name: 'AIOcr',
  mounted () {
    console.log('挂载粘贴事件监听')
    window.addEventListener('paste', this.onPaste)
  },
  destroyed () {
    console.log('销毁粘贴事件监听')
    window.removeEventListener('paste', this.onPaste)
  },
  data () {
    return {
      languageType: 'CHN_ENG', // 识别语言类型
      detectDirection: false,
      detectLanguage: true,
      probability: true,
      ocrResult: [],
      ocrResultFileUrl: '',
      isUploading: false,
      translateResult: ''
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
    onPaste (e) {
      if (e.clipboardData && e.clipboardData.items) {
        let image = isPasteImage(e.clipboardData.items)
        if (image) {
          // 上传图片
          e.preventDefault()
          let rawFile = image.getAsFile()
          const uploadEl = this.$refs.upload
          rawFile.uid = Date.now() + uploadEl.tempIndex++
          let file = {
            status: 'ready',
            name: rawFile.name,
            size: rawFile.size,
            percentage: 0,
            uid: rawFile.uid,
            raw: rawFile
          }
          try {
            file.url = URL.createObjectURL(rawFile)
          } catch (err) {
            console.error(err)
            return
          }
          uploadEl.clearFiles()
          uploadEl.uploadFiles.push(file)
          uploadEl.onChange(file, uploadEl.uploadFiles)
        }
      }
    },
    onSubmitOCR () {
      if (!this.isUploading) {
        console.log('上传图片')
        this.$refs.upload.submit()
        this.isUploading = true
      }
    },
    beforeUpload (file) {
      if (file.size > 1 * 1024 * 1024) {
        // 大于1m
        this.$message.error('上传图片大小不能超过 1MB!')
        return false
      }
      if (['image/png', 'image/jpeg'].indexOf(file.type) === -1) {
        // 大于1m
        this.$message.error('上传图片格式不正确!')
        return false
      }
      return true
    },
    onSuccess (response, file, fileList) {
      this.isUploading = false
      if (response.result) {
        this.$refs.upload.clearFiles() // 清理文件列表
        this.ocrResult = response.data.words_result
        this.ocrResultFileUrl = file.url
      }
    },
    onError (err, file, fileList) {
      this.isUploading = false
      console.log(err)
      this.$alert(JSON.stringify(err), '解析错误')
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
    },
    getProbabilityTip (allProbabilityData) {
      return `平均值:${allProbabilityData.average}<br />最小值:${allProbabilityData.min}<br />方差:${allProbabilityData.variance}`
    },
    onTranslate () {
      let words = this.ocrResult.map(x => x.words)
      words = words.join('\n')
      translate(words, {to: 'zh-cn'}).then(res => {
        console.log('translate result', words, res)
        this.translateResult = res.text
      }).catch(err => {
        this.translateResult = err
      })
    }
  }
}
</script>

<style lang="scss">
#ocr {
  padding: 20px 10px 0;
  text-align: left;

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
      position: relative;
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

      .probability-tip {
        position: absolute;
        left: -3px;
        height: 100%;
        width: 10px;
        background-color: transparent;
        outline: 0;
      }
    }

    img {
      max-width: 100%;
    }
  }
}
</style>
