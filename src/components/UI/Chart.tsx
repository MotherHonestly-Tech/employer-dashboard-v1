import React from 'react';

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

import AbsolutePositionedContainer from './AbsolutePositionedContainer';
import { getPlaceValue, roundToUpperPlaceValue } from '../../utils/utils';
import { MAX_CHART_PLOT_POINTS } from '../../utils/constants';

type ChartDataPoint = {
  value: number;
  label: string;
};

type ChartDataProps = {
  dataPoints: ChartDataPoint[];
};

const ChartContainerStack = styled(Stack)(
  ({ theme }) => `
    padding: 1rem;
    text-align: center;
    justify-content: space-around;
    height: 13.5rem;
    position: relative;
  `
);

const typographyStyles = {
  fontFamily: 'Area-Normal-Semibold',
  fontSize: '.7rem',
  textAlign: 'center',
  color: '#8D8D8D'
};

const ChartBarOuter = styled(Stack)<{ label: string }>(({ theme, label }) => ({
  height: '100%',
  alignItems: 'center',
  flexGrow: 1,
  zIndex: theme.zIndex.tooltip,
  '&::after': {
    content: `"${label}"`,
    display: 'block',
    width: '100%',
    position: 'absolute',
    bottom: -10,
    ...typographyStyles
  }
}));

const ChartBarInner = styled(Stack)(({ theme }) => ({
  overflow: 'hidden',
  width: '100%',
  height: '100%',
  justifyContent: 'flex-end'
}));

const ChartBarContainer = ({
  children,
  label
}: {
  children: React.ReactNode;
  label: string;
}) => {
  return (
    <ChartBarOuter id="chart-bar__outer" label={label} px={1}>
      <ChartBarInner id="chart-bar__inner">{children}</ChartBarInner>
    </ChartBarOuter>
  );
};

const ChartBarFill = styled('div')(
  ({ theme }) => `
    background-color: #F2F2F2;
    border-radius: 6px;
    width: 100%;
    transition: all 0.3s ease-out;

    &:hover {
      background-color: #F2EC2C;
    }
  `
);

const ChartBar = (props: {
  value: number;
  label: string;
  maxValue: number;
}) => {
  let barFillHeight = '0%';
  barFillHeight = Math.round((props.value / props.maxValue) * 100) + '%';

  return (
    <ChartBarContainer label={props.label}>
      <ChartBarFill
        sx={{
          height: barFillHeight
        }}
      />
    </ChartBarContainer>
  );
};

const Chart = (props: ChartDataProps) => {
  const dataPointValues = props.dataPoints.map((dataPoint) => dataPoint.value);
  const maxValue = Math.max(...dataPointValues);

  // gets whether the max value is in tens, hundreds, thousands, ten-thousands
  // TODO: add more if-else states for additional place values, hundred-thousands, millions etc
  const placeValue = getPlaceValue(maxValue);

  // rounded to nearest 10, 100, 1000 depending on placeValue
  const upperPlotPoint = roundToUpperPlaceValue(maxValue)(placeValue);
  
  const numberOfPlotPoints = Math.min((upperPlotPoint / placeValue), MAX_CHART_PLOT_POINTS);
  const lowerPlotPoint = upperPlotPoint / numberOfPlotPoints;

  const getPlotPoints = (): number[] => {
    const plotPoints = [];

    for (let i = 1; i <= numberOfPlotPoints; i++) {
      const element = lowerPlotPoint * i;
      plotPoints.push(element);
    }
    return plotPoints;
  }

  return (
    <ChartContainerStack direction="row">
      {props.dataPoints.map((dataPoint) => (
        <ChartBar
          key={dataPoint.label}
          value={dataPoint.value}
          label={dataPoint.label}
          maxValue={upperPlotPoint}
        />
      ))}
      <AbsolutePositionedContainer
        height="calc(100% - 2rem)"
        width="calc(100% - 2rem)">
        {new Array(numberOfPlotPoints)
          .fill(0)
          .map((point, index) => (
            <Box
              key={index}
              height={100 / numberOfPlotPoints + '%'}
              borderTop={0.3}
              borderColor="#F2F2F2"
              position="relative"
              zIndex={(theme) => theme.zIndex.tooltip - 100}
              sx={{
                '&::before': {
                  content: `"$${getPlotPoints()[index]}"`,
                  display: 'inline-block',
                  position: 'absolute',
                  left: -30,
                  top: -6,
                  ...typographyStyles,
                  fontSize: '.6rem'
                }
              }}></Box>
          ))
          .reverse()}
      </AbsolutePositionedContainer>
    </ChartContainerStack>
  );
};

export default Chart;
