<template>
    <div id="dash">
        <h2> {{ getName }} </h2>
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
  computed: {
    getName: function() {
      let user = localStorage.getItem('user')
      this.name = user.name
    },
  },
}
</script>

<style scoped>
</style>
