import React, { useCallback } from 'react';
// In your React project folder, run:
// npm install --save @mergeapi/react-merge-link
import { useMergeLink } from '@mergeapi/react-merge-link';

const MergeLink = ({
  linkToken,
  onSuccess,
  onMergeExit
}: {
  linkToken: string;
  onSuccess: (public_token: string) => void;
  onMergeExit: () => void;
  onProviderConnected?: () => void;
}) => {
  const onExit = useCallback(() => {
    onMergeExit();
  }, []);

  const { open, isReady } = useMergeLink({
    linkToken: linkToken as string, // Replace ADD_GENERATED_LINK_TOKEN with the token retrieved from your backend (Step 1)
    onSuccess,
    onExit
    // tenantConfig: {
    // apiBaseURL: "https://api-eu.merge.dev" /* OR your specified single tenant API base URL */
    // },
  });

  React.useEffect(() => {
    if (open && isReady) {
      open();
    }
  }, [open, isReady]);

  return (
    <div>
      {/*{' '}
      <button disabled={!isReady} onClick={open}>
        Preview linking experience
      </button>{' '}
  */}
    </div>
  );
};

export default MergeLink;
