<template>
  <div id="update">
    <div v-if="comps.length !=  0">
      <h2>Here are your competitions.</h2>
      <div id="comps" v-for="(comp, index) in comps" :key="comp.name">
        <button id="comp" @click="openComp(index)">{{comp.id }}. {{comp.name}}</button>
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
            comps: []
        }
    },
    methods: {
        openComp(i) {
            let comp = this.comps
            if (comp) {
                this.$swal({
                    title: comp[i].name,
                    button: 'Change name',
                    button: 'Change dates',
                    button: 'Upload files'
                })
            }
        }
    },
    mounted() {
        let UID = JSON.parse(localStorage.getItem('user')).id
        let url = 'http://localhost:9999/getCompetitions/'
        this.$http.get(url).then(response => {
            if (response.data.reason === 'empty') {
                console.log('empty')
                return (this.comps.length = 0)
            }
            console.log(response.data)
            let comp = new Array(response.data.number)
            for (let i = 0; i < response.data.number; i++) {
                if (UID == response.data.data[i].creator) {
                    comp[i] = response.data.data[i]
                }
                this.comps = comp
            }
        })
    }
}
</script>
