import { ReactComponent as MHLogo } from '../../static/svg/mh-logo.svg';

export default function MHLogoIcon({ style }: { style?: object }) {
  return (
    <MHLogo
      style={{
        margin: '0 auto',
        ...style
      }}
    />
  );
}
