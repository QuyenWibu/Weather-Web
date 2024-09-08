import React from "react";
import PropTypes from 'prop-types';
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function WeatherDetails({ forecast }) {
  if (!forecast || !forecast.list) {
    return <p>Không có dữ liệu hãy kiểm tra mạng đi friend</p>;
  }

  const filteredChart = forecast.list.filter((item, index, array) => {
    const currentDate = new Date(item.dt_txt).getDate();
    const previousDate = index > 0 ? new Date(array[index - 1].dt_txt).getDate() : null;
    return currentDate !== previousDate;
  }).slice(0, 7);

  const labels = filteredChart.map(item => new Date(item.dt_txt).toLocaleDateString("en-US", { weekday: 'short' }));
  const data = {
    labels,
    datasets: [
      {
        label: "Temperature (°C)",
        data: filteredChart.map(item => Math.round(item.main.temp)),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Temperature Forecast',
      },
    },
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6 mt-6 md:w-2/3">
      <div className="flex justify-center mb-8">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}

WeatherDetails.propTypes = {
  forecast: PropTypes.shape({
    list: PropTypes.arrayOf(
      PropTypes.shape({
        dt_txt: PropTypes.string,
        main: PropTypes.shape({
          temp: PropTypes.number,
        }),
      })
    ),
  }).isRequired,
};
