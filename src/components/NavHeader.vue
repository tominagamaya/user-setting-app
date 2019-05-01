<template>
  <div>
    <nav class="navbar navbar-expand-sm navbar-fixed-top navbar-dark bg-dark">
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav mr-auto">
          <font-awesome-icon icon="home" class="nav-icon nav-home-icon"></font-awesome-icon>
          <li class="nav-item" :class="setActive('list')">
            <router-link class="nav-link" to="/">ホーム</router-link>
          </li>
          <font-awesome-icon icon="cog" class="nav-icon"></font-awesome-icon>
          <li class="nav-item" :class="setActive('setting')">
            <router-link class="nav-link" to="/setting">設定</router-link>
          </li>
          <font-awesome-icon icon="question-circle" class="nav-icon"></font-awesome-icon>
          <li class="nav-item" :class="setActive('help')">
            <router-link class="nav-link" to="/help">お問い合わせ</router-link>
          </li>
        </ul>
        <ul class="navbar-nav navbar-right">
          <font-awesome-icon icon="sign-in-alt" class="nav-icon"></font-awesome-icon>
          <li class="nav-item" :class="setActive('login')">
            <!-- TODO link-->
            <span class="nav-link">ログイン</span>
            <!-- <router-link class="nav-link" to="/login">ログイン</router-link> -->
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  props: {
    baseName: String
  },
  methods: {
    setActive (item) {
      return this.baseName === item ? 'active' : ''
    }
  }
}
</script>

<style scoped>
li {
  margin-right: 20px;
  float: left;
}
.nav-icon {
  color: rgba(255, 255, 255, 0.5);
  margin-left: 20px;
  margin-top: 10px;
}
</style>
