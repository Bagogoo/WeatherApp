<template>
<div>
  <b-row>
<b-col v-for="data in dayWeather" :key='data.date'>
<img  v-bind:src="data.day.condition.icon"><br>
<div class="daily">
<div class="date">{{data.date}}</div>
<div class="temp">{{data.day.avgtemp_c}}&deg;C </div> 
<div class="date">{{data.day.avghumidity}} % <br>
{{data.day.daily_will_it_rain}} % szansy na opady </div><br>
</div>
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
  .daily{
    padding: 5px;
  }
 .daily .date{
   color:white;
   font-size: 20px;
 }
 .daily .temp{
   padding: none;
   font-size:50px;
   color: white;
  font-weight: 400;
 }
</style>