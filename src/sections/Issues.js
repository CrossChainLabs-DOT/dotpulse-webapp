/** @module Issues **/
import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
import { useTheme, styled } from '@mui/material/styles';
import { Card, CardHeader } from '@mui/material';
import { number } from '../utils/format';
import { CustomChart } from '../components/chart';
import { useState, useEffect } from 'react';

import { Client } from '../utils/client';

const CHART_HEIGHT = 392;
const LEGEND_HEIGHT = 72;

const ChartWrapperStyle = styled('div')(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(2),
  '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible'
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    alignContent: 'center',
    position: 'relative !important',
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`
  }
}));

/**
 * Pie chart that displays the number of issues.
 */
function Issues() {
  const theme = useTheme();
  const [state, setState] = useState({ loading: true, chartData: [0, 0] });

  useEffect(() => {
    const client = new Client();
    client.get('statistics').then((statistics) => {
      let open = parseInt((statistics?.issues_open) ? statistics?.issues_open : 0);
      let closed = parseInt((statistics?.issues_closed) ? statistics?.issues_closed : 0);

      setState({ loading: false, chartData: [open, closed] });
    });
  }, [setState]);

  const chartOptions = merge(CustomChart(), {
    colors: [
      "#E0ACC7",
      "#DB0372"
    ],
    chart: {
      width: 500
    },
    labels: ['Open', 'Closed'],
    stroke: {
      colors: ['#FFFFFF'],
      width: 10,
    },
    legend: { floating: true, horizontalAlign: 'center' },
    tooltip: {
      fillSeriesColor: true,
      y: {
        formatter: (seriesName) => number(seriesName),
        title: {
          formatter: (seriesName) => `${seriesName}`
        }
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '85%',
          labels: {
            value: {
              formatter: (val) => number(val)
            },
            total: {
              formatter: (w) => {
                const sum = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                return number(sum);
              }
            }
          }
        }
      }
    },
  });

  return (
    <Card className='boxContainer' sx={{ marginTop: '3rem' }}>
      <CardHeader title="Issues" />
      <ChartWrapperStyle dir="ltr">
        <ReactApexChart type="donut" series={state.chartData} options={chartOptions} height={310} />
      </ChartWrapperStyle>
    </Card>
  );
}

export default Issues;