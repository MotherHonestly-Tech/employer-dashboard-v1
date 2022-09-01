import { Box, Grid, Typography } from "@mui/material";
import { Fragment } from "react";
import React, { useEffect, useState } from "react";

import { ReactComponent as ResVidIcon } from "../../../static/svg/resvid.svg";
import MHButton from "../../Button/MHButton";
import ResCard from "../SubComponents/ResCard";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";

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

const ResVideo = (props: ResProps) => {
  const location = useLocation();
  const [resources, setResources] = useState<ResProps[]>([]);
  const [noOfElement, setnoOfElement] = useState(4);

  var resUrl = `${process.env.REACT_APP_RES_URL}`;
  let history = useHistory();

  const { path } = useRouteMatch();

  const handleClickOpen = () => {
    history.push(`${path}/videos`);
  };

  console.log(resUrl);

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
      <Box className=" py-12 bg-white">
        <Box className="mx-auto overscroll-x-hidden flex" sx={{}}>
          <Typography
            variant="body2"
            className="mx-auto gap-2 flex font-normal uppercase "
            color="primary"
            sx={{
              fontWeight: 900,
              fontSize: "12px",
              fontFamily: "Area-Extended",
            }}
          >
            <ResVidIcon className="-mt-2" height="24px" width="25px" />
            Videos
          </Typography>
        </Box>
        <Typography
          variant="h3"
          className="mx-auto text-center my-2 "
          color="primary"
          sx={{
            fontWeight: 500,
            fontSize: "28px",
            fontFamily: "Columbia-Sans",
          }}
        >
          On-Demand Resources
        </Typography>

        <Box className="mx-auto pt-10 bg-white px-6 pb-4">
          <Grid container spacing={2}>
            {slice.map((res, index) => (
              <Grid item xs={12} md={6} lg={3} key={index}>
                <ResCard
                  cardClass="relative w-[280px] h-[420px] object-cover bg-cream-100 rounded-md"
                  iconClass="absolute top-10 ml-20 mt-12 w-20 h-20"
                  imgBg="bg-cream-200 "
                  bodyBg="bg-cream-100"
                  imageSrc={res.image}
                  top={res.tops}
                  title={res.titles}
                  category={res.categ}
                  titleUrl={`${location.pathname}/videos/${res.slugs}`}
                  playUrl={`${location.pathname}/videos/${res.slugs}`}
                />
              </Grid>
            ))}
          </Grid>
          <div className="flex justify-center py-12">
            <MHButton onClick={() => handleClickOpen()} sx={{ width: "113px" }}>
              View All
            </MHButton>
          </div>

          <Box className="bg-gray-300 h-[2px] w-[98%] mx-auto"></Box>
        </Box>
      </Box>
    </Fragment>
  );
};

export default ResVideo;
