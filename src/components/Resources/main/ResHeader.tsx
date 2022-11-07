import { Box, Typography } from "@mui/material";
import React, { Fragment } from "react";

import { ReactComponent as ResAll } from "../../../static/svg/all-res.svg";
import { ReactComponent as ResOne } from "../../../static/svg/resone.svg";
import { ReactComponent as ResTwo } from "../../../static/svg/restwo.svg";
import { ReactComponent as ResThree } from "../../../static/svg/resthree.svg";
import { ReactComponent as ResFour } from "../../../static/svg/resfour.svg";

type Props = {};

const ResHeader = (props: Props) => {
  return (
    <Fragment>
      <Box
        position="relative"
        mx="auto"
        height={400}
        overflow={"hidden"}
        bgcolor="#F3F4F6"
      >
        <Box className="overscroll-x-hidden" sx={{}}>
          <ResOne
            className="absolute -top-20 left-16"
            height="350px"
            width="250px"
          />
          <ResThree
            className="absolute -top-16 right-52"
            height="350px"
            width="250px"
          />
        </Box>

        <Box component="div" className="mx-auto">
          <Typography
            variant="h3"
            className="text-center mx-auto mt-24 "
            color="primary"
            sx={{
              fontWeight: 500,
              fontSize: "35px",
              fontFamily: "Columbia-Sans",
            }}
          >
            Resources
          </Typography>
          <ResAll className=" mx-auto pt-8" height="100px" width="300px" />

          <Box className="relative text-center place-content-center">
            <Typography
              variant="body2"
              className=" text-center w-[450px] z-10 mx-auto absolute left-0 right-0 text-[14px] font-areaSemi"
              color="primary"
            >
              Achieve your personal and professional goals with personalized
              solutions from our specialized experts in career, care, and
              wellbeing.
            </Typography>
          </Box>
        </Box>

        <Box className="overscroll-x-hidden " sx={{}}>
          <ResTwo className="absolute top-36 left-52" height="350px" />
          <ResFour className="absolute top-[270px] right-0" width="400px" />
        </Box>
      </Box>
    </Fragment>
  );
};

export default ResHeader;
