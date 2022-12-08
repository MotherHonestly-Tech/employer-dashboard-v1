import { Box, Grid, Typography } from "@mui/material";
import React, { Fragment } from "react";

import { ReactComponent as DownloadIcon } from "../../../static/svg/downloads.svg";
import { ReactComponent as Instagram } from "../../../static/svg/instagram.svg";
import { ReactComponent as Facebook } from "../../../static/svg/facebook.svg";
import { ReactComponent as Pinterest } from "../../../static/svg/pinterest.svg";
import { ReactComponent as Twitter } from "../../../static/svg/twitter.svg";
import MHButton from "../../Button/MHButton";
import { Link } from "react-router-dom";

type HeaderProps = {
  titles?: string;
  description?: string;
  imageUrl?: string;
  headerClassName?: string;
  headerDateClass?: string;
  downloadClassName?: string;
  imageClass?: string;
  ticketClassName?: string;
  writtenBy?: string;
  bottomDateClass?: string;
  authorClassName?: string;
  timeClassName?: string;
  SocialClassName?: string;
  categoryClassName?: string;
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
        <Grid item xs={12} md={6.5} lg={6.5}>
          <Box className="bg-lilac-300 h-full pt-3 pl-12 relative">
            <Typography
              variant="body2"
              className={props.headerDateClass}
              color="primary"
            >
              {props.dateTwo}
            </Typography>
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
                Episode {props.season}.{props.episode}
              </Typography>
              <Typography
                variant="body2"
                color="primary"
                className="md:text-left lg:leading-[120.5%] text-center h-fit md:w-[85%] line-clamp-5 md:line-clamp-3 font-columbia text-3xl md:text-2xl lg:text-[40px] capitalize font-[500]"
                // h-28 md:h-24 lg:h-36
              >
                {props.titles}
              </Typography>
            </Typography>
            <Typography
              variant="body2"
              className="md:text-left pt-6 text-center md:w-[70%] text-[14px] line-clamp-3 font-areaSemi"
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
                  className="text-left mt-12 text-xs uppercase font-areaBold tracking-wider"
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
                sx={{ width: "135px" }}
              >
                Buy A Ticket
              </MHButton>
            </Box>

            <Box className={props.podClassName}>
              <button
                onClick={() => {
                  window.open(
                    "https://open.spotify.com/show/54t1C1cw8TeS2UK4doDTL4"
                  );
                }}
              >
                <img
                  src="https://res.cloudinary.com/mother-honestly/image/upload/v1668612804/spotify-pod_jyslea.png"
                  className="h-8 md:h-7 lg:h-10 md:w-fit absolute"
                  alt="Resources Image"
                />
              </button>
              <button
                onClick={() => {
                  window.open(
                    "https://podcasts.apple.com/us/podcast/mother-honestly-podcast/id1439395271"
                  );
                }}
              >
                <img
                  src="https://res.cloudinary.com/mother-honestly/image/upload/v1668612775/apple-pod_yzrrsw.png"
                  className="h-8 md:h-7 lg:h-10 md:w-fit absolute ml-24 md:-ml-5 lg:-ml-2"
                  alt="Resources Image"
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
                  src="https://res.cloudinary.com/mother-honestly/image/upload/v1668612775/google-pod_eavovx.png"
                  className="h-8 md:h-7 lg:h-10 md:w-fit absolute ml-[230px] md:ml-0 lg:ml-8"
                  alt="Resources Image"
                />
              </button>
            </Box>

            <Box className={props.authorClassName} color="primary">
              BY {props.writtenBy}
            </Box>

            <Box className={props.categoryClassName}>
              <Box className="lg:py-9 md:py-12 py-12">
                <Typography
                  className="text-[15px] text-center md:text-left font-areaExt uppercase text-navy-900"
                  gutterBottom
                  variant="h5"
                >
                  {props.categoryOne}
                </Typography>
                <Typography
                  variant="body2"
                  className="text-center md:text-left py-2 md:py-0 lg:py-2 text-[12px] opacity-50 capitalize font-areaSemi"
                  color="primary"
                >
                  {props.categoryOne ? (
                    <div
                      className="text-[14px] capitalize truncate text-navy-900 font-areaSemi"
                      // size="small"
                      // disabled
                    >
                      {props.categoryOne} {props.categoryTwo ? ", " : null}
                      {props.categoryTwo}
                    </div>
                  ) : null}
                </Typography>
              </Box>

              <Box className={props.bottomDateClass}>
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
                  className="text-left my-2 hidden md:block text-[12px] uppercase font-areaExt"
                  color="primary"
                >
                  {props.dateTwo}
                </Typography>
              </Box>
            </Box>

            <Box className={props.SocialClassName}>
              {/* Web */}
              <Box className="absolute gap-4 bottom-6 md:bottom-9  text-center place-content-center hidden md:flex md:right-10 lg:right-20">
                <Link
                  className="cursor-pointer"
                  to={""}
                  title="Visit our socials"
                >
                  <Instagram />
                </Link>
                <Link
                  className="cursor-pointer"
                  to={""}
                  title="Visit our socials"
                >
                  <Facebook />
                </Link>
                <Link
                  className="cursor-pointer"
                  to={""}
                  title="Visit our socials"
                >
                  <Pinterest />
                </Link>
                <Link
                  className="cursor-pointer"
                  to={""}
                  title="Visit our socials"
                >
                  <Twitter />
                </Link>
              </Box>
              {/* Mobile */}
              <Box className="absolute gap-4 bottom-6 md:bottom-9  text-center place-content-center flex md:hidden right-0 left-0">
                <Link
                  className="cursor-pointer"
                  to={""}
                  title="Visit our socials"
                >
                  <Instagram />
                </Link>
                <Link
                  className="cursor-pointer"
                  to={""}
                  title="Visit our socials"
                >
                  <Facebook />
                </Link>
                <Link
                  className="cursor-pointer"
                  to={""}
                  title="Visit our socials"
                >
                  <Pinterest />
                </Link>
                <Link
                  className="cursor-pointer"
                  to={""}
                  title="Visit our socials"
                >
                  <Twitter />
                </Link>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={5.5} lg={5.5} className=" relative">
          <Box className="bg-green-100 h-[559.16px]">
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
