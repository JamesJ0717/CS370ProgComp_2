<template>
    <div id='Header' v-on:load="logged()">
        <nav>
            <li>
                <router-link class='logo' to='/dashboard' exact><img id='logo' src='../../assets/logo.png' height="64px" width="64px"></router-link>
            </li>
            <ul>
                <li>
                    <router-link to='/' exact>Home</router-link>
                </li>
                <li>
                    <router-link to='/dashboard' exact>Dashboard</router-link>
                </li>
                <li>
                    <router-link to='/about' exact>About Us</router-link>
                </li>
                <li>
                    <router-link to='/login' exact>{{ option }}</router-link>
                </li>
            </ul>
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
    computed: {
        logged: function() {
            if(localStorage.getItem('user') != null)
                option = 'Logout'
        }
    }
}
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
    width: 100%;
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
