import { Box, Typography } from "@mui/material";
import React, { Fragment } from "react";
import MHButton from "../Button/MHButton";
import CoachingSort from "./CoachingSort";

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

const CoachingHeader = (props: HeaderProps) => {
  return (
    <Fragment>
      <Box className=" h-96 px-40 text-center mx-auto pt-12">
        <Typography
          variant="body2"
          color="primary"
          className="text-center  my-6 w-full font-columbia text-4xl capitalize font-[500]"
        >
          Personal Coaching For Career, Caregiving & More
        </Typography>
        <Typography
          variant="body2"
          className="text-center opacity-50 w-5/6 mx-auto text-sm font-areaSemi"
          color="primary"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt
        </Typography>

        <Box className="py-12 flex gap-4 mx-auto place-content-center">
          <MHButton
            onClick={() => {
              window.open("/");
            }}
            sx={{ width: "121px", height: "33px" }}
          >
            Motherboard
          </MHButton>
          <MHButton
            onClick={() => {
              window.open("/");
            }}
            sx={{ width: "121px", height: "33px" }}
            className="bg-white text-black-300  ring-1 ring-black-300 hover:bg-black-50 hover:text-white"
          >
            Employee
          </MHButton>
        </Box>
      </Box>

      <CoachingSort />
    </Fragment>
  );
};

export default CoachingHeader;
