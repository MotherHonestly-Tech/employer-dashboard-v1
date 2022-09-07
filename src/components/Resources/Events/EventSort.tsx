import { Box, Typography } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { ReactComponent as SortIcon } from "../../../static/svg/chevron-down.svg";
import { ReactComponent as CancelIcon } from "../../../static/svg/cancel.svg";

type Props = {};

const EventSort = (props: Props) => {
  const [resources, setResources] = useState([]);

  var resUrl = `${process.env.REACT_APP_RES_URL}`;

  // console.log(location.pathname);

  const getResource = async () => {
    try {
      const response = await fetch(resUrl, {
        method: "GET",
      });
      const jsonData = await response.json();
      setResources(jsonData);
      console.log(resources);
    } catch (err) {
      console.error("Cannot find Data");
    }
  };

  useEffect(() => {
    getResource();
  }, []);
  return (
    <Fragment>
      <Box className="bg-white h-12 flex px-6 relative ">
        <Typography
          color="primary"
          className="uppercase p-4"
          sx={{
            fontWeight: 900,
            fontSize: "10px",
            fontFamily: "Area-Extended",
          }}
        >
          Filter By
        </Typography>

        <Link to={"/"} className="cursor-pointer no-underline">
          <Typography
            color="primary"
            className="capitalize p-4 flex font-areaSemi text-[10px]"
          >
            Location
            <SortIcon className="mt-[2px] ml-1" height="10px" width="10px" />
          </Typography>
        </Link>
        <Link to={"/"} className="cursor-pointer no-underline">
          <Typography
            color="primary"
            className="capitalize p-4 flex font-areaSemi text-[10px]"
          >
            Event Date
            <SortIcon className="mt-[2px] ml-1" height="10px" width="10px" />
          </Typography>
        </Link>
        <Link to={"/"} className="cursor-pointer no-underline">
          <Typography
            color="primary"
            className="capitalize p-4 flex font-areaSemi text-[10px]"
          >
            Rating
            <SortIcon className="mt-[2px] ml-1" height="10px" width="10px" />
          </Typography>
        </Link>
        <Link
          to={"/"}
          className="cursor-pointer no-underline bg-pink-600 h-10 rounded-md my-1"
        >
          <Typography
            color="primary"
            className="capitalize p-4 flex font-areaSemi text-[10px] "
          >
            Digital Only
            <CancelIcon className="mt-[2px] ml-1" height="10px" width="10px" />
          </Typography>
        </Link>

        <Box className="absolute right-0 flex">
          <Typography
            color="primary"
            className="capitalize p-4 flex opacity-50  text-[10px] font-areaSemi"
          >
            {resources.length} Results
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
      <Box className="bg-gray-300 h-[1px] w-[100%] opacity-50 overflow-hidden mx-auto absolute"></Box>
    </Fragment>
  );
};

export default EventSort;
