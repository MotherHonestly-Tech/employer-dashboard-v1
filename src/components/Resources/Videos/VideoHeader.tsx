import { Box, Grid, Typography } from "@mui/material";
import React, { Fragment } from "react";

import { ReactComponent as DownloadIcon } from "../../../static/svg/download.svg";

type HeaderProps = {
  title?: string;
  description?: string;
  imageUrl?: string;
  downloadClassName?: string;
  downloadLink?: string;
  categoryOne?: string;
  categoryTwo?: string;
  date?: string;
};

const VideoHeader = (props: HeaderProps) => {
  return (
    <Fragment>
      <Box className="bg-lilac-200 h-96 px-40 text-center mx-auto pt-16">
        <Typography
          variant="body2"
          color="primary"
          className="text-center  my-6 w-full font-columbia text-3xl capitalize font-[500]"
        >
          {props.title}
        </Typography>
        <Typography
          variant="body2"
          className="text-center  w-full text-sm font-areaSemi"
          color="primary"
        >
          {props.description}
        </Typography>

        <Box className="py-12">
          <Typography
            variant="body2"
            className="text-center mt-1 text-[10px] opacity-50 capitalize font-areaSemi"
            color="primary"
          >
            {props.categoryTwo}
          </Typography>
        </Box>
      </Box>
    </Fragment>
  );
};

export default VideoHeader;
