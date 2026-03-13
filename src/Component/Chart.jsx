import React, {useState, useEffect} from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";

const Chart = () => {

    const [series, setSeries] = useState([
        {
            name: "Amounts",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }
    ]);

    const options = {
        chart: {
            type: "bar",
            height: 400
        },
        plotOptions: {
            bar: {
                borderRadius: 10,
                columnWidth: "50%"
            }
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            categories: [
                "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
            ]
        },
        yaxis: {
            title: {
                text: "Amounts"
            }
        }
    };

    const getMonthlyAmounts = async () => {
        try {

            const res = await axios.get("http://localhost:5000/api/order/monthly-amount");

            if (res.data.success) {

                setSeries([
                    {
                        name: "Amounts",
                        data: res.data.monthlyAmounts.map(Number)
                    }
                ]);
            }

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getMonthlyAmounts();
    }, []);

    return (
        <div>
            <ReactApexChart options={options} series={series} type="bar" height={400}/>
        </div>
    );
};

export default Chart;