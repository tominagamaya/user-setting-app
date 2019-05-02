<template>
  <div>
    <nav-header base-name="help"></nav-header>
    <div class="setting-content">
      <div class="div-title">お問い合わせ</div>
      <form class="form-content">
        <div class="form-group form-inline">
          <label class="control-label col-md-2 form-label">名前</label>
          <span class="badge badge-danger badge-icon">必須</span>
          <div class="control-label col-md-9">
            <input type="text" class="form-control input-text-form" name="name" data-vv-as="名前" placeholder="Name..."
                   v-model="name" v-validate="'required|max:100'" :class="{'input': true, 'is-danger': errors.has('name')}">
            <div class="auto-setting-alert-div">
              <p v-show="errors.has('name')" class="auto-setting-alert">{{ errors.first('name') }}</p>
            </div>
          </div>
        </div>
        <div class="form-group form-inline">
          <label class="control-label col-md-2 form-label">メールアドレス</label>
          <span class="badge badge-danger badge-icon">必須</span>
          <div class="control-label col-md-9">
            <input type="text" class="form-control input-text-form" name="mailadress" data-vv-as="メールアドレス" placeholder="Email..."
                   v-model="mail" v-validate="'required|email|max:100'" :class="{'input': true, 'is-danger': errors.has('mailadress')}">
            <div class="auto-setting-alert-div">
              <p v-show="errors.has('mailadress')" class="auto-setting-alert">{{ errors.first('mailadress') }}</p>
            </div>
          </div>
        </div>
        <div class="form-group form-inline">
          <label class="control-label col-md-2 form-label">お問い合わせ内容</label>
          <span class="badge badge-danger badge-icon">必須</span>
          <div class="control-label col-md-9">
            <textarea class="form-control input-text-form" rows='5' placeholder="Help..." name="helpText" data-vv-as="お問い合わせ内容"
              v-model="helpText" v-validate="'required|max:1000'" :class="{'textarea': true, 'is-danger': errors.has('helpText')}">
            </textarea>
            <div class="auto-setting-alert-div">
              <p v-show="errors.has('helpText')" class="auto-setting-alert">{{ errors.first('helpText') }}</p>
            </div>
          </div>
        </div>
      </form>
    </div>
    <div class="setting-footer">
      <input type="button" class="btn btn-success button-send" @click="send" value="送信">
    </div>
  </div>
</template>

<script>
import NavHeader from './NavHeader'
export default {
  components: {
    NavHeader
  },
  data () {
    return {
      name: '',
      mail: '',
      helpText: ''
    }
  },
  methods: {
    async send () {
      if (await this.isExistErrors()) {
        return
      }
      this.$bvModal.msgBoxOk('問い合わせ内容を送信しました', {
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'success',
        headerClass: 'p-2 border-bottom-0',
        footerClass: 'p-2 border-top-0',
        centered: true
      })
      // TODO API
    },
    async isExistErrors () {
      let isError = false
      await this.$validator.validate().then(valid => {
        if (!valid) {
          isError = true
        }
      })
      return isError
    }
  }
}
</script>

<style scoped>
.div-title {
  padding: 0.25em 0.5em;
  color: #494949;
  background: transparent;
  border-left: solid 5px #aaa;
}
.setting-content {
  width: 70%;
  display: inline-block;
  padding: 0.5em 1em;
  margin: 30px 80px 50px 30px;
  background: #FFF;
  border: solid 0 #aaa;
  border-radius: 2px;
  box-shadow: 2px 2px 2px 2px #cccccc;
}
.form-content {
  font-size: 14px;
  margin: 30px 80px 50px 30px;
}
.input-text-form {
  min-width: 60%;
}
.form-label {
  justify-content: left;
}
.badge-icon {
  margin: 0 10px;
}
.setting-footer {
  text-align: left;
  margin: 20px 0 0 20%;
}
.button-send {
  width: 140px;
  font-size: 15px;
}
.auto-setting-alert {
  color: red;
  font-size: 12px;
  margin-bottom: 0;
}
.auto-setting-alert-div {
  height: 1px;
}
</style>