<template>
    <!-- 아래 형식이면 MemoApp의 자식이 MemoForm과 Memo 이다.-->
    <div class="memo-app">
      <memo-form v-on:addMemo="addMemo"/> <!-- v-on:addMemo 이렇게 커스텀하게 addMemo라고 할 수 있는건 MemoFrom에서 메소드 방출할 때 이름을 "addMemo"로 설정했기 때문이다. -->
      <ul class="memo-list">
        <memo v-for="memo in memos"
              v-bind:key="memo.id"
              v-bind:memo="memo"
              v-on:deleteMemo="deleteMemo"
              v-on:updateMemo="updateMemo"
              v-bind:editingId="editingId"
              v-on:setEditingId="SET_EDITING_ID"
              v-on:resetEditingId="RESET_EDITING_ID"/>
        <!-- 여기서 v-bind:memo 이렇게 커스텀하게 memo라고 할 수 있는건 Memo에서 data방출할 때 memo라는 객체를 만들었기 때문이다. -->
      </ul>
    </div>
</template>

<script>
    import MemoForm from "./MemoForm";
    import Memo from "./Memo";
    import { mapActions, mapState, mapMutations } from "vuex"
    import { SET_EDITING_ID, RESET_EDITING_ID} from "../store/mutations-types"

    // const memoAPICore = axios.create({
    //   baseURL: "http://localhost:8000/api/memos"
    // });
    export default {
      name: "MemoApp",
      components: {Memo, MemoForm},
      // data() {
      //   return { memos : [] }
      // },
      computed: {
        ...mapState([
          "memos",
          "editingId"
        ])
      },
      created() {
        // 만약 기존에 추가된 localStorage에 데이터가 있다면 created훅에서 localStorage의 데이터를 컴포넌트 내의 memos 데이터에
        // 넣어주고 그렇지 않다면 그대로 빈 배열로 초기화한다.
        // this.memos = localStorage.memos ? JSON.parse(localStorage.memos) : [];

        // memoAPICore.get("/")
        //   .then(res=> {
        //     this.memos = res.data;
        //   })

        this.fetchMemos();
      },
      methods: {
        ...mapMutations([
          SET_EDITING_ID,
          RESET_EDITING_ID
        ]),
        ...mapActions([
          "fetchMemos",
          "addMemo",
          "deleteMemo",
          "updateMemo"
        ]),

        // storeMemo() {
        //   const memosToString = JSON.stringify(this.memos);
        //   localStorage.setItem("memos", memosToString);
        // },
        // addMemo(payload) {   // 여기 payload는 MemoForm에서 emit한 두번째 인자 데이터
        //   //this.memos.push(payload);  // 그리고 여기서 memos 빈 배열
        //   //this.storeMemo();  // 여기선 페이로드를 삽입한 memos를 문자열로 변환해서 로컬스토리지에 저장한다.
        //
        //   memoAPICore.post("/", payload)
        //     .then(res=> {
        //       this.memos.push(res.data)
        //     });
        //
        // },
        // deleteMemo(id) {
        //   // const targetIndex = this.memos.findIndex(v => v.id === id);
        //   // this.memos.splice(targetIndex, 1);  // targetIndex의 인덱스에 있는 요소를 1개 삭제
        //   // this.storeMemo();
        //
        //   const targetIndex = this.memos.findIndex(v => v.id === id);
        //   memoAPICore.delete(`/${id}`)  // 이 부분이 db에서 삭제
        //     .then(()=>{
        //       this.memos.splice(targetIndex, 1);  // 이 부분이 프론트에서 보여줄 때 삭제
        //     })
        // },
        // updateMemo(payload) {
        //   // const { id, content } = payload;
        //   // const targetIndex = this.memos.findIndex(v => v.id === id);
        //   // const targetMemo = this.memos[targetIndex];
        //   // targetIndex의 인덱스에 있는 요소를 1개 삭제하고 {...targetMemo, content }를 추가
        //   // 여기서 {...targetMemo, content }는 객체 내부에 targetMemo내용을 갖고 있는 value를 content로 수정한다는 뜻이다.
        //   // this.memos.splice(targetIndex, 1, {...targetMemo, content });
        //   // this.storeMemo();
        //
        //   const { id, content } = payload;
        //   const targetIndex = this.memos.findIndex(v => v.id === id);
        //   const targetMemo = this.memos[targetIndex];
        //
        //   memoAPICore.put(`/${id}`, { content })
        //     .then(()=>{
        //       this.memos.splice(targetIndex, 1, {...targetMemo, content });
        //     })
        // }
      }
    }
</script>

<style scoped>
  .memo-list {
    padding: 20px 0;
    margin: 0;
  }
</style>
