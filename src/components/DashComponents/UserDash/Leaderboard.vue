<template>
  <div id="leaderboard">
    <div id="scoreboard" v-if="comps.length != 0">
      <table id="scores">
        <tr>
          <h2>Your Recent Submissions:</h2>
        </tr>
        <tr>
          <th>Competition Name</th>
          <th>Your Score</th>
        </tr>
        <tr v-for="(comp, index) in comps" :key="index" v-if="comp.userName === userName">
          <td>{{comp.compName}}</td>
          <td>{{comp.score}}</td>
        </tr>
      </table>
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
            comps: [],
            userName: JSON.parse(localStorage.getItem('user')).name
        }
    },
    mounted() {
        let url = 'http://18.219.145.169:9999/scores/'
        this.$http.get(url).then(response => {
            if (response.data.reason === 'empty') {
                return (this.comps.length = 0)
            }
            console.log(response)
            let comps = new Array(response.data.number)
            for (let i = 0; i < response.data.number; i++) {
                console.log(response.data.data[i])
                comps[i] = response.data.data[i]
            }
            this.comps = comps
        })
    }
}
</script>

<style scoped>
#scoreboard {
    text-align: left;
}
table {
    width: 35%;
    border-collapse: collapse;
}
th,
td {
    border: 1px solid #222333;
    text-align: left;
    padding: 5px;
}
tr:nth-child(even) {
    background-color: #d4d4d4;
}
li {
    text-align: center;
}
</style>
