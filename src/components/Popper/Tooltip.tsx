import * as React from 'react';

import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

const MHTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} placement="right" classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: '#8D8D8D',
    // boxShadow: theme.shadows[1],
    fontSize: 12
  },
  [`& .${tooltipClasses.tooltipArrow}`]: {
    backgroundColor: theme.palette.common.white
  },
  [`& .${tooltipClasses.arrow}`]: {
    backgroundColor: theme.palette.common.white
  },
  [`& .${tooltipClasses.popper}`]: {
    backgroundColor: theme.palette.common.white
  }
}));

export default MHTooltip;
