/** @module DotPulse **/
import PropTypes from 'prop-types';
import { useTheme, styled } from '@mui/material/styles';
import { Box, Card, Typography, CardHeader } from '@mui/material';
import palette from '../theme/palette';

/**
 * Card that displays statistics.
 * @param {object} name - the name of the card
 * @param {object} value - the value of the card
 * @param {object} subtitle - the subtitle of the card
 */
CardWidget.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

const RootStyle = styled(Card)(({ }) => ({
  textAlign: 'center',
  backgroundColor: palette.card,
}));

export default function CardWidget({ name, value, subtitle }) {
  return (
    <RootStyle className='boxContainer' sx={{ marginTop: '4rem' }}>
      <Card sx={{ display: 'flex', alignItems: 'center', p: 3, backgroundColor: "#DB0372" }}>
        <Box sx={{ flexGrow: 1, marginLeft: '1em' }}>
          <Typography align="left" variant="h6" color='common.white'>{name}</Typography>
          <Typography align="left" variant="subtitle2" color='common.white'>{subtitle}</Typography>
        </Box>
        <Typography align="right" variant="h3" color='common.white'>{value}</Typography>
      </Card>
    </RootStyle>
  );
}
