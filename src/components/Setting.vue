<template>
  <div>
    <nav-header base-name="setting"></nav-header>
    <div class="setting-content">
      <div class="div-title">新規登録</div>
      <form class="form-content">
        <div class="form-group form-inline">
          <label class="control-label col-md-2 form-label">名前</label>
          <span class="badge badge-danger badge-icon">必須</span>
          <input type="text" class="form-control col-md-6" placeholder="Name...">
        </div>
        <div class="form-group form-inline">
          <label class="control-label col-md-2 form-label">メールアドレス</label>
          <span class="badge badge-danger badge-icon">必須</span>
          <input type="email" class="form-control col-md-6" placeholder="Email...">
        </div>
        <div class="form-group form-inline form-group-status">
          <label class="control-label col-md-2 form-label form-status">ステータス</label>
          <label>
            <input type="radio" class="form-check-input" name="status" value="able" checked>
            <label class="label-radio">有効</label>
          </label>
          <label>
            <input type="radio" class="form-check-input" name="status" value="disable">
            <label class="label-radio">無効</label>
          </label>
        </div>
      </form>
    </div>
    <div class="setting-footer">
      <input type="button" class="btn btn-success button-register" @click="register" value="登録">
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
      status: '1'
    }
  },
  methods: {
    async register () {
      // TODO API
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
.form-label {
  justify-content: left;
}
.badge-icon {
  margin: 0 10px;
}
.form-group-status {
  margin-top: 25px;
}
.form-status {
  margin-right: 55px;
}
.label-radio {
  width: 50px;
  margin-right: 15px;
}
.setting-footer {
  text-align: left;
  margin: 20px 0 0 18.7%;
}
.button-register {
  width: 140px;
  font-size: 15px;
}
input[type="radio"]:focus {
  outline: 0;
}
</style>