import React, { Fragment } from "react";

interface PlayerProps {
  spotifyUrl?: string;
  appleUrl?: string;
}

const PodcastPlayer = (props: PlayerProps) => {
  return (
    <Fragment>
      <iframe
        // style="border-radius:12px"
        src={props.spotifyUrl}
        width="100%"
        height="152"
        frameBorder="0"
        allowFullScreen
        allowTransparency={true}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>

      {/* <iframe
        allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
        frameBorder="0"
        height="175"
        className="w-full overflow-hidden bg-transparent"
        // style="width:100%;max-width:660px;overflow:hidden;background:transparent;"
        sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
        src={props.appleUrl}
      ></iframe> */}
    </Fragment>
  );
};

export default PodcastPlayer;
