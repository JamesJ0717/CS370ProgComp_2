<template>
  <div id="Header">
    <nav>
      <ul>
        <li>
          <router-link to="/" exact>Home</router-link>
        </li>
        <li>
          <router-link to="/dashboard" exact>Dashboard</router-link>
        </li>
        <li>
          <router-link to="/about" exact>About Us</router-link>
        </li>
        <li v-if="option === 'Login'">
          <router-link to="/login" exact>Login</router-link>
        </li>
        <li v-else>
          <router-link to="/logout">Logout</router-link>
        </li>
      </ul>
      <img id="logo" src="../../assets/logo.jpg" height="64px" width="64px">
    </nav>
  </div>
</template>

<script>
export default {
    data() {
        return {
            option: 'Login'
        }
    },
    mounted() {
        if (localStorage.getItem('user') != null) {
            this.option = 'Logout'
        } else {
            this.option = 'Login'
        }
    }
}
</script>

<style scoped>
ul {
    list-style-type: none;
    text-align: right;
    margin: 0;
    float: right;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #fff;
    text-decoration: none;
    padding: 6px 8px;
    border-radius: 10px;
}

nav {
    background: #444;
    padding: 10px 0;
    margin-bottom: 20px;
    height: 84px;
    width: 100%;
}

.router-link-active {
    background: #eee;
    color: #444;
}

#logo {
    text-align: left;
    padding: 10px;
}
</style>
