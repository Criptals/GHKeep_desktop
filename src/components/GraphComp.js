import React, { useRef, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart, LinearScale, CategoryScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';

// Регистрация компонентов
Chart.register(LinearScale, CategoryScale, PointElement, LineElement, Tooltip, Legend);
const GraphComp = ({
    suffix = "",
    id = 0,
    data = [0, 0, 0, 0, 0],
    time = ["00:00", "00:00", "00:00", "00:00", "00:00"],
}) => {

    const chartRef = useRef(null);

    useEffect(() => {
        if (chartRef.current) {
            const ctx = chartRef.current.canvas.getContext('2d');
            const gradient = ctx.createLinearGradient(0, 0, 0, 200);
            gradient.addColorStop(0, 'rgba(200, 230, 255, 0.8)'); // Голубой сверху
            gradient.addColorStop(1, 'rgba(240, 248, 255, 0.4)'); // Почти белый снизу
            
            chartRef.current.data.datasets[0].backgroundColor = gradient;
            chartRef.current.update();
        }
    }, [data]);



    const chartData = {
        labels: time,
        datasets: [
            {
                data: data,
                borderColor: "#ffffff",
                backgroundColor: "#77bd53",
                tension: 0.4,
                color: "#000",
                pointRadius: 4,
                pointBackgroundColor: "#ffffff",
                pointBorderColor: "#338a3e",
                pointBorderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return context.parsed.y + suffix;
                    }
                }
            }
        },
        scales: {
            y: {
                ticks: {
                    callback: function(value) {
                        return value + suffix;
                    }
                },
                grid: {
                    color: "rgba(0, 0, 0, 0.3)"
                }
            },
            x: {
                grid: {
                    color: "rgba(0, 0, 0, 0.3)"
                }
            }
        },
        maintainAspectRatio: false
    };

    return (
        <div style={{ 
            background: 'linear-gradient(to bottom,rgb(212, 217, 224),rgb(136, 144, 157))',
            padding: "8px",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
        }}>
            <div style={{ 
                marginLeft: "15px", 
                fontSize: "1.1rem", 
                fontWeight: "500",
                color: "#000"
            }}>
                {id}
            </div>
            <div style={{ height: "200px", margin: "8px" }}>
                <Line 
                    ref={chartRef}
                    data={chartData}
                    options={options}
                />
            </div>
        </div>
    );
};

export default GraphComp;