import React from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';

import IconWithText from '../UI/IconWithText';
import { ReactComponent as ViewIcon } from '../../static/svg/view.svg';
import { ReactComponent as DownloadIcon } from '../../static/svg/download.svg';
import { ReactComponent as ArrowRightIcon } from '../../static/svg/arrow-right.svg';
import { ReactComponent as ArticleIcon } from '../../static/svg/brand/article.svg';
import { ReactComponent as VideoIcon } from '../../static/svg/brand/video.svg';
import { ReactComponent as ToolkitIcon } from '../../static/svg/brand/toolkit.svg';
import RoundedLogoIcon from '../../theme/icons/RoundedLogo';
import ArrowPanelBar from '../UI/ArrowPanelBar';

type ResourceStatShape = {
  resource: string;
  title: string;
  icon: React.ReactElement;
  statType: 'view' | 'download';
  statFigure: number;
};

const Container = styled(Box)(({ theme }) => ({
  backgroundColor: '#F6F6F6',
  paddingBlock: 24,
  paddingInline: 16,
  marginTop: 30,
  borderRadius: 8
}));

const StyledResourceEl = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  borderRadius: 5,
  width: 200,
  paddingBlock: 5,
  paddingInline: 20
}));

const StatType = ({ type }: { type: 'view' | 'download' }) => {
  let icon: React.ReactElement | null = null;
  let verbiage: string = '';

  switch (type) {
    case 'view':
      icon = <ViewIcon />;
      verbiage = 'Views';
      break;

    case 'download':
      icon = <DownloadIcon />;
      verbiage = 'Downloads';
      break;
  }

  return (
    <IconWithText>
      <Typography variant="body1" fontSize={'.7rem'} color="#B7B7B7" mr={1}>
        {verbiage}
      </Typography>
      {icon}
    </IconWithText>
  );
};

const ResourceStat = (props: ResourceStatShape) => {
  return (
    <StyledResourceEl
      sx={{
        cursor: 'pointer',
        boxShadow: '0px 5px 26px rgba(197, 216, 222, 0.25)'
      }}>
      <IconWithText
        spacing={1}
        sx={{
          '& > svg': {
            width: '1.2rem',
            display: 'inline-block',
            mr: 1.4
          }
        }}>
        {props.icon}
        <Typography
          variant="body1"
          fontFamily="Area-Normal-Black"
          fontSize="1rem">
          {props.resource}
        </Typography>
      </IconWithText>

      <Divider
        sx={{
          borderColor: '#D9D9D9',
          mb: 1.4
        }}
      />

      <Typography variant="body1" fontSize=".8rem">
        {props.title}
      </Typography>

      <Divider
        sx={{
          borderColor: '#D9D9D9',
          my: 1.4
        }}
      />

      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="h2" mb={0.3}>
            {props.statFigure}
          </Typography>
          <StatType type={props.statType} />
        </Box>

        <RoundedLogoIcon
          sx={{
            backgroundColor: '#F2EC2C'
          }}>
          <ArrowRightIcon />
        </RoundedLogoIcon>
      </Stack>
    </StyledResourceEl>
  );
};

const RESOURCE_STATS: Array<ResourceStatShape> = [
  {
    resource: 'Articles',
    title: 'How Mothers Bounce Back At Home And In The Workplace',
    icon: <ArticleIcon />,
    statType: 'view',
    statFigure: 100
  },
  {
    resource: 'Articles',
    title: 'How Mothers Bounce Back At Home And In The Workplace',
    icon: <ArticleIcon />,
    statType: 'view',
    statFigure: 100
  },
  {
    resource: 'Articles',
    title: 'How Mothers Bounce Back At Home And In The Workplace',
    icon: <ArticleIcon />,
    statType: 'view',
    statFigure: 100
  },
  {
    resource: 'Articles',
    title: 'How Mothers Bounce Back At Home And In The Workplace',
    icon: <ArticleIcon />,
    statType: 'view',
    statFigure: 100
  },
  {
    resource: 'Articles',
    title: 'How Mothers Bounce Back At Home And In The Workplace',
    icon: <ArticleIcon />,
    statType: 'view',
    statFigure: 100
  }
];

const ResourceStats = () => {
  return (
    <Container>
      <Stack direction="row">
        <Box width={180} mt={2}>
          <Typography
            variant="body1"
            fontFamily="Area-Normal-Black"
            fontSize="1rem"
            paragraph>
            Most viewed resources
          </Typography>
          <Typography variant="body2">
            General Statistics of Employee engagement process.
          </Typography>
        </Box>

        <Box flexGrow={1}>
          <Stack direction="row" mb={3}>
            {RESOURCE_STATS.map((stat) => (
              <Box px={1}>
                <ResourceStat {...stat} />
              </Box>
            ))}
          </Stack>

          <ArrowPanelBar onLeft={() => {}} onRight={() => {}} />
        </Box>
      </Stack>
    </Container>
  );
};

export default ResourceStats;
