<template>
  <div id="update">
    <div v-if="comps.length !=  0">
      <h2>Here are your competitions.</h2>
      <div id="comps" v-for="(comp, index) in comps" :key="comp.name">
        <div v-if="comp.creator === userID">
          <button id="comp" @click="openComp(index)">{{comp.id }}. {{comp.name}}</button>
        </div>
      </div>
    </div>
    <div v-else>
      <p>You have not created any competitions.</p>
    </div>
  </div>
</template>
<script>
export default {
    data() {
        return {
            comps: [],
            evalName: '',
            genName: '',
            userID: JSON.parse(localStorage.getItem('user')).id
        }
    },
    methods: {
        openComp(i) {
            let comp = this.comps
            if (comp) {
                this.$swal
                    .mixin({
                        input: 'file',
                        confirmButtonText: 'Next &rarr;',
                        showCancelButton: true,
                        progressSteps: ['Gen', 'Eval']
                    })
                    .queue([
                        {
                            title: comp[i].name + ' Gen File',
                            text: 'Upload Gen File',
                            input: 'file',
                            inputValidator: file => {
                                if (file) {
                                    this.genName = file
                                }
                            }
                        },
                        {
                            title: comp[i].name + ' Eval File',
                            text: 'Upload Eval File',
                            input: 'file',
                            inputValidator: file => {
                                if (file) {
                                    this.evalName = file
                                }
                            }
                        }
                    ])
                    .then(result => {
                        let url = 'http://18.219.145.169:9999/fileupload/question'
                        let formData = new FormData()
                        formData.append('compName', this.comps[i].name)
                        formData.append('genfiletoupload', this.genName)
                        formData.append('evalfiletoupload', this.evalName)
                        this.$http
                            .post(url, formData, {
                                headers: {
                                    'Content-type': 'multipart/form-data'
                                }
                            })
                            .then(response => {
                                console.log(response)
                                switch (response.data.status) {
                                    case 200:
                                        this.$swal({
                                            type: 'success',
                                            text: response.data.message
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
                            })
                    })
            }
        }
    },
    mounted() {
        let UID = JSON.parse(localStorage.getItem('user')).id
        let url = 'http://18.219.145.169:9999/getCompetitions/'
        this.$http.get(url).then(response => {
            if (response.data.reason === 'empty') {
                console.log('empty')
                return (this.comps.length = 0)
            }
            console.log(response.data)
            let comp = new Array(response.data.number)
            for (let i = 0; i < response.data.number; i++) {
                // if (UID == response.data.data[i].creator) {
                comp[i] = response.data.data[i]
                // }
            }
            this.comps = comp
        })
    }
}
</script>

<style scoped>
#comp {
    width: 30%;
    height: 72px;
    background-color: antiquewhite;
    font-size: 20pt;
}
</style>
