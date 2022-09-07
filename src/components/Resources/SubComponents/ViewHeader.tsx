import { Box, Grid, Typography } from "@mui/material";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import { ReactComponent as DownloadIcon } from "../../../static/svg/download.svg";

type Props = {};

const ViewHeader = (props: Props) => {
  return (
    <Fragment>
      <Grid container spacing={2} className=" h-80">
        <Grid item xs={12} md={6} lg={7}>
          <Box className="bg-lilac-200 h-full pt-3 ml-12">
            <Typography
              variant="body2"
              color="primary"
              className="text-left  my-6 w-96 font-columbia text-2xl capitalize font-[500]"
            >
              Outsourcing: Your Guide to the Tasks You Can Take off Your Plate,
              from Cooking to Cleaning
            </Typography>
            <Typography
              variant="body2"
              className="text-left  w-96 text-[12px] font-areaSemi"
              color="primary"
            >
              Here’s everything you need to know about hiring help—and why it’s
              worth it.
            </Typography>
            <Box className="flex -ml-4 my-2">
              <button
                onClick={() => {
                  window.open(
                    "https://podcasts.google.com/feed/aHR0cHM6Ly9mZWVkLnBvZGJlYW4uY29tL21vdGhlcmhvbmVzdGx5L2ZlZWQueG1s"
                  );
                }}
              >
                <DownloadIcon className="h-12 " />
              </button>

              <Typography
                variant="body2"
                className="text-left mt-4 text-[12px] uppercase font-areaSemi"
                color="primary"
              >
                Download Toolkit
              </Typography>
            </Box>

            <Typography
              variant="body2"
              className="text-left mt-3 text-[12px] uppercase font-areaNorm"
              color="primary"
            >
              Career
            </Typography>
            <Typography
              variant="body2"
              className="text-left mt-1 text-[10px] opacity-50 capitalize font-areaSemi"
              color="primary"
            >
              Career, Family, Back to Work
            </Typography>

            <Typography
              variant="body2"
              className="text-left mt-2 text-[12px] uppercase font-areaSemi"
              color="primary"
            >
              feb. 22, 2021
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} lg={5} className=" relative">
          <Box className="bg-green-100 h-full mt-6">
            <img
              src="https://res.cloudinary.com/mother-honestly/image/upload/v1661639776/image_2_lqcgpe.png"
              alt=""
              className="overflow-hidden h-80 right-0 absolute"
            />
          </Box>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default ViewHeader;
