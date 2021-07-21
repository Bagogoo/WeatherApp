<template>
  <div>
    <Nav/>
    <router-view/>
    <Footer/>
  </div>
</template>

<script src="./App.ts" />
<style scoped>
*{
  margin:0;
  padding: 0;
  box-sizing: border-box;
}
body{
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
#app{
  background-color:deepskyblue;
  background-size: cover;
  background-position: bottom;
  transition: 0.4s;
}
</style>