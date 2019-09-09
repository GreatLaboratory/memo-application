<template>
  <div id="app">
    <app-header/>  <!-- 컴포넌트가 AppHeader이었는데 app-header이라고 등록해도 자동 렌더링해서 잘 매칭시켜준다. -->
    <memo-app />
  </div>
</template>

<script>
import AppHeader from "./components/AppHeader";
import MemoApp from "./components/MemoApp";
export default {
  name: 'app',
  components: {MemoApp, AppHeader},  // 이렇게 컴포넌트로 등록이 되면 template영역에서 커스텀 엘리먼트로 사용 가능하다. <app-header/>, <memo-app />
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style>
  @import "./styles/reset.css";
  #app {
    width: 560px;
    margin: 0 auto;
  }
</style>
