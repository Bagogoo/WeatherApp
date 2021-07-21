<template>
    <div id="weather">
      <div class="search-box">
    <input class="search-bar" placeholder="Szukaj" v-model="data.location" /> <br>
      </div>
     <button @click="getForecast()">Szukaj</button>
    <div class="weather-wrap" v-for="data in data.forecast[0]"  :key="data.location.name">
      <div class="location-box">
        <div class="location">{{data.location.name}},{{data.location.country}} </div>
        <div class="date">{{data.location.localtime}}</div>
      </div>
      <div class="weather-box">
      <div class="temp">{{data.current.temp_c}} &deg;C</div>
      <div class="conditions">{{data.current.condition.text}}</div>
      </div>
    </div>
</template>

<script src="./Forecast.ts" />
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
  .location-box .location{
    color:white;
    font-size: 32px;
    font-weight: 500;
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
  }
  .weather-box .temp{
    display: inline-block;
    padding: 10px 25px;
    color: white;
    font-size: 100px;
    font-weight: 900;
    text-shadow: 3px 6px rgba(0,0,0,0.25);
    background-color: rgba(255,255,255,0.25);
    border-radius: 16px;
    margin: 30px 0px;
    box-shadow: 3px 6px rgba(0,0,0,0.25);;
  }
  .weather-box .conditions{
    color:white;
    font-size: 40px;
    font-weight: 500;
    text-align: center;
    font-style: italic;
  }
</style>