import LinearProgress, {
  linearProgressClasses
} from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';

const BorderLinearProgress = styled(LinearProgress)<{ barcolor: string }>(
  ({ theme, color, barcolor }) => ({
    height: 7,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800]
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: barcolor
    },
    [`&.${linearProgressClasses.root}::before`]: {
      background: '#D9D9D9',
      boxShadow: 'inset 0px 0px 3px rgba(83, 83, 83, 0.25)'
    }
  })
);

export default BorderLinearProgress;
