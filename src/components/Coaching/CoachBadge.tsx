import * as React from 'react';

import { styled } from '@mui/system';
import BadgeUnstyled, { badgeUnstyledClasses } from '@mui/base/BadgeUnstyled';

const StyledBadge = styled(BadgeUnstyled)(
  ({ theme }) => `
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-size: 14px;
  list-style: none;
  font-family: Area-Normal-Semibold, sans-serif;
  position: relative;
  display: inline-block;
  line-height: 1;

  & .${badgeUnstyledClasses.badge} {
    z-index: auto;
    position: absolute;
    top: 75%;
    left: 0;
    min-width: 22px;
    height: 30px;
    padding: 5px 10px;
    color: #194049;
    font-weight: 600;
    font-size: 10px;
    line-height: 22px;
    white-space: nowrap;
    text-align: center;
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
    background: #D6D7E0;
  }
  `
);

export default function CoachBadge({
  children,
  content
}: {
  children: React.ReactNode;
  content: string;
}) {
  return <StyledBadge badgeContent={content}>{children}</StyledBadge>;
}
