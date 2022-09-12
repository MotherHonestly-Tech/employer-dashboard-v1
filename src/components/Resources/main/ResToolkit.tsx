import { Box, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';

import MHButton from '../../Button/MHButton';
import ResCard from '../SubComponents/ResCard';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';

import { ReactComponent as ResToolkitIcon } from '../../../static/svg/resdot.svg';
import { ReactComponent as LeftBtn } from '../../../static/svg/left-btn.svg';
import { ReactComponent as RightBtn } from '../../../static/svg/right-btn.svg';

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
    <Box className="absolute top-[30%] z-10 right-0">
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

const ResToolkit = (props: ResProps) => {
  const location = useLocation();
  const [resources, setResources] = useState<ResProps[]>([]);
  const [noOfElement, setnoOfElement] = useState(3);

  var resUrl = `${process.env.REACT_APP_RES_URL}`;

  const settings = {
    centerMode: true,
    centerPadding: '0px',
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 1100,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };

  let history = useHistory();

  const { path } = useRouteMatch();

  const handleClickOpen = () => {
    history.push(`${path}/toolkits`);
  };

  // console.log(location.pathname);

  const getResource = async () => {
    try {
      const response = await fetch(resUrl, {
        method: 'GET'
      });
      const jsonData = await response.json();
      setResources(jsonData);
      // console.log(resources);
    } catch (err) {
      // console.error("Cannot find Data");
    }
  };

  const slice = resources.slice(0, noOfElement);

  useEffect(() => {
    getResource();
  }, []);

  return (
    <Box bgcolor="#F6F8F5" paddingTop={5}>
      <Box display="flex" paddingX={3} className=" overscroll-x-hidden gap-2">
        <ResToolkitIcon className="" height="24px" width="25px" />
        <Typography
          variant="body2"
          color="primary"
          fontWeight="900"
          fontSize="12px"
          fontFamily="Area-Extended"
          textAlign="center"
          textTransform="uppercase">
          The Toolkits
        </Typography>
      </Box>
      <Typography
        variant="h3"
        className="text-left my-2 px-8"
        color="primary"
        sx={{
          fontWeight: 500,
          fontSize: '28px',
          fontFamily: 'Columbia-Sans'
        }}>
        Resources To Make Life Easier
      </Typography>

      <Box className="mx-auto pt-10 px-20 relative">
        <Grid container spacing={0}>
          <Box className="w-[95%] mx-auto ">
            <Slider {...settings}>
              {resources.map((res, index) => (
                <Grid item xs={3} key={index}>
                  <ResCard
                    cardClass="relative w-[300px] shadow-none h-[420px] object-cover bg-cream-100"
                    iconClass="hidden"
                    imgBg="bg-cream-200 "
                    bodyBg="bg-cream-100"
                    imageSrc={res.image}
                    // top={res.tops}
                    title={res.titles}
                    // text={res.texts}
                    category={res.categ}
                    titleUrl={`${location.pathname}/toolkits/${res.slugs}`}
                    playUrl={`${location.pathname}/toolkits/${res.slugs}`}
                  />
                </Grid>
              ))}
            </Slider>
          </Box>
        </Grid>

        <div className="flex justify-center py-8">
          <MHButton onClick={() => handleClickOpen()} sx={{ width: '113px' }}>
            View All
          </MHButton>
        </div>
      </Box>
    </Box>
  );
};

export default ResToolkit;
