<template>
    <div id="app">
        <Header id="Header"></Header>
        <router-view />
        <Footer id="Footer"></Footer>
    </div>
</template>

<script>
import Header from './components/Layout/Header.vue'
import Footer from './components/Layout/Footer.vue'
export default {
  name: 'App',
  components: {
    Header: Header,
    Footer: Footer,
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
