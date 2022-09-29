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
        className="relative h-96 w-full bg-lilac-200 overflow-hidden"
        // sx={{ background: "red" }}
      >
        <img
          src={props.BgUrl}
          alt={props.title}
          style={{
            width: "550px",
            height: "384px",
          }}
        />
        <Box className="" sx={{}}>
          {props.children}
        </Box>

        <Box className="absolute top-24 inset-x-[50%] text-center place-content-center">
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
                alt=""
                className="mt-10"
                style={{
                  width: "23px",
                  height: "26px",
                }}
              />

              <Typography
                variant="body2"
                className="text-center mt-10 font-bold font-areaExt text-[16px]  uppercase "
                color="primary"
              >
                {props.title}
              </Typography>
            </Box>
            <Typography
              variant="body2"
              className="text-left mt-1 font-semibold font-areaSemi text-[24px] "
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
        </Box>
      </Box>
    </Fragment>
  );
};

export default AllresHeader;
