import { Box, Typography } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { ReactComponent as SortIcon } from "../../static/svg/chevron-down.svg";
import { ReactComponent as ArrowRightIcon } from "../../static/svg/arrow-right-thick.svg";
import MHButton from "../Button/MHButton";
import MHTextInput from "../Form/MHTextInput";

type Props = {};

const CoachingSort = (props: Props) => {
  const [resources, setResources] = useState([]);

  var resUrl = `${process.env.REACT_APP_COACH_URL}`;

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
      <Box className="bg-white h-12 flex px-2 relative ">
        <Typography
          color="primary"
          className="uppercase p-4"
          sx={{
            fontWeight: 900,
            fontSize: "12px",
            fontFamily: "Area-Extended",
          }}
        >
          Filter By
        </Typography>

        <Link to={"/"} className="cursor-pointer no-underline">
          <Typography
            color="primary"
            className="capitalize p-4 flex font-areaSemi text-[12px]"
          >
            Category
            <SortIcon className="mt-[2px] ml-1" height="10px" width="10px" />
          </Typography>
        </Link>
        <Link to={"/"} className="cursor-pointer no-underline">
          <Typography
            color="primary"
            className="capitalize p-4 flex font-areaSemi text-[12px]"
          >
            Expertise
            <SortIcon className="mt-[2px] ml-1" height="10px" width="10px" />
          </Typography>
        </Link>

        <Box
          component={"form"}
          height={30}
          width={250}
          display="flex"
          className="my-2 ml-16 shadow-sm"
        >
          <MHTextInput
            id="search-interest"
            type="text"
            placeholder="Search coach"
            className="flex-grow text-[12px] shadow-inner"
          />
          <MHButton
            sx={{
              minWidth: "auto",
              "& svg": {
                stroke: "grey.500",
                width: "1rem",
              },
              "&.MuiButton-root:hover svg": {
                stroke: "primary",
              },
            }}
            onClick={() => {
              window.open("/");
            }}
          >
            <ArrowRightIcon />
          </MHButton>
        </Box>

        <Box className="absolute right-1 flex">
          <Typography
            color="primary"
            className="capitalize p-4 flex opacity-50  text-[12px] font-areaSemi"
          >
            {resources.length} Results
          </Typography>
        </Box>
      </Box>
      <Box className="bg-black-300 h-[1px] w-[65.4%] opacity-50 overflow-hidden mx-auto absolute"></Box>
    </Fragment>
  );
};

export default CoachingSort;
