<template>
<div>
  <b-row>
   
  <mdb-container>
    <mdb-line-chart
      :data="lineChartData"
      :options="lineChartOptions"
      :width="200"
      :height="150"
    ></mdb-line-chart>
  </mdb-container>
</b-row>
</div>
</template>

<script src="./Hourly.ts" />

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
   font-size: 5px;
 }
 .daily .temp{
   padding: none;
   font-size:5px;
   color: white;
  font-weight: 100;
 }
</style>