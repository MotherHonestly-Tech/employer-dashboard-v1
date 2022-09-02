import React from 'react';

function useTitle(title: string) {
  React.useEffect(() => {
    const prevTitle = document.title.split(' - ')[0];
    document.title = `${prevTitle} - ${title}`;

    return () => {
      document.title = prevTitle;
    };
  }, [title]);
}

export default useTitle;