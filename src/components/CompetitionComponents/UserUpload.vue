<template>
    <div id='upload'>
        <input type="file" name="filetoupload">
    </div>
</template>

<script>
export default {
    name: 'Upload',
    data() {
        return {
            fileName: ''
        }
    },
    methods: {
        upload() {
            let url = 'http://localhost:9999/fileupload'
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
