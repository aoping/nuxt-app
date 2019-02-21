<template>
  <section class="container">
    <div class="quill-editor"
         :content="content"
         @change="onEditorChange($event)"
         v-quill:myQuillEditor="editorOption">
    </div>
    <a-button type="primary" @click="submit">提交</a-button>
  </section>
</template>

<script>
  export default {
    data () {
      return {
        content: '<p>I am Example</p>',
        editorOption: {

        }
      }
    },
    mounted() {
      console.log('app init, my quill insrance object is:', this.myQuillEditor)
      setTimeout(() => {
        this.content = 'i am changed'
      }, 3000)
    },
    methods: {
      onEditorChange({ editor, html, text }) {
        console.log('editor change!', editor, html, text)
        this.content = html
      },
      submit() {
        console.log('this.content')
        console.log(this.content)
      }
    }
  }
</script>

<style scoped>
  .container {
    width: 60%;
    margin: 0 auto;
    padding: 50px 0;
  }
  .quill-editor {
    min-height: 200px;
    max-height: 400px;
    overflow-y: auto;
  }
</style>
