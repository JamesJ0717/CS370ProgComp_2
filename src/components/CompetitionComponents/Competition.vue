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
        async openComp(i) {
            let comp = this.comps
            if (comp) {
                this.$swal({
                    title: this.comps[i].name,
                    text: this.comps[i].question,
                    input: 'file',
                    inputValidator: file => {
                        let name = JSON.stringify(file.name)
                        let ext = name
                            .trim()
                            .split('.')
                            .slice(1)
                        if (file) {
                            console.log(ext)
                        } else {
                        }
                    },
                    footer:
                        '<strong>Starts</strong>: ' +
                        this.comps[i].start +
                        '&nbsp; --> &nbsp;' +
                        '<strong>Ends</strong>: ' +
                        this.comps[i].end
                })
            }
        }
    },
    mounted() {
        let url = 'http://localhost:9999/getCompetitions/'
        this.$http.get(url).then(response => {
            if (response.data.cause === 'empty') {
                return (this.comps.length = 0)
            }
            console.log(response.data)
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


