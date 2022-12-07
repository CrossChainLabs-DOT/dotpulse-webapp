import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Box, Stack, Card, Typography, CardHeader, Link } from '@mui/material';
import { Client } from '../utils/client';

const client = new Client();

ContributorItem.propTypes = {
  item: PropTypes.shape({
    dev_name: PropTypes.string,
    avatar_url: PropTypes.string,
    contributions: PropTypes.string,
  })
};

function ContributorItem({ item }) {
  const { dev_name, avatar_url, contributions } = item

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box component="img" src={avatar_url} sx={{ width: 30, height: 30, borderRadius: 1.5 }} />
      <Box sx={{ minWidth: 240 }}>
        <Typography variant="subtitle2" noWrap>
          <Link
            target="_blank"
            color="inherit"
            rel="noopener"
            href={"https://github.com/" + dev_name}>
            {dev_name}
          </Link>
        </Typography>
      </Box>
      <Box flexGrow={2}></Box>
      <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
        {contributions} commits
      </Typography>
    </Stack>
  );
}

export default function TopContributors() {
  const [state, setState] = useState({
    loading: true, top_contributors: []
  });

  useEffect(() => {
    client.get('top_contributors').then((response) => {
      let top_contributors = response;
      setState({
        loading: false,
        top_contributors: top_contributors.slice(0, 5),
      });
    });
  }, [setState]);

  return (
    <Card className='boxContainer'>
      <CardHeader title="Contributors" />
      <Stack spacing={5.37} sx={{ p: 5.4, pr: 0 }}>
        {state.top_contributors.map((item) => (
          <ContributorItem key={item.dev_name} item={item} />
        ))}
      </Stack>
    </Card>
  );
}
