<template>
    <div class="login">
        <form action="../routes/login.js" method="POST">
            <label>Email: </label> <input v-bind="user.email" value='' required type="text"> <br>
            <label>Password: </label> <input v-bind="user.password" value='' required type="password">
            <button type="submit">Login</button>
        </form>
    </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
    }
  },
}
</script>

<style scoped>
.login {
  text-align: center;
}
</style>
