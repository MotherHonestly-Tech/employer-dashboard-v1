import { Box, Grid, Typography } from "@mui/material";
import { Fragment } from "react";
import React, { useEffect, useState } from "react";

import { useHistory, useLocation, useRouteMatch } from "react-router-dom";

import { ReactComponent as ResToolkitIcon } from "../../static/svg/resdot.svg";
import { ReactComponent as LeftBtn } from "../../static/svg/left-btn.svg";
import { ReactComponent as RightBtn } from "../../static/svg/right-btn.svg";

import ResCard from "../Resources/SubComponents/ResCard";
import MHButton from "../Button/MHButton";

type ResProps = {
  image?: string;
  tops?: string;
  titles?: string;
  texts?: string;
  categ?: string;
  id?: number;
  slugs?: string;
  createdAt?: string;
  updatedAt?: string;
};

const DashToolkit = (props: ResProps) => {
  const location = useLocation();
  const [resources, setResources] = useState<ResProps[]>([]);
  const [noOfElement, setnoOfElement] = useState(2);

  var resUrl = `${process.env.REACT_APP_RES_URL}`;

  let history = useHistory();

  const { path } = useRouteMatch();

  const handleClickOpen = () => {
    history.push(`resources/toolkits`);
  };

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

  const slice = resources.slice(0, noOfElement);

  useEffect(() => {
    getResource();
  }, []);

  return (
    <Fragment>
      <Box className="bg-lilac-200">
        <Box className=" overscroll-x-hidden mt-6 gap-2 flex px-8" sx={{}}>
          <ResToolkitIcon className="" height="24px" width="25px" />
          <Typography
            variant="body2"
            className="text-center mt-1 font-normal uppercase "
            color="primary"
            sx={{
              fontWeight: 900,
              fontSize: "12px",
              fontFamily: "Area-Extended",
            }}
          >
            The Toolkits
          </Typography>
        </Box>
        <Typography
          variant="h3"
          className="text-left my-2 px-8"
          color="primary"
          sx={{
            fontWeight: 500,
            fontSize: "28px",
            fontFamily: "Columbia-Sans",
          }}
        >
          Resources To Make Life Easier
        </Typography>

        <Box className="mx-auto mt-10">
          <Grid container spacing={12} className="gap-16 px-12 relative">
            <Box className="flex ">
              <Box className="absolute top-[50%] z-10 left-[165px]">
                <LeftBtn
                  className="cursor-pointer"
                  onClick={() => console.log("left")}
                />
              </Box>
              <Box className="absolute top-[50%] z-10 right-12">
                <RightBtn
                  className="cursor-pointer"
                  onClick={() => console.log("right")}
                />
              </Box>
            </Box>
            {slice.map((res, index) => (
              <Grid item xs={4} key={index}>
                <ResCard
                  cardClass="relative w-[320px] h-[440px] object-cover bg-cream-100"
                  iconClass="hidden"
                  imgBg="bg-cream-200 "
                  bodyBg="bg-cream-100"
                  imageSrc={res.image}
                  // top={res.tops}
                  title={res.titles}
                  // text={res.texts}
                  category={res.categ}
                  titleUrl={`resources/toolkits/${res.slugs}`}
                  playUrl={`resources/toolkits/${res.slugs}`}
                />
              </Grid>
            ))}
          </Grid>

          <div className="flex justify-center py-8">
            <MHButton onClick={() => handleClickOpen()} sx={{ width: "113px" }}>
              View All
            </MHButton>
          </div>
        </Box>
      </Box>
    </Fragment>
  );
};

export default DashToolkit;
