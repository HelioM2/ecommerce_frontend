import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

// Registrando os elementos necessários do Chart.js
ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

const StockChart = ({ stockData }) => {
  // Configuração do gráfico
  const data = {
    labels: stockData.map(item => item.date),  // Aqui usamos as datas
    datasets: [
      {
        label: 'Stock',
        data: stockData.map(item => item.stock),  // Aqui usamos as quantidades de stock
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Gráfico de Stock',
      },
    },
  };

  return (
    <div className="stock-chart">
      <Line data={data} options={options} />
    </div>
  );
};

export default StockChart;
