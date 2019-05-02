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
          <tr v-for="value in userList" :key="value.id">
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
              <font-awesome-icon icon="edit" class="icon-edit"></font-awesome-icon>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import NavHeader from './NavHeader'
export default {
  components: {
    NavHeader
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
      ]
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
@media screen and (min-width: 1300px) {
  table th {
    word-break: keep-all;
  }
}
</style>