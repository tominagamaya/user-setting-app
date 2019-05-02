<template>
  <div>
    <nav-header base-name="list"></nav-header>
    <div class="list-content">
      <div class="div-title">ユーザー管理</div>
      <div class="table-content">
        <form class="form-inline form-search">
          <input type="text" class="form-control" v-model="keyword" placeholder="name or mail...">
          <font-awesome-icon icon="search" class="icon-search"></font-awesome-icon>
        </form>
        <table class="table table-hover">
          <thead>
          <tr>
            <th class="th-checkbox"></th>
            <th>名前</th>
            <th>メールアドレス</th>
            <th class="th-date">登録日</th>
            <th></th>
            <th class="th-edit"></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="value in filteredUsers" :key="value.id">
            <td><input type="checkbox"></td>
            <td>{{ value.name }}</td>
            <td>{{ value.mail }}</td>
            <td>{{ value.date }}</td>
            <td class="td-icon" v-if="value.status === '1'">
              <span class="badge badge-success">{{ getStatus(value.status) }}</span>
            </td>
            <td class="td-icon" v-else>
              <span class="badge badge-secondary">{{ getStatus(value.status) }}</span>
            </td>
            <td class="td-icon">
              <font-awesome-icon v-b-modal.edit-modal icon="edit" class="icon-edit" @click="setEditId(value.id)"></font-awesome-icon>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <b-modal
      id="edit-modal"
      ref="modal"
      @show="initModal">
      <template slot="modal-header">
        <div class="div-title">ユーザー情報編集</div>
      </template>
      <form class="form-content">
        <div class="form-group form-inline">
          <label class="control-label col-md-3 form-label">名前</label>
          <div class="control-label col-md-9">
            <input type="text" class="form-control input-text-form" name="name" data-vv-as="名前"
                   v-model="editName" v-validate="'required|max:100'" :class="{'input': true, 'is-danger': errors.has('name')}">
            <div class="auto-setting-alert-div">
              <p v-show="errors.has('name')" class="auto-setting-alert">{{ errors.first('name') }}</p>
            </div>
          </div>
        </div>
        <div class="form-group form-inline">
          <label class="control-label col-md-3 form-label">メールアドレス</label>
          <div class="control-label col-md-9">
            <input type="text" class="form-control input-text-form" name="mailadress" data-vv-as="メールアドレス"
                   v-model="editMail" v-validate="'required|email|max:100'" :class="{'input': true, 'is-danger': errors.has('mailadress')}">
            <div class="auto-setting-alert-div">
              <p v-show="errors.has('mailadress')" class="auto-setting-alert">{{ errors.first('mailadress') }}</p>
            </div>
          </div>
        </div>
        <div class="form-group form-inline form-group-status">
          <label class="control-label col-md-3 form-label">ステータス</label>
          <label class="radio-label">
            <input type="radio" class="form-check-input" name="editStatus" value="1" v-model="editStatus" checked>
            <label class="label-radio">有効</label>
          </label>
          <label class="radio-label">
            <input type="radio" class="form-check-input" name="editStatus" value="2" v-model="editStatus">
            <label class="label-radio">無効</label>
          </label>
        </div>
      </form>
      <template slot="modal-footer">
        <b-button size="sm" class="modal-button" variant="outline-secondary" @click="cancelModal">取消</b-button>
        <b-button size="sm" class="modal-button" variant="success" @click="updateModal">更新</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios'
import NavHeader from './NavHeader'
export default {
  components: {
    NavHeader
  },
  computed: {
    filteredUsers () {
      let users = []
      for (let i in this.userList) {
        if (this.isExistKeyword(this.userList[i].name) || this.isExistKeyword(this.userList[i].mail)) {
          users.push(this.userList[i])
        }
      }
      return users
    }
  },
  data () {
    return {
      keyword: '',
      userList: [],
      columns: [
        'date',
        'name',
        'status',
        'mail'
      ],
      status: [
        {key: '1', name: '有効'},
        {key: '2', name: '無効'}
      ],
      editId: 0,
      editName: '',
      editMail: '',
      editStatus: ''
    }
  },
  methods: {
    getList () {
      const path = 'http://127.0.0.1:5000/list'
      axios.get(path)
        .then(res => {
          this.userList = res.data
        })
        .catch(error => {
          // eslint-disable-next-line
          console.log(error)
        })
    },
    getStatus (value) {
      let status = this.status.find(i => i.key === value)
      return status ? status.name : null
    },
    setEditId(index) {
      this.editId = index
    },
    initModal() {
      const editUser = this.userList.filter(u => u.id === this.editId)
      if (editUser.length === 0) {
        return
      }
      this.editName = editUser[0].name
      this.editMail = editUser[0].mail
      this.editStatus = editUser[0].status
    },
    cancelModal() {
      this.$refs.modal.hide()
    },
    async updateModal() {
      if (await this.isExistErrors()) {
        return
      }
      this.name = this.editName
      this.mail = this.editMail
      this.status = this.editStatus
      this.$refs.modal.hide()
    },
    async isExistErrors () {
      let isError = false
      await this.$validator.validate().then(valid => {
        if (!valid) {
          isError = true
        }
      })
      return isError
    },
    isExistKeyword (value) {
      return value.indexOf(this.keyword) !== -1
    }
  },
  created () {
    this.getList()
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
.list-content {
  margin: 30px 80px 50px 30px;
  display: inline-block;
  padding: 0.5em 1em;
  background: #FFF;
  border: solid 0 #aaa;
  border-radius: 2px;
  box-shadow: 2px 2px 2px 2px #cccccc;
}
.form-search {
  margin-bottom: 10px;
}
.icon-search {
  margin-left: 10px;
}
.icon-edit {
  color: #aaa;
}
.table-content {
  margin: 40px 5% 50px 5%;
}
table {
  margin: auto;
  font-size: 15px;
  table-layout: fixed;
}
th {
  background: #f4f4f4;
}
td {
  border-bottom: solid 1px #dee2e6;
  padding: 15px;
  line-height: 15px;
  min-width: 50px;
  word-break: break-all;
}
.th-date {
  width: 180px;
}
.th-checkbox {
  width: 60px;
}
.th-status {
  width: 150px;
}
.th-edit {
  width: 100px;
}
.td-icon {
  text-align: center;
}
.input-text-form {
  min-width: 100%;
}
.radio-label {
  padding-left: 18px;
  font-size: 14px;
}
.form-label {
  justify-content: left;
  font-size: 14px;
  padding-right: 0;
}
.auto-setting-alert {
  color: red;
  font-size: 12px;
  margin-bottom: 0;
}
.auto-setting-alert-div {
  height: 1px;
}
.form-group-status {
  margin-top: 25px;
}
.edit-modal {
  font-size: 10px;
}
.div-title {
  padding: 0.25em 0.5em;
  color: #494949;
  background: transparent;
  border-left: solid 5px #aaa;
}
.modal-button {
  width: 80px;
}
@media screen and (min-width: 1300px) {
  table th {
    word-break: keep-all;
  }
}
</style>