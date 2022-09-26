import {styled} from '@mui/system';

const Label = styled('label')(
  ({ theme, style }) => `
    display: inline-block;
    font-family: Area-Normal-Semibold;
    font-size: 0.8rem;
    width: 100%;
    min-width: 320px;
    margin-bottom: 4px;
    color: #21392E;
    ...({
        ...style
    })
  `
);

export default Label;