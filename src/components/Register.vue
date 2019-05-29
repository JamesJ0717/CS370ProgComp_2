<template>
  <div id="register">
    <div id="create">
      <h4>Register</h4>
      <form>
        <label for="name">Name</label>
        <div>
          <input id="name" type="text" v-model="name" required autofocus>
        </div>

        <label for="email">E-Mail Address</label>
        <div>
          <input id="email" type="email" v-model="email" required>
        </div>

        <label for="password">Password</label>
        <div>
          <input id="password" type="password" v-model="password" required>
        </div>

        <label for="password-confirm">Confirm Password</label>
        <div>
          <input id="password-confirm" type="password" v-model="password_confirmation" required>
        </div>

        <label for="password-confirm">Is this a host account?</label>
        <div>
          <select v-model="is_host">
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>
        </div>

        <div>
          <button type="submit" @click="handleSubmit">Register</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
    props: ['nextUrl'],
    data() {
        return {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            is_host: '0'
        }
    },
    methods: {
        handleSubmit(e) {
            e.preventDefault()

            if (
                this.password === this.password_confirmation &&
                this.password.length > 0
            ) {
                let url = 'https://api.opcs.jamesjohnson.io:9999/register'
                if (this.is_host != null && this.is_host == 1)
                    url = 'https://api.opcs.jamesjohnson.io:9999/register/admin'
                this.$http
                    .post(url, {
                        name: this.name,
                        email: this.email,
                        password: this.password,
                        is_host: this.is_host
                    })
                    .then(response => {
                        if (response.data.cause == 'email') {
                            this.$swal({
                                text:
                                    'An account with that email already exists!',
                                type: 'error'
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
                    .catch(error => {
                        if (error) console.log(error)
                    })
            } else {
                this.password = ''
                this.passwordConfirm = ''

                return this.$swal({
                    text: 'Passwords do not match',
                    type: 'error'
                })
            }
        }
    }
}
</script>

<style scoped>
#register {
    text-align: center;
}
</style>
