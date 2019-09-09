<template>
    <li class="memo-item">
      <!-- 2. 등록된 props의 값을 각 DOM에 위치시킨다. -->
      <strong>{{ memo.title }}</strong>
      <p v-on:dblclick="handleDblClick">
        <template v-if="!isEditing">{{ memo.content }}</template>
        <input v-else
               type="text"
               ref="content"
               v-bind:value="memo.content"
               v-on:keydown.enter="updateMemo"
               v-on:blur="handleBlur"/>
      </p>
      <button type="button" v-on:click="deleteMemo">
        <i class="fas fa-times"></i>
      </button>
    </li>
</template>

<script>
    export default {
        name: "Memo",
        // 1. 부모에게 내려받은 props를 등록한다.
        // 부모에서 memos라는 배열이 여기로 들어오는거임
        // data(){
        //   return {
        //     isEditing: false
        //   }
        // } ,
        props: {
          memo: {
            type:Object
          },
          editingId: {
            type: Number
          }
        },
        computed: {
          isEditing() {
            return this.memo.id === this.editingId
          }
        },
        methods: {
          deleteMemo(){
            // 이렇듯 자식 컴포넌트에서 방출해주는 메소드는 실제 기능은 부모에게 위임하되 인자로 id나 payload등을 넘겨준다. add, update 다 마찬가지
            const id = this.memo.id;
            this.$emit("deleteMemo", id);
          },
          handleDblClick() {
            //this.isEditing=true;
            //console.log("handleDblClick => " + this.$refs.content);
            this.$emit("setEditingId", this.memo.id);
            this.$nextTick(()=>{
              this.$refs.content.focus();
            });
          },
          // 아래 updateMemo코드가 이해가 잘 안됨.. e.target.value.trim();
          updateMemo(e) {
            const id = this.memo.id;
            const content = e.target.value.trim();
            if (content.length <=0) {
              return false;
            }
            this.$emit("updateMemo", { id, content });
            //this.isEditing= false;
            this.$refs.content.blur();
          },
          handleBlur() {
            //this.isEditing=false;
            this.$emit("resetEditingId")
          }
        },
        beforeUpdate() {
          console.log("beforeUpdate => " + this.$refs.content)
        },
        updated() {
          console.log("updated => " + this.$refs.content)
        }
    }
</script>

<style scoped>
  .memo-item {
    overflow: hidden;
    position: relative;
    margin-bottom: 20px;
    padding: 24px;
    box-shadow: 0 4px 10px -4px rgba(0, 0, 0, 0.2);
    background-color: #fff;
    list-style: none;
  }
  .memo-item input[type="text"] {
    border: 1px solid #ececec;
    font-size: inherit;
  }
  .memo-item button {
    position: absolute;
    right: 20px;
    top: 20px;
    font-size: 20px;
    color: #e5e5e5;
    border: 0;
  }
  .memo-item strong {
    display: block;
    margin-bottom: 12px;
    font-size: 18px;
    font-weight: normal;
    word-break: break-all;
  }
  .memo-item p {
    margin: 0;
    font-size: 14px;
    line-height: 22px;
    color: #666;
  }
  .memo-item p input[type="text"] {
    box-sizing: border-box;
    width: 100%;
    font-size: inherit;
  }
  .memo-item p input[type="text"] {
    box-sizing: border-box;
    width: 100%;
    font-size: inherit;
  }
</style>
