<template>
  <div class="login">
    <label for="email">Email:</label>
    <div>
      <input v-model="email" id="email" required type="text">
      <br>
    </div>
    <div>
      <label>Password:</label>
      <div>
        <input v-model="password" id="password" required type="password">
      </div>
    </div>
    <button type="submit" @click="postLogin()">Login</button>
    <br>
    <br>
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
            password: ''
        }
    },
    methods: {
        postLogin() {
            let url = 'http://localhost:9999/login'
            this.$http
                .post(url, {
                    email: this.email,
                    password: this.password
                })
                .then(response => {
                    if (response.data.response === 'server') {
                        this.$swal({
                            type: 'error',
                            text: 'There was a problem with the server'
                        })
                    } else if (response.data.response === 'email') {
                        console.log('Invalid email')
                        this.$swal({
                            text: 'Invalid email',
                            type: 'error'
                        })
                    } else if (response.data.response === 'password') {
                        console.log('Invalid password')
                        this.$swal({
                            text: 'Invalid password',
                            type: 'error'
                        })
                    } else if (response.data.response === 'good') {
                        this.$swal({
                            text: 'Logged in successfully!',
                            type: 'success',
                            position: 'top-end'
                        })
                    }

                    localStorage.setItem(
                        'user',
                        JSON.stringify(response.data.user)
                    )

                    localStorage.setItem('jwt', response.data.token)
                    if (localStorage.getItem('jwt') != null) {
                        this.$emit('loggedIn')
                        if (this.$route.params.nextUrl != null) {
                            this.$router.push(this.$route.params.nextUrl)
                        } else {
                            this.$router.push('/dashboard')
                        }
                    }
                })
        }
    }
}
</script>

<style scoped>
.login {
    text-align: center;
}
</style>
