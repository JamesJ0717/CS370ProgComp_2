<template>
    <div id="dash" v-on:load="updateName()">
        <h2> {{ name }} </h2>
        <ul>
            <li>
                <a href='competition1'>Comp 1</a>
            </li>
        </ul>

    </div>
</template>

<script>
export default {
  data() {
    return {
      user: '',
      name: '',
      id: '',
      competitions: '',
    }
  },
  methods: {
    updateName() {
      let user = JSON.parse(localStorage.getItem('user'))
      name = user.name

    }
  },
}
</script>

<style scoped>
</style>
