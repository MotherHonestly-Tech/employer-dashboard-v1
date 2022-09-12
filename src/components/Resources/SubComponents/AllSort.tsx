import { Box, Typography } from "@mui/material";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import { ReactComponent as SortIcon } from "../../../static/svg/chevron-down.svg";

type AllSortProps = {
  resourcesLength: number | undefined;
};

const AllSort = (props: AllSortProps) => {
  return (
    <Fragment>
      <Box className="bg-white h-12 flex px-8 relative ">
        <Typography
          color="primary"
          className="uppercase p-4"
          sx={{
            fontWeight: 900,
            fontSize: "10px",
            fontFamily: "Area-Extended",
          }}
        >
          All Categories
        </Typography>

        <Typography
          color="primary"
          className="capitalize p-4 flex"
          sx={{
            fontWeight: 600,
            fontSize: "10px",
            fontFamily: "Area-Normal-Semibold",
          }}
        >
          Career
          <Typography
            className="px-1"
            sx={{
              fontWeight: 600,
              fontSize: "8px",
              fontFamily: "Area-Normal-Semibold",
            }}
          >
            {" "}
            126
          </Typography>
        </Typography>

        <Typography
          color="primary"
          className="capitalize p-4 flex"
          sx={{
            fontWeight: 600,
            fontSize: "10px",
            fontFamily: "Area-Normal-Semibold",
          }}
        >
          Household
          <Typography
            className="px-1"
            sx={{
              fontWeight: 600,
              fontSize: "8px",
              fontFamily: "Area-Normal-Semibold",
            }}
          >
            {" "}
            45
          </Typography>
        </Typography>

        <Typography
          color="primary"
          className="capitalize p-4 flex"
          sx={{
            fontWeight: 600,
            fontSize: "10px",
            fontFamily: "Area-Normal-Semibold",
          }}
        >
          Finance
          <Typography
            className="px-1"
            sx={{
              fontWeight: 600,
              fontSize: "8px",
              fontFamily: "Area-Normal-Semibold",
            }}
          >
            {" "}
            76
          </Typography>
        </Typography>

        <Box className="absolute right-12 flex">
          <Typography
            color="primary"
            className="capitalize p-4 flex opacity-50 text-[10px] font-areaSemi"
          >
            {props.resourcesLength} Results
          </Typography>
          <Link to={"/"} className="cursor-pointer no-underline">
            <Typography
              color="primary"
              className="capitalize p-4 flex font-areaSemi text-[10px]"
            >
              Sort by
              <SortIcon className="mt-[2px] ml-1" height="10px" width="10px" />
            </Typography>
          </Link>
        </Box>
      </Box>
      <Box className="bg-gray-300 h-[1px] w-[84.6%] opacity-50 overflow-hidden mx-auto absolute"></Box>
    </Fragment>
  );
};

export default AllSort;
