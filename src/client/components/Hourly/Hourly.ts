import Vue from 'vue';
import { mdbLineChart, mdbContainer } from 'mdbvue';
import { Hour } from '../../services/forecastDataservice';

export default Vue.extend({
    name: 'Hourly',
    components:{mdbLineChart, mdbContainer},
    props: ["hourlyWeather"],
    data() {
        return {
            lineChartData: {
                labels: [
                    "0:00",
                    "1:00",
                    "2:00",
                    "3:00",
                    "4:00",
                    "5:00",
                    "6:00",
                    "7:00",
                    "8:00",
                    "9:00",
                    "10:00",
                    "11:00",
                    "12:00",
                    "13:00",
                    "14:00",
                    "15:00",
                    "16:00",
                    "17:00",
                    "18:00",
                    "19:00",
                    "20:00",
                    "21:00",
                    "22:00",
                    "23:00",
                ],
                datasets: [
                    {
                        label: "Temperatura",
                        yAxisID: 'y-axis-1',
                        borderWidth: 0.7,
                        backgroundColor: 'deepskyblue',
                        fill:false,
                        data: this.hourlyWeather.map((t: Hour) => t.temp_c),
                        
                    },
                    {
                        label: "Wilgotność",
                        yAxisID: 'y-axis-2',
                        borderWidth: 0.8,
                        data: this.hourlyWeather.map((h: Hour)=>h.humidity)
                    }
                ]
            },
            lineChartOptions: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    xAxes: [
                        {
                            gridLines: {
                                display: true,
                                color: "rgba(0, 0, 0, 0.1)"
                            }
                        }
                    ],
                    yAxes: [
                        {
                            display: true,
                            position: 'left',
                            id: 'y-axis-1',
                            color:"rgba(1, 0, 0, 0.1)",
                            fill: false
                        },
                        {
                            display: true,
                            position: 'right',
                            id:'y-axis-2'
                        }
                    ]
                }
            }
        };
    }
})