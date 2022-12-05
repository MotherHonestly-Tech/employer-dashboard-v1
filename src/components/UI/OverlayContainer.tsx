import React from 'react';
import { SxProps, Theme } from '@mui/material';
import AbsolutePositionedContainer from './AbsolutePositionedContainer';

const OverlayContainer = ({
  element,
  sx
}: {
  element: React.ReactElement;
  sx: SxProps<Theme>;
}) => {
  return (
    <AbsolutePositionedContainer defaultPos sx={sx}>
      {element}
    </AbsolutePositionedContainer>
  );
};

export default OverlayContainer;
