<template>
  <div id="competition" onload="getComps()">
    <p>Here are the competitions.</p>
    <div id="comps" v-if="comps.length != 0">
      <div v-for="(comp, index) in comps" v-bind:key="comp.name">
        <button id="comp" @click="openComp(index)">{{comp.id}}. {{comp.name}}</button>
        <p></p>
      </div>
    </div>
    <div id="empty" v-else>
      <p>There are no active competitions.</p>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            name: '',
            comps: []
        }
    },
    methods: {
        results(response) {
            switch (response.data.status) {
                case 200:
                    this.$swal({
                        type: 'success',
                        text: response.data.message + '\n' + response.data.score
                    })
                    break
                case 400:
                    this.$swal({
                        type: 'error',
                        text: response.data.message
                    })
                    break
                case 401:
                    this.$swal({
                        type: 'error',
                        text: response.data.message
                    })
                    break
                case 404:
                    this.$swal({
                        type: 'error',
                        text: response.data.message
                    })
                    break
                case 500:
                    this.$swal({
                        type: 'error',
                        text: response.data.message
                    })
                    break
                default:
                    break
            }
        },
        openComp(i) {
            let comp = this.comps
            let response = ''
            if (comp) {
                this.$swal({
                    title: this.comps[i].name,
                    text: this.comps[i].question,
                    input: 'file',
                    showCancelButton: true,
                    footer:
                        '<strong>Starts</strong>: ' +
                        this.comps[i].start +
                        '&nbsp; --> &nbsp;' +
                        '<strong>Ends</strong>: ' +
                        this.comps[i].end,
                    inputValidator: file => {
                        if (file) {
                            let name = JSON.stringify(file.name)
                            let url =
                                'https://api-opcs.jamesjohnson.io/fileupload'
                            let formData = new FormData()
                            formData.append('filetoupload', file)
                            formData.append('compName', this.comps[i].name)
                            formData.append('compId', this.comps[i].id)
                            formData.append(
                                'userName',
                                JSON.parse(localStorage.getItem('user')).name
                            )
                            this.$http
                                .post(url, formData, {
                                    headers: {
                                        'Content-type': 'multipart/form-data'
                                    }
                                })
                                .then(response => {
                                    console.log(response)
                                    this.results(response)
                                })
                        }
                        this.$swal({
                            position: 'bottom-end',
                            toast: true,
                            timer: 5000,
                            text: 'Running your code...'
                        })
                    }
                })
            }
        }
    },
    mounted() {
        let url = 'https://api-opcs.jamesjohnson.io/getCompetitions/'
        this.$http.get(url).then(response => {
            if (response.data.cause === 'empty') {
                return (this.comps.length = 0)
            }
            console.log(response)
            let comps = new Array(response.data.number)
            for (let i = 0; i < response.data.number; i++) {
                comps[i] = response.data.data[i]
            }
            this.comps = comps
        })
    }
}
</script>

<style scoped>
#comp {
    width: 30%;
    height: 35px;
    background-color: aqua;
    font-size: 18pt;
}
</style>


