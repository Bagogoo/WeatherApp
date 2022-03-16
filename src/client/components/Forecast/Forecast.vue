<template>
    <div id="weather">
      <b-row class="search-box ">
    <input class="search-bar" placeholder="Szukaj" v-model="data.location" required  @keydown="onKeydown($event)" /><b-icon-bullseye class="location"
     @click="getClientLocation()"></b-icon-bullseye><br>
      </b-row>
     <button class="btn-search" @click="addCity()">Dodaj</button>   <button class="btn-search" @click="saveCities()">Zapisz układ</button>
    <b-row>
     <b-col  lg="4" md="12" xl="3" v-for="(forecast, index) in data.forecast" v-bind:key="index">
    <b-icon-x-circle class="icon-x" @click="deleteCity(index)"></b-icon-x-circle>
    <CurrentWeather :currentWeather="forecast"/>  
    </b-col>
    </b-row>
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
    text-align: center;
  }
  .icon-x{
    position:relative;
    left: 80px;
    top: 60px;
  }
  .search-box{
    margin: auto;
    width: 80%;
    margin-bottom: 30px;
  }
  .search-box .search-bar{
    display: inline-block;
    width: 90%;
    padding: 15px 15px 15px 0px;
    color:black;
    font-size: 20px;
    appearance: none;
    border: none;
    outline: none;
    background-color: rgba(255,255,255,0.5);
    border-radius: 0px 0px 0px 16px;
  }
  .search-box .location{
    display: inline-block;
    width: auto;
    height: auto;
    padding: auto;
    color:black;
    font-size: 40px;
    appearance: none;
    border: none;
    outline: none;
    background-color: rgba(255,255,255,0.5);
     border-radius: 0px 0px 16px 0px;
  }
  .btn-search{
    display: inline-block;
    padding: 10px;
    color:black;
    font-size: 20px;
    appearance: none;
    border: none;
    outline: none;
    background-color: rgba(255,255,255,0.75);
    border-radius: 5px;
    margin: auto;
  }
   .btn-search  :hover{
    display: inline-block;
    padding: 10px;
    color:white;
    font-size: 20px;
    appearance: none;
    border: none;
    outline: none;
    background-color: rgba(43, 36, 36, 0.75);
    border-radius: 5px;
  }
</style>