import PropTypes from 'prop-types';
import { useTheme, styled } from '@mui/material/styles';
import { Box, Card, Typography, CardHeader } from '@mui/material';
import palette from '../theme/palette';

CardWidget.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

const RootStyle = styled(Card)(({ theme }) => ({
  textAlign: 'center',
  backgroundColor: palette.card,
}));

export default function CardWidget({ name, value, time }) {
  const theme = useTheme();

  return (
    <RootStyle className='boxContainer'>
      <Card sx={{ display: 'flex', alignItems: 'center', p: 3, backgroundColor: "#DB0372" }}>
        <Box sx={{ flexGrow: 1, marginLeft: '1em' }}>
          <Typography align="left" variant="h6" color='common.white'>{name}</Typography>
          <Typography align="left" variant="subtitle2" color='common.white'>{time}</Typography>
        </Box>
        <Typography align="right" variant="h3" color='common.white'>{value}</Typography>
      </Card>
    </RootStyle>
  );
}
