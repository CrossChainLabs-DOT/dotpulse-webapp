/** @module CommitsChart **/
import merge from 'lodash/merge';
import { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Card, CardHeader, Box } from '@mui/material';
import { CustomChart } from '../components/chart';
import { Client } from '../utils/client';


/**
 * Chart that displays the number of commits for each month over the last year.
 */
function Commits() {
  const [state, setState] = useState({
    loading: true, 
    categories: [],
    data: [
      { name: 'Commits', data: [] }
    ]
  });

  useEffect(() => {
    const client = new Client();

    client.get('commits').then((response) => {
      let commits = response;
      commits.pop();
      if (commits.length > 12) {
        commits.splice(0, commits.length - 12);
      }

      let commitsData = [];
      let categories = [];

      commits.forEach(item => {
        commitsData.push(item.commits);
        categories.push(item.display_month);
      });

      setState({
        loading: false,
        categories: categories,
        data: [
          { name: 'Commits', data: commitsData }
        ]
      });
    });
  }, [setState]);

  const chartOptions = merge(CustomChart(), {
    xaxis: {
      categories: state.categories,
      lables: {
        colors: ["#DB0372"],
      },
    },
    fill: {
      colors: ["#DB0372"]
    },
    stroke: {
      width: 2,
      colors: ["#DB0372"]
    },
    grid: {
      borderColor: '#000000',
    },
    chart: {
      foreColor: '#000000'
    },

  });

  return (
    <Card className='boxContainer' sx={{ marginTop: '3rem' }}>
      <CardHeader
        title="Commits"
      />
      <Box sx={{ mt: 3, mx: 3 }} dir="ltr">
        <ReactApexChart type="bar" series={state.data} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}

export default Commits;
