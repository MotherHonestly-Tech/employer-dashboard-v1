import { Box, Typography } from "@mui/material";
import React, { Fragment } from "react";

import { ReactComponent as ResAll } from "../../../static/svg/all-res.svg";
import { ReactComponent as ResTop } from "../../../static/svg/res-top.svg";
import { ReactComponent as ResBottom } from "../../../static/svg/res-bottom.svg";

type Props = {};

const ResHeader = (props: Props) => {
  return (
    <Fragment>
      <Box
        className="relative w-full mx-auto h-[400px] bg-lilac-200 overflow-hidden"
        sx={
          {
            // background: "red",
          }
        }
      >
        <Box className="overscroll-x-hidden" sx={{}}>
          <ResTop
            className="absolute -top-40 left-12"
            height="480px"
            width="700px"
          />
        </Box>

        <Box component="div" className="mx-auto">
          <Typography
            variant="h3"
            className="text-center mt-24 "
            color="primary"
            sx={{
              fontWeight: 500,
              fontSize: "30px",
              fontFamily: "Columbia-Sans",
            }}
          >
            Resources
          </Typography>
          <ResAll className=" mx-auto" height="100px" width="300px" />

          <Box className="text-center place-content-center">
            <Typography
              variant="body2"
              className="text-center mt-2 w-2/4 absolute inset-x-64 text-[12px] font-areaSemi"
              color="primary"
            >
              Achieve your personal and professional goals with personalized
              solutions from our specialized experts in career, care, and
              wellbeing.
            </Typography>
          </Box>
        </Box>

        <Box className="overscroll-x-hidden" sx={{}}>
          <ResBottom
            className="absolute top-24 left-64"
            height="480px"
            width="700px"
          />
        </Box>
      </Box>
    </Fragment>
  );
};

export default ResHeader;
