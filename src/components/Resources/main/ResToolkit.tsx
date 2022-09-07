import { Box, Grid, Typography } from "@mui/material";
import { Fragment } from "react";
import React, { useEffect, useState } from "react";

import MHButton from "../../Button/MHButton";
import ResCard from "../SubComponents/ResCard";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";

import { ReactComponent as ResToolkitIcon } from "../../../static/svg/resdot.svg";

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

const ResToolkit = (props: ResProps) => {
  const location = useLocation();
  const [resources, setResources] = useState<ResProps[]>([]);
  const [noOfElement, setnoOfElement] = useState(2);

  var resUrl = `${process.env.REACT_APP_RES_URL}`;

  let history = useHistory();

  const { path } = useRouteMatch();

  const handleClickOpen = () => {
    history.push(`${path}/toolkits`);
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
          <Grid container spacing={24} className="gap-16 px-24">
            {slice.map((res, index) => (
              <Grid item xs={4} key={index}>
                <ResCard
                  cardClass="relative w-[350px] h-fit object-cover bg-cream-100"
                  iconClass="hidden"
                  imgBg="bg-cream-200 "
                  bodyBg="bg-cream-100"
                  imageSrc={res.image}
                  // top={res.tops}
                  title={res.titles}
                  // text={res.texts}
                  category={res.categ}
                  titleUrl={`${location.pathname}/${res.slugs}`}
                  playUrl={`${location.pathname}/${res.slugs}`}
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

export default ResToolkit;
