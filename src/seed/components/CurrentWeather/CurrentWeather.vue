<template>
 <div id="weather">
    <div class="weather-wrap" v-for="data in currentWeather"  :key="data.location.name">
      <div class="location-box">
         <img class="icon" v-bind:src="data.current.condition.icon">
        <div class="location">{{data.location.name}},{{data.location.country}} </div>
        <div class="date">{{data.location.localtime}}</div>
        
      </div>
      <div class="weather-box">
      <div class="temp">{{data.current.temp_c}}&deg;C</div>
      <div class="conditions">{{data.current.condition.text}}</div>
      </div>
       <b-row>
     <div v-for="(daily, index) in data.forecast" :key="index">
       <DailyForecast :dayWeather="daily"/>
    <div>
    </b-row>
    </div>
</template>

<script src="./CurrentWeather.ts" />

<style scoped>
#weather{
    background-color:deepskyblue;
    background-size: cover;
    background-position: bottom;
    transition: 0.4s;
    padding: 20px;
  }
  .search-box{
    width: 100%;
    margin-bottom: 30px;
  }
  .search-box .search-bar{
    display: block;
    width: 100%;
    padding: 15px;
    color:black;
    font-size: 20px;
    appearance: none;
    border: none;
    outline: none;
    background-color: rgba(255,255,255,0.5);
    border-radius: 0px 16px 0px 16px;
  }
  .location-box{
    text-align: center;
  }
   .location-box .icon{
    padding: auto;
    margin: auto;
  }
  .location-box .location{
    color:white;
    font-size: 28px;
    font-weight: 400;
    text-align: center;
    text-shadow: 1px 3px rgba(0,0,0,0.5);
  }
  .location-box .date{
    color:white;
    font-size: 20px;
    font-weight: 300;
    text-align: center;
    font-style: italic;
  }
  .weather-box{
    text-align: center;
    background-color: rgba(255,255,255,0.25);
    border-radius: 16px;
    margin: 30px;
    padding: 15px;
    box-shadow: 3px 6px rgba(0,0,0,0.25);
  }
  .weather-box .temp{
    display: inline-block;
    padding: 10px 25px;
    color: white;
    font-size: 50px;
    font-weight: 800;
    text-shadow: 3px 6px rgba(0,0,0,0.25);
   
  }
  .weather-box .conditions{
    color:white;
    font-size: 25px;
    font-weight: 500;
    text-align: center;
    font-style: italic;
  }
</style>