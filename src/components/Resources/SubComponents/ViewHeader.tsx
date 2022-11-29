import { Box, Grid, Typography } from "@mui/material";
import React, { Fragment } from "react";

import { ReactComponent as DownloadIcon } from "../../../static/svg/downloads.svg";
import MHButton from "../../Button/MHButton";

type HeaderProps = {
  titles?: string;
  description?: string;
  imageUrl?: string;
  downloadClassName?: string;
  ticketClassName?: string;
  author?: string;
  authorClassName?: string;
  timeClassName?: string;
  downloadLink?: string;
  ticketLink?: string;
  categoryOne?: string;
  categoryTwo?: string;
  date?: string | undefined;
  startTime?: string | undefined;
  endTime?: string | undefined;
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
      <Grid container spacing={0} className=" h-[550px]">
        <Grid item xs={12} md={6} lg={6}>
          <Box className="bg-lilac-300 h-full pt-3 pl-12 relative">
            <Typography
              variant="body2"
              color="primary"
              className="text-left  my-6 w-4/4 font-columbia text-3xl capitalize font-[500]"
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
              <Typography
                variant="body2"
                color="primary"
                className="text-left line-clamp-3 py-2 font-columbia text-4xl capitalize font-[500]"
              >
                {props.titles}
              </Typography>
            </Typography>
            <Typography
              variant="body2"
              className="text-left w-3/4 text-[16px] line-clamp-6 font-areaSemi"
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
                title="Click to download"
              >
                <DownloadIcon className="h-12 mt-8" />
              </a>

              <a
                download
                onClick={() => {
                  window.open(props.downloadLink);
                }}
                title="Click to download"
                className="no-underline"
              >
                <Typography
                  variant="body2"
                  className="text-left mt-12 text-[14px] uppercase font-areaExt"
                  color="primary"
                >
                  Download Toolkit
                </Typography>
              </a>
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
                  src="https://res.cloudinary.com/kehinde-motherhoneestly/image/upload/v1667217992/EmployeeDashboard/apple_zeutdb.png"
                  className="h-8 w-fit absolute"
                  alt="Podcast Image"
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
                  src="https://res.cloudinary.com/kehinde-motherhoneestly/image/upload/v1667217992/EmployeeDashboard/spotify_cupvwt.png"
                  className="h-8 w-fit absolute "
                  alt="Podcast Image"
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
                  src="https://res.cloudinary.com/kehinde-motherhoneestly/image/upload/v1667217992/EmployeeDashboard/google_owjcuv.png"
                  className="h-8 w-fit absolute "
                  alt="Podcast Image"
                />
              </button>
            </Box>

            <Typography
              variant="body2"
              className={props.authorClassName}
              color="primary"
            >
              BY {props.author}
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
                className={props.timeClassName}
                gutterBottom
                variant="h5"
                component="p"
              >
                {props.startTime} - {props.endTime}
              </Typography>

              <Typography
                variant="body2"
                className="text-left my-2 text-[12px] uppercase font-areaExt"
                color="primary"
              >
                {props.dateTwo}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} lg={6} className=" relative">
          <Box className="bg-green-100 h-[550px]">
            <img
              src={props.imageUrl}
              alt="Podcast Image"
              className="overflow-hidden h-full w-full right-0 absolute"
            />
          </Box>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default ViewHeader;
