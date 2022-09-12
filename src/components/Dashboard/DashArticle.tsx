import { Box, Grid, Typography } from "@mui/material";
import { Fragment } from "react";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";

import ResCard from "../Resources/SubComponents/ResCard";
import MHButton from "../Button/MHButton";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";

import { ReactComponent as ResArticleIcon } from "../../static/svg/resart.svg";
import { ReactComponent as LeftBtn } from "../../static/svg/left-btn.svg";
import { ReactComponent as RightBtn } from "../../static/svg/right-btn.svg";

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

type ArrowProps = {
  onClick?: (e: React.MouseEvent) => void;
};

function SampleNextArrow(props: ArrowProps) {
  return (
    <Box className="absolute top-[30%] z-10 -right-6">
      <RightBtn className="cursor-pointer" onClick={props.onClick} />
    </Box>
  );
}

function SamplePrevArrow(props: ArrowProps) {
  return (
    <Box className="absolute top-[30%] z-10 -left-8">
      <LeftBtn className="cursor-pointer" onClick={props.onClick} />
    </Box>
  );
}

const DashArticle = (props: ResProps) => {
  const location = useLocation();
  const [resources, setResources] = useState<ResProps[]>([]);
  const [noOfElement, setnoOfElement] = useState(3);

  var resUrl = `${process.env.REACT_APP_RES_URL}`;
  let history = useHistory();

  const { path } = useRouteMatch();

  const handleClickOpen = () => {
    history.push(`resources/articles`);
  };

  const settings = {
    centerMode: true,
    centerPadding: "0px",
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 1400,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

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
      <Box className=" py-12">
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
            <ResArticleIcon className="-mt-2" height="24px" width="25px" />
            Articles
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
          Over 456+ Articles on All Things Caregiving
        </Typography>

        <Box className="mx-auto pt-10 px-0 relative">
          <Grid container spacing={1}>
            <Box className="w-[95%] mx-auto">
              <Slider {...settings}>
                {resources.map((res, index) => (
                  <Grid item xs={12} md={6} lg={4} key={index}>
                    <ResCard
                      cardClass="relative w-[260px] h-[440px] shadow-sm object-cover bg-cream-100 rounded-md"
                      iconClass="hidden"
                      imgBg="bg-cream-200 "
                      bodyBg="bg-white"
                      imageSrc={res.image}
                      top={res.tops}
                      title={res.titles}
                      text={res.texts}
                      category={res.categ}
                      titleUrl={`resources/articles/${res.slugs}`}
                      playUrl={`resources/articles/${res.slugs}`}
                    />
                  </Grid>
                ))}
              </Slider>
            </Box>
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

export default DashArticle;
