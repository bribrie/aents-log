import { Bar } from 'react-chartjs-2';

interface ProgressBarProps {
  percentage: number;
}

const ProgressBarChart = ({ percentage }: ProgressBarProps) => {
  const data = {
    backgroundColor: '#fff',
    labels: ['start', 'currentPercentage'],
    datasets: [
      {
        data: [percentage],
        borderRadius: 20,
        borderSkipped: false,
        backgroundColor: '#40C184',
      },
      {
        data: [100 - percentage],
        borderRadius: 20,
        backgroundColor: '#E8E8E8',
      },
    ],
  };

  const options = {
    barThickness: 10,
    indexAxis: 'y' as const,
    plugins: {
      legend: {
        display: false,
      },
    },

    scales: {
      x: {
        stacked: true,
        min: 0,
        max: 100,
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
      y: {
        stacked: true,
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
    },
  };

  return <Bar data={data} options={options} height={10} width={120} />;
};

export default ProgressBarChart;
