import merge from 'lodash/merge';
import { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Card, CardHeader, Box } from '@mui/material';
import { CustomChart } from '../components/chart';
import { Client } from '../utils/client';

const client = new Client();

export default function Activity() {
  const [state, setState] = useState({
    loading: true, data: [
      { name: 'Contributors', data: [] }
    ]
  });

  useEffect(() => {
    client.get('activity').then((response) => {
      let activity = response;
      activity.pop();

      if (activity.length > 12) {
        //remove first length - 12 elements
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
    // title: {
    //   text: 'Ecosystem',
    //   align: 'left',
    //   style: {
    //     fontSize: '17px',
    //     fontWeight: '700',
    //     fontFamily: 'Public Sans,sans-serif',
    //     color: '#212B36'
    //   },
    // },
    // legend: {
    //   width: 300,
    //   position: 'top',
    //   horizontalAlign: 'right',
    // },
    grid: {
      borderColor: '#000000',
    },
    chart: {
      foreColor: '#000000',
    },
  });

  return (
    <Card className='boxContainer' sx={{ marginTop: '3rem' }}>
      <CardHeader
        title="Ecosystem"
      />
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

