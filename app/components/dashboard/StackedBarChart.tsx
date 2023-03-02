import { Bar } from 'react-chartjs-2';
import { MONTHLY_EMISSON_DATA } from '../../_consts/DashboardData';
const label = MONTHLY_EMISSON_DATA.map((el) => el.month);
const scope_1_data = MONTHLY_EMISSON_DATA.map((el) => el.scope1);
const scope_2_data = MONTHLY_EMISSON_DATA.map((el) => el.scope2);
const scope_3_data = MONTHLY_EMISSON_DATA.map((el) => el.scope3);

interface StackedBarProps {
  datas?: string[];
}

const StackedBarChart = ({ datas }: StackedBarProps) => {
  const data = {
    labels: label,
    datasets: [
      {
        label: 'Scope 1',
        data: scope_1_data,
        backgroundColor: '#F7A48D',
        borderRadius: 5,
      },
      {
        label: 'Scope 2',
        data: scope_2_data,
        backgroundColor: '#FBE16A',
      },
      {
        label: 'Scope 3',
        data: scope_3_data,
        backgroundColor: '#74CAFF',
        borderRadius: 5,
      },
    ],
  };

  const options = {
    barThickness: 30,
    indexAxis: 'x' as const,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
        align: 'start' as const,
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          color: '#00000',
          fontSize: '20px',
        },
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
          display: true,
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

export default StackedBarChart;
