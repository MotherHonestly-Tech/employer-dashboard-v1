import { Box, Typography } from "@mui/material";
import React, { Fragment } from "react";

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
      <Box className="bg-lilac-300 h-[450px] px-40 text-center mx-auto pt-16">
        <Typography
          variant="body2"
          color="primary"
          className="text-center h-20 leading-10 line-clamp-3 my-6 w-full font-columbia text-3xl md:text-[40px] capitalize font-[500]"
        >
          {props.title}
        </Typography>
        <Typography
          variant="body2"
          className="text-center py-6 line-clamp-6 w-[70%] mx-auto text-[16px] font-areaSemi"
          color="primary"
        >
          {props.description}
        </Typography>

        <Box className="py-12">
          <Typography
            className="text-[11px] text-center font-areaExt uppercase text-navy-900"
            gutterBottom
            variant="h5"
            component="p"
          >
            {props.categoryOne}
          </Typography>
          <Typography
            variant="body2"
            className="text-center mt-1 text-[12px] opacity-50 capitalize font-areaSemi"
            color="primary"
          >
            {props.categoryOne ? (
              <div
                className="text-xs capitalize p-2 truncate text-navy-900 font-areaSemi"
                // size="small"
                // disabled
              >
                {props.categoryOne} {props.categoryTwo ? ", " : null}
                {props.categoryTwo}
              </div>
            ) : null}
          </Typography>
        </Box>
      </Box>
    </Fragment>
  );
};

export default VideoHeader;
