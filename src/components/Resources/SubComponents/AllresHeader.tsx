import { Box, Typography } from "@mui/material";
import React, { Fragment } from "react";

type HeaderProps = {
  BgUrl: string;
  ResIconUrl: string;
  title: string;
  titleExt?: string;
  titleInfo: string;
  pageInfo: string;
  pageInfoClassName: string;
  titleInfoclassName: string;
  boxClassName: string;
  podClassName?: string;
  children: React.ReactNode;
};

const AllresHeader = (props: HeaderProps) => {
  return (
    <Fragment>
      <Box
        className="relative h-auto w-full bg-lilac-300 overflow-hidden"
        // sx={{ background: "red" }}
      >
        <img
          src={props.BgUrl}
          alt="Podcast Image"
          style={{
            width: "625px",
            height: "420px",
          }}
        />
        <Box className="" sx={{}}>
          {props.children}
        </Box>

        <Box className="absolute top-24 inset-x-[55%] text-center place-content-center">
          <Typography
            variant="body2"
            className="text-center w-[500px]"
            color="primary"
            sx={{
              fontWeight: 600,
              fontSize: "12px",
              fontFamily: "Area Normal",
            }}
          >
            <Box className={props.boxClassName} sx={{}}>
              <img
                src={props.ResIconUrl}
                alt="Podcast Image"
                className="mt-8"
                style={{
                  width: "26px",
                  height: "26px",
                }}
              />

              <Typography
                variant="body2"
                className="text-center mt-10 font-bold font-areaExt text-[12px]  uppercase "
                color="primary"
              >
                {props.title}
              </Typography>
            </Box>
            <Typography
              variant="body2"
              className="text-left mt-1 font-semibold font-areaSemi text-[22px] "
              color="primary"
            >
              {props.titleExt}
            </Typography>
            <Typography
              variant="h3"
              className={props.titleInfoclassName}
              color="primary"
            >
              {props.titleInfo}
            </Typography>
            <Typography
              variant="body2"
              color="primary"
              className={props.pageInfoClassName}
            >
              {props.pageInfo}
            </Typography>
          </Typography>

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
                className="h-12 my-2 md:my-0 md:h-10 w-fit md:absolute md:mt-12 md:mt-0"
                alt="Podcast Image"
              />
            </button>

            <br className="block md:hidden" />
            <button
              onClick={() => {
                window.open(
                  "https://podcasts.apple.com/us/podcast/mother-honestly-podcast/id1439395271"
                );
              }}
            >
              <img
                src="https://res.cloudinary.com/mother-honestly/image/upload/v1668612775/apple-pod_yzrrsw.png"
                className="h-12 my-2 md:my-0 md:h-10 w-fit md:left-28 md:absolute"
                alt="Podcast Image"
              />
            </button>
            <br className="block md:hidden" />

            <button
              onClick={() => {
                window.open(
                  "https://podcasts.google.com/feed/aHR0cHM6Ly9mZWVkLnBvZGJlYW4uY29tL21vdGhlcmhvbmVzdGx5L2ZlZWQueG1s"
                );
              }}
            >
              <img
                src="https://res.cloudinary.com/mother-honestly/image/upload/v1668612775/google-pod_eavovx.png"
                className="h-12 my-2 md:my-0 md:h-10 w-fit md:absolute md:left-[275px]"
                alt="Podcast Image"
              />
            </button>
          </Box>
        </Box>
      </Box>
    </Fragment>
  );
};

export default AllresHeader;
