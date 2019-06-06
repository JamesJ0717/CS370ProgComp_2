<template>
  <div id="logout"></div>
</template>
<script>
require('dotenv').config()
export default {
    data() {
        return {}
    },
    mounted() {
        localStorage.clear()
        this.$swal({
            type: 'success',
            text: 'Successfully logged out!'
        })
        this.$router.push('/')
    }
}
</script>
