<template>
<div>
  <b-row>
<b-col v-for="data in dayWeather" :key='data.date'>
<img  v-bind:src="data.day.condition.icon"><br>
{{data.date}} <br>
Temp: {{data.day.avgtemp_c}} <br>
Wilgotność: {{data.day.avghumidity}} % <br>
{{data.day.daily_will_it_rain}} % szansy na opady <br>
</b-col>
</b-row>
</div>
</template>

<script src="./DailyForecast.ts" />

<style scoped>
#weather{
    background-color:deepskyblue;
    background-size: cover;
    background-position: bottom;
    transition: 0.4s;
    padding: 20px;
  }
 
</style>