<template>
  <div id="dash">
    <h2>Hello, {{ getName() }}</h2>
    <div id="user" v-if="getStatus() == 0">
      <button id="viewComps" type="button" @click="goToComp()">View Competitions</button>
      <Leaderboard></Leaderboard>
    </div>

    <div id="host" v-else-if="getStatus() == 1">
      <button id="create" type="button" @click="createComp()">Create New Competition</button>
      <br>
      <br>
      <button id="update" type="button" @click="updateComp()">Update Competitions</button>
    </div>
  </div>
</template>

<script>
import Leaderboard from '@/components/DashComponents/UserDash/Leaderboard'
export default {
    name: 'Dashboard',
    components: { Leaderboard: Leaderboard },
    data() {
        return {
            name: '',
            is_host: 0
        }
    },
    methods: {
        getName() {
            let user = JSON.parse(localStorage.getItem('user'))
            return user.name
        },
        getStatus() {
            let user = JSON.parse(localStorage.getItem('user'))
            return user.is_host
        },
        goToComp() {
            this.$router.push('/competition')
        },
        createComp() {
            this.$router.push('/createComp')
        },
        updateComp() {
            this.$router.push('/updateComps')
        }
    },
    watch: {}
}
</script>

<style scoped>
#create,
#update {
    width: 256px;
    height: 72px;
    font-size: 20pt;
}
#viewComps {
    width: 256px;
    height: 72px;
    font-size: 20pt;
    background-color: #745eeb;
    text-decoration-color: teal;
}
</style>
