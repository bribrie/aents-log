import { Doughnut } from 'react-chartjs-2';
import { CorlorList } from '@/styles/chartColors';

interface DoughnutProps {
  labels: string[];
  datas: number[];
  index: number;
}

const DoughnutChart = ({ labels, datas, index }: DoughnutProps) => {
  const data = {
    labels,
    datasets: [
      {
        data: datas,
        backgroundColor: CorlorList[index],
      },
    ],
  };

  const options = {
    elements: {
      arc: {
        weight: 0.3,
        borderWidth: 1,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    cutout: '75%', //도넛 안쪽 크기
  };

  return <Doughnut data={data} width={30} height={10} options={options} />;
};

export default DoughnutChart;
