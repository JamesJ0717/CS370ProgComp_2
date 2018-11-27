<template>
    <div id="create">
        <h3>Create your competition here</h3>
        <input type="text" v-model="name" id="name" placeholder="Competition Name">
        <br>
        <input type="text" v-model="question" id="question" placeholder="Competition Question">
        <br>
        <input type="date" v-model="startDate"  min="2018-09-05" max="2099-12-31">
        <br>
        <input type="date" v-model="endDate" min="2018-09-05" max="2099-12-31">
        <br>
        <button type="submit" @click="postComp()">Post Competition</button>
    </div>
</template>

<script>
export default {
    name: 'CreateComp',
    data() {
        return {
            name: '',
            question: '',
            startDate: '2017-10-15',
            endDate: '2017-10-15'
        }
    },
    methods: {
        postComp() {
            let url = 'http://localhost:9999/addComp'
            this.$http
                .post(url, {
                    name: this.name,
                    question: this.question,
                    start: this.startDate,
                    end: this.endDate
                })
                .then(response => {
                    if (response.data.cause == 'name') {
                        this.$swal({
                            type: 'error',
                            text: 'A competition with that name already exists!'
                        })
                    }
                    console.log(response)
                })
        },
        getDate() {
            let date = new Date()
            let string =
                '' +
                date.getFullYear() +
                '-' +
                date.getMonth() +
                '-' +
                date.getDate()
            return string
        }
    }
}
</script>

<style scoped>
input {
    width: 512px;
    height: 32px;
    font-size: 18pt;
}
</style>

