/** @module EcosystemChart **/
import merge from 'lodash/merge';
import { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Card, CardHeader, Box } from '@mui/material';
import { CustomChart } from '../components/chart';
import { Client } from '../utils/client';

/**
 * Chart that displays the number of active developers and repos for each month over the last year.
 */
function Ecosystem() {
  const [state, setState] = useState({
    loading: true, 
    categories: [],
    data: [
      { name: 'Active contributors', data: [] },
      { name: 'Active repositories', data: [] }
    ]
  });

  useEffect(() => {
    const client = new Client();

    client.get('activity').then((response) => {
      let activity = response;
      activity.pop();

      if (activity.length > 12) {
        activity.splice(0, activity.length - 12);
      }
      let contributorsData = [];
      let reposData = [];
      let categories = [];

      activity.forEach(item => {
        contributorsData.push(item.active_contributors);
        reposData.push(item.active_repos);
        categories.push(item.display_month);
      });

      setState({
        loading: false,
        categories: categories,
        data: [
          { name: 'Active contributors', data: contributorsData },
          { name: 'Active repositories', data: reposData }
        ]
      });
    });
  }, [setState]);

  const chartOptions = merge(CustomChart(), {
    xaxis: {
      categories: state.categories,
    },
    colors: ["#DB0372", "#E0ACC7"],
    stroke: {
      width: 2,
      colors: ["#DB0372", '#E0ACC7'],
    },
    markers: {
      colors: ["#DB0372"],
      strokeColors: '#DB0372',
    },
    grid: {
      borderColor: '#000000',
    },
    chart: {
      foreColor: '#000000',
    }
  });

  return (
    <Card className='boxContainer' sx={{ marginTop: '3rem' }}>
      <CardHeader title="Ecosystem"/>
      <Box sx={{ mt: 3, mx: 3 }} dir="ltr">
        <ReactApexChart
          type="line"
          series={state.data}
          options={chartOptions}
          height={364}
        />
      </Box>
    </Card>
  );
}

export default Ecosystem;

