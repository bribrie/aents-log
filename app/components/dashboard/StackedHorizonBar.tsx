import { CorlorList } from '@/styles/chartColors';
import { DatasetController } from 'chart.js';
import { Bar } from 'react-chartjs-2';

interface StackedBarProps {
  datas: number[];
  labels: string[];
  title: string;
}

const StackedHorizonBar = ({ datas, labels, title }: StackedBarProps) => {
  const regex = /[^0-9]/g;
  const index = Number(title.replace(regex, ''));
  const data = {
    labels,
    datasets: [
      {
        data: datas,
        backgroundColor: CorlorList[index],
        borderRadius: 5,
      },
    ],
  };

  const options = {
    barThickness: 30,
    indexAxis: 'y' as const,
    plugins: {
      legend: {
        display: false,
      },
    },
    elements: {
      bar: {
        borderWidth: 0.1,
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
        },
        ticks: {
          display: false,
          font: {
            size: 16,
            weight: '500',
          },
          color: '#00000',
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

  return <Bar data={data} height={100} options={options} />;
};

export default StackedHorizonBar;
