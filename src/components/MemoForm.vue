<template>
  <div class="memo-form">
    <form v-on:submit.prevent="addMemo"> <!-- form의 submit 이벤트가 발생하면 이벤트의 기본동작(새로운 페이지를 리로드하는 동작)을 방지하고 addMemo함수가 콜백으로 실행된다. -->
      <fieldset>
        <div>
          <input class="memo-form__title-form"
                 type="text"
                 v-model="title"
                 placeholder="메모의 제목을 입력해주세요."/>
          <textarea class="memo-form__content-form"
                    v-model="content"
                    placeholder="메모의 내용을 입력해주세요."></textarea>
          <button type="reset"><i class="fas fa-sync-alt"></i></button>
        </div>
        <button type="submit">등록하기</button>
      </fieldset>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'MemoForm',
    data(){
      return {
        title: "",
        content: ""
      }
    },
    methods: {
      resetFields() {
        this.content="";
        this.title="";
      },
      addMemo() {
        const { title, content } = this;  // 여기의 this는 위의 data
        //const id = new Date().getTime(); // 서버에서 테이블 pk인 id를 받아오므로 더이상 클라이언트에서 id만들어줄 필요없음.

        // 방어 코드
        const isEmpty = title.length <=0 || content.length <=0;
        if (isEmpty) {
          return false;
        }

        // addMemo 이벤트를 발생시키고 payload로 사용자가 입력한 데이터를 넣어준다.
        // 입력한 제목, 데이터를 부모 컴포넌트인 MemoApp 컴포넌트에 emit을 이용하여 전파한다.
        // 결국 MemoForm에서의 addMemo함수의 역할은 사용자가 등록한 제목과 내용을 부모 컴포넌트에게 전파해주는 것에서 끝난다.
        this.$emit("addMemo", { title, content });
        this.resetFields();
      }
    }
  }
</script>

<style scoped>
  .memo-form {
    margin-bottom: 24px;
    padding-bottom: 40px;
    border-bottom: 1px solid #eee;
  }
  .memo-form form fieldset div {
    position: relative;
    padding: 24px;
    margin-bottom: 20px;
    box-shadow: 0 4px 10px -4px rgba(0, 0, 0, 0.2);
    background-color: #ffffff;
  }
  .memo-form form fieldset div button[type="reset"] {
    position: absolute;
    right: 20px;
    bottom: 20px;
    font-size: 16px;
    background: none;
  }
  .memo-form form fieldset button[type="submit"] {
    float: right;
    width: 96px;
    padding: 12px 0;
    border-radius: 4px;
    background-color: #ff5a00;
    color: #fff;
    font-size: 16px;
  }
  .memo-form form fieldset .memo-form__title-form {
    width: 100%;
    margin-bottom: 12px;
    font-size: 18px;
    line-height: 26px;
  }
  .memo-form form fieldset .memo-form__content-form {
    width: 100%;
    height: 66px;
    font-size: 14px;
    line-height: 22px;
    vertical-align: top;
  }
  .memo-form input:focus {
    outline: none;
  }
</style>
