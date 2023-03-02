import {
  Chart as ChartJS,
  Title,
  Legend,
  Filler,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  DoughnutController,
  ArcElement,
} from 'chart.js';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import {
  SCOPE_DATA,
  SUB_EMISSION_DATA,
  SUPPLIER_EMISSION_DATA,
} from '@/_consts/DashboardData';
import DoughnutChart from 'components/dashboard/DoughnutChart';
import StackedBarChart from 'components/dashboard/StackedBarChart';
import ProgressBarChart from 'components/dashboard/ProgressBarChart';
import { Divider, Typography } from '@mui/material';
import { CorlorList } from '@/styles/chartColors';
import DoughnutCard from '@/components/dashboard/DoughnutCard';
import { ChartCard } from '@/components/dashboard/ChartCard';
import StackedHorizonBar from '@/components/dashboard/StackedHorizonBar';

ChartJS.register(
  Title,
  Legend,
  Filler,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  DoughnutController,
  ArcElement
);

const percentage = [
  { title: '신재생에너지', percentage: 46 },
  { title: '전기차 비율', percentage: 36 },
  { title: '감축량', percentage: 68 },
];

const Dashboard = () => {
  const totalData = SCOPE_DATA.map((el) => el.total).reduce((prev, cur) => {
    return prev + cur;
  }, 0);

  return (
    <Container>
      <Box display='flex' justifyContent='space-between' marginY='2rem'>
        <Box>
          <Typography variant='h5' fontWeight='600'>
            데이터 분석
          </Typography>
        </Box>
        <Box>2021년</Box>
      </Box>
      <Box display='flex' gap='1rem'>
        <select>
          <option>엔츠그룹</option>
        </select>
        <div>/</div>
        <select>
          <option value=''>하위조직 선택</option>
          {SUB_EMISSION_DATA.map((el) => (
            <option>{el.name}</option>
          ))}
        </select>
      </Box>

      <Box
        display='grid'
        gap='1rem'
        gridTemplateColumns='repeat(4, 1fr)'
        marginY='3rem'
      >
        <DoughnutCard title='Total' totalData={totalData}>
          <DoughnutChart
            labels={SCOPE_DATA.map((el) => el.scope)}
            datas={SCOPE_DATA.map((el) => el.total)}
            index={0}
          />
        </DoughnutCard>
        {SCOPE_DATA.map((el, idx) => (
          <DoughnutCard title={el.scope} totalData={el.total} key={idx}>
            <DoughnutChart
              labels={el.data.map((el) => el.category)}
              datas={el.data.map((el) => el.emission)}
              index={idx + 1}
            />
          </DoughnutCard>
        ))}
      </Box>

      <ChartCard>
        <ChartCard.header title='월간 배출량' />
        <StackedBarChart />
      </ChartCard>

      <Box
        display='grid'
        gap='1rem'
        gridTemplateColumns='repeat(4, 1fr)'
        marginY='3rem'
      >
        {percentage.map((el) => (
          <ChartCard alignItems='center'>
            <ChartCard.header title={el.title} />
            <Box display='flex' alignItems='center' gap='0.5rem'>
              <Typography
                variant='h2'
                fontWeight='500'
                mb='1rem'
                color='#40C184'
              >
                {el.percentage}
              </Typography>
              <Typography variant='body1' fontWeight='500' color='#B6BAC0'>
                {el.title === '감축량' ? 'tCO2e' : '%'}
              </Typography>
            </Box>
            <ProgressBarChart percentage={el.percentage} />
          </ChartCard>
        ))}
        <ChartCard alignItems='center'>
          <ChartCard.header title='매출액 대비 배출량' />
          <Box display='flex' alignItems='center' flexDirection='column'>
            <Typography variant='h2' fontWeight='500' mb='1rem'>
              575.77
            </Typography>
            <Typography variant='body1' fontWeight='500' color='#B6BAC0'>
              tCO2e/10억원
            </Typography>
          </Box>
        </ChartCard>
      </Box>
      <Box
        display='grid'
        gridTemplateColumns='repeat(2, 1fr)'
        gap='1rem'
        pb='3rem'
      >
        <Box display='flex' flexDirection='column' gap='1.5rem'>
          {SCOPE_DATA.map((item, idx) => (
            <ChartCard>
              <ChartCard.header title={item.scope} emission={item.total} />
              <StackedHorizonBar
                datas={item.data.map((el) => el.emission)}
                labels={item.data.map((el) => el.category)}
                title={item.scope}
              />
              {item.data.map((el, elIdx) => (
                <ChartCard.content>
                  <ChartCard.text color={CorlorList[idx + 1][elIdx]}>
                    {el.category}
                  </ChartCard.text>
                  <ChartCard.emission emission={el.emission} />
                </ChartCard.content>
              ))}
            </ChartCard>
          ))}
        </Box>
        <Box display='flex' flexDirection='column' gap='1.5rem'>
          <ChartCard>
            <ChartCard.header title='하위 조직별 배출량' />
            {SUB_EMISSION_DATA.map((data, idx) => (
              <>
                <ChartCard.content>
                  <ChartCard.text>{data.name}</ChartCard.text>
                  <ChartCard.emission emission={data.emission} />
                </ChartCard.content>
                <Divider
                  sx={{
                    borderColor:
                      idx === SUB_EMISSION_DATA.length - 1
                        ? '#fff'
                        : 'rgba(0, 0, 0, 0.12)',
                  }}
                ></Divider>
              </>
            ))}
          </ChartCard>

          <ChartCard>
            <ChartCard.header title='공급사별 배출량' />
            {SUPPLIER_EMISSION_DATA.map((data, idx) => (
              <>
                <ChartCard.content>
                  <ChartCard.text>{data.name}</ChartCard.text>
                  <ChartCard.emission emission={data.emission} />
                </ChartCard.content>
                <Divider
                  sx={{
                    borderColor:
                      idx === SUPPLIER_EMISSION_DATA.length - 1
                        ? '#fff'
                        : 'rgba(0, 0, 0, 0.12)',
                  }}
                ></Divider>
              </>
            ))}
          </ChartCard>
        </Box>
      </Box>
    </Container>
  );
};

export default Dashboard;
