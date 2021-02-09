<template>
  <div id="app">
    <asset :assetUrl="assetUrl"/>
  </div>
</template>

<script>
import Asset from './components/Asset'

const apiUrl = 'https://api.opensea.io/api/v1/asset'

export default ({
  name: 'App',
  data() {
    return {
      assetUrl: `${apiUrl}${window.location.pathname}`
    }
  },
  components: {
    Asset
  }
})
</script>

<style>
html {
  background-color: black;
  width: 100%;
  height: 100%;
}

body {
}

* {
  box-sizing: border-box;
}

@font-face {
  font-family: 'blender';
  src: url("./assets/subset-BlenderPro-Bold.woff2") format("woff2");
}

#app {
  font-family: "blender";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #AAA;
}
</style>
