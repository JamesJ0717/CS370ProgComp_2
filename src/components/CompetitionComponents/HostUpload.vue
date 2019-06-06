<template>
  <div id="upload">
    <input type="file" name="filetoupload">
  </div>
</template>

<script> require('dotenv').config()
export default {
    name: 'Upload',
    data() {
        return {
            fileName: ''
        }
    },
    methods: {
        upload() {
            let url = process.env.ENV_HOST + '/api/fileupload'
            this.$http
                .post(url, {
                    file: this.filetoupload
                })
                .then(response => {
                    console.log('Uploading ' + this.fileName)
                })
        }
    }
}
</script>
