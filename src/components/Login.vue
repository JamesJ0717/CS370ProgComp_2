<template>
    <div class="login">
            <label for='email'>Email: </label> 
            <div>
              <input v-model="email" id='email' required type="text"> <br>
            </div>
            <div>
              <label>Password: </label> 
              <div>
                <input v-model="password" id='password' required type="password">
              </div>
            </div>
            <button type="submit" @click="postLogin()">Login</button>
            <br><br>
            <p>Don't have an account?</p>
            <a href="/register">Create one now</a>
    </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    postLogin() {
      let url = 'http://localhost:9999/login'
      this.$http
        .post(url, {
          email: this.email,
          password: this.password,
        })
        .then(response => {
          localStorage.setItem('user', JSON.stringify(response.data.user))
          localStorage.setItem('jwt', response.data.token)
        })
    },
  },
}
</script>

<style scoped>
.login {
  text-align: center;
}
</style>
