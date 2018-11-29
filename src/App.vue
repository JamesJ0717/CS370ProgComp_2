<template>
  <div id="app">
    <Header id="header"></Header>
    <h1 id="welcome">Welcome to OPC!</h1>
    <router-view/>
  </div>
</template>

<script>
import Header from '@/components/Layout/Header'
export default {
    name: 'App',
    components: {
        Header: Header
    }
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#header {
    text-align: left;
}
</style>
