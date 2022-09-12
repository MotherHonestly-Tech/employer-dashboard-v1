import { Box, Grid, Typography } from "@mui/material";
import React, { Fragment } from "react";

import { ReactComponent as DownloadIcon } from "../../../static/svg/download.svg";
import MHButton from "../../Button/MHButton";

type HeaderProps = {
  titles?: string;
  description?: string;
  imageUrl?: string;
  downloadClassName?: string;
  ticketClassName?: string;
  author?: string;
  downloadLink?: string;
  ticketLink?: string;
  categoryOne?: string;
  categoryTwo?: string;
  date?: string | undefined;
  dateTwo?: string | undefined;
  onClick?: string;
  dateClassName?: string;
  podClassName?: string;
  episode?: string;
  season?: string;
  episodeClassName?: string;
};

const ViewHeader = (props: HeaderProps) => {
  return (
    <Fragment>
      <Grid container spacing={0} className=" h-[440px]">
        <Grid item xs={12} md={6} lg={7}>
          <Box className="bg-lilac-200 h-full pt-3 pl-12 relative">
            <Typography
              variant="body2"
              color="primary"
              className="text-left  my-6 w-3/4 font-columbia text-3xl capitalize font-[500]"
            >
              <Typography
                variant="body2"
                className={props.dateClassName}
                color="primary"
              >
                {props.date}
              </Typography>
              <Typography
                variant="body2"
                className={props.episodeClassName}
                color="primary"
              >
                Season {props.season} - Episode {props.episode}
              </Typography>
              {props.titles}
            </Typography>
            <Typography
              variant="body2"
              className="text-left  w-3/4 text-sm font-areaSemi"
              color="primary"
            >
              {props.description}
            </Typography>
            {/* <Box className="flex -ml-4 my-2"> */}
            <Box className={props.downloadClassName}>
              <a
                download
                onClick={() => {
                  window.open(props.downloadLink);
                }}
              >
                <DownloadIcon className="h-12" />
              </a>

              <Typography
                variant="body2"
                className="text-left mt-4 text-[13px]  uppercase font-areaNorm"
                color="primary"
              >
                Download Now
              </Typography>
            </Box>
            <Box className={props.ticketClassName}>
              <MHButton
                onClick={() => {
                  window.open(props.ticketLink);
                }}
                sx={{ width: "113px" }}
              >
                Buy A Ticket
              </MHButton>
            </Box>

            <Box className={props.podClassName}>
              <button
                onClick={() => {
                  window.open(
                    "https://podcasts.apple.com/us/podcast/mother-honestly-podcast/id1439395271"
                  );
                }}
              >
                <img
                  src="https://res.cloudinary.com/mother-honestly/image/upload/v1661893443/image_rinw1l.png"
                  className="h-8 w-fit absolute"
                  alt=""
                />
              </button>
              <button
                onClick={() => {
                  window.open(
                    "https://open.spotify.com/show/54t1C1cw8TeS2UK4doDTL4"
                  );
                }}
              >
                <img
                  src="https://res.cloudinary.com/mother-honestly/image/upload/v1661893444/image_1_orr0ih.png"
                  className="h-8 w-fit absolute "
                  alt=""
                />
              </button>

              <button
                onClick={() => {
                  window.open(
                    "https://podcasts.google.com/feed/aHR0cHM6Ly9mZWVkLnBvZGJlYW4uY29tL21vdGhlcmhvbmVzdGx5L2ZlZWQueG1s"
                  );
                }}
              >
                <img
                  src="https://res.cloudinary.com/mother-honestly/image/upload/v1661893283/image_2_wnnokq.png"
                  className="h-8 w-fit absolute -ml-9"
                  alt=""
                />
              </button>
            </Box>

            <Typography
              variant="body2"
              className="text-left mt-10 opacity-50 text-[13px] mb-8 uppercase font-areaNorm"
              color="primary"
            >
              {props.author}
            </Typography>

            <Box className="bottom-6 absolute">
              <Typography
                variant="body2"
                className="text-left mt-1 text-[12px] opacity-50 capitalize font-areaSemi"
                color="primary"
              >
                {props.categoryTwo}
              </Typography>

              <Typography
                variant="body2"
                className="text-left my-2 text-[12px] uppercase font-areaNorm"
                color="primary"
              >
                {props.dateTwo}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} lg={5} className=" relative">
          <Box className="bg-green-100 h-full w-full">
            <img
              src={props.imageUrl}
              alt=""
              className="overflow-hidden h-full w-full right-0 absolute"
            />
          </Box>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default ViewHeader;
