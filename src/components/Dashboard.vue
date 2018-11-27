<template>
    <div id="dash">
        <h2> Hello, {{ getName() }} </h2>
        <div id="user" v-if="getStatus() == 0">
            <button type="button" @click="goToComp(1)">Comp 1</button>
        </div>

        <div id="host" v-else-if="getStatus() == 1">
            <button type="button" @click="createComp()" id='create'>Create New Competition</button>
        </div>
    </div>
</template>

<script>
import CreateComp from './DashComponents/HostDash/CreateComp'
export default {
    name: 'Dashboard',
    components: { CreateComp },
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
        goToComp(number) {
            this.$router.push('/comp' + number)
        },
        createComp() {
            this.$router.push('/createComp')
        }
    },
    watch: {}
}
</script>

<style scoped>
#create {
    width: 128px;
    height: 36px;
}
</style>
