<template>
  <div id="leaderboard">
    <div id="scores" v-if="comps.length != 0">
      <div v-for="(comp, index) in comps" :key="index">
        <li>{{comp.name}} -- {{comp.score}}</li>
      </div>
    </div>
    <div v-else>
      <h1>
        <strong>JOIN A COMPETITION!</strong>
      </h1>
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
    mounted() {
        let UID = JSON.parse(localStorage.getItem('user')).id
        let url = 'http://localhost:9999/getScores'
        this.$http.get(url).then(response => {
            if (response.data.reason === 'empty') {
                return (this.comps.length = 0)
            }
            for (let i = 0; i < response.data.number; i++) {
                if (UID == response.data.data.UID) {
                    comp[i] = response.data.data[i]
                }
                this.comps = comp
            }
        })
    }
}
</script>

