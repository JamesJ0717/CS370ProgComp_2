<template>
    <div id='Header'>
        <nav>
            <ul>
                <li>
                    <router-link to='/' exact>Home</router-link>
                </li>
                <li>
                    <router-link to='/login' exact>Login</router-link>
                </li>
            </ul>
            <img src='../../assets/logo.png' id='logo' height="64px" width="64px">
            <h1>Welcome to OPC!</h1>
        </nav>
    </div>
</template>

<script>
export default {}
</script>

<style scoped>
h1 {
  font-size: 28pt;
  text-align: center;
  color: aquamarine;
  margin-top: 15px;
}

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
}

.router-link-active {
  background: #eee;
  color: #444;
}

#logo {
  text-align: left;
  padding: 10px;
  float: left;
}
</style>
