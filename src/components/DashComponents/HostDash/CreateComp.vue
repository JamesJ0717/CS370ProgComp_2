<template>
  <div id="create">
    <h3>Create your competition here</h3>
    <label>Competition Name:</label>
    <input type="text" v-model="name" id="name">
    <br>
    <label>Competition Question:</label>
    <input type="text" v-model="question" id="question">
    <br>
    <label>Start Date:</label>
    <input type="date" v-model="startDate" min="2018-09-05" max="2099-12-31">
    <br>
    <label>End Date:</label>
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
            startDate: '2018-09-15',
            endDate: '2018-09-15'
        }
    },
    methods: {
        postComp() {
            let url = 'https://opcs.jamesjohnson.io/api/addComp'
            this.$http
                .post(url, {
                    name: this.name,
                    question: this.question,
                    creator: JSON.parse(localStorage.getItem('user')).id,
                    startDate: this.startDate,
                    endDate: this.endDate
                })
                .then(response => {
                    if (response.data.status === 200) {
                        this.$swal({
                            type: 'success',
                            text:
                                'Successfully created competition. \nPlease go to your dashboard to upload the Gen and Eval files.'
                        })
                        this.$router.push('/dashboard')
                    } else if (response.data.status == 500) {
                        this.$swal({
                            type: 'error',
                            text: 'A competition with that name already exists!'
                        })
                    }
                    console.log(response)
                })
        },

        handleGenFile(genFile) {
            this.genFile = genFile
        },
        handleEvalFile(evalFile) {
            this.evalFile = evalFile
        }
    }
}
</script>

<style scoped>
input {
    width: 25%;
    height: 32px;
    font-size: 12pt;
}
#create {
    text-align: center;
}
</style>

