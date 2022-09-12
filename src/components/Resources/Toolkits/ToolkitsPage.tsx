import { Fragment } from "react";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import ResCard from "../SubComponents/ResCard";

import { ReactComponent as BgOverlay } from "../../../static/svg/toolkit.svg";
import AllSort from "../SubComponents/AllSort";
import AllresHeader from "../SubComponents/AllresHeader";
import { Box, Grid } from "@mui/material";
import Footer from "../../Layout/Footer";
import Pagination from "../../UI/Pagination";

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

const ToolkitsPage = (props: ResProps) => {
  const location = useLocation();
  const [resources, setResources] = useState<ResProps[]>([]);

  var resUrl = `${process.env.REACT_APP_RES_URL}`;

  console.warn('resUrl', resUrl);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(8);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = resources.slice(firstPostIndex, lastPostIndex);

  const getResource = async () => {
    try {
      const response = await fetch(resUrl, {
        method: "GET",
      });
      const jsonData = await response.json();
      setResources(jsonData);
      // console.log(resources);
    } catch (err) {
      // console.error("Cannot find Data");
    }
  };

  useEffect(() => {
    getResource();
  }, []);
  return (
    <Fragment>
      <AllresHeader
        boxClassName="place-content-center overscroll-x-hidden gap-2 flex pb-4"
        title="Toolkits & Guides"
        titleInfo="Download Our Helpful Toolkits"
        titleInfoclassName="text-center my-2 w-full font-columbia text-2xl capitalize font-[500]"
        pageInfo="  Achieve your personal and professional goals with personalized
      solutions from our specialized experts in career, care, and s
      wellbeing."
        pageInfoClassName="font-semibold text-[12px] font-areaSemi"
        ResIconUrl="https://res.cloudinary.com/mother-honestly/image/upload/v1661643245/image_lqxpea.png"
        BgUrl="https://res.cloudinary.com/mother-honestly/image/upload/v1661639768/image_bfore8.png"
      >
        {/* <ResToolkitIcon className="" height="24px" width="25px" /> */}
        <BgOverlay
          className="overflow-hidden absolute -top-6 right-0 "
          height="350px"
          width="350px"
        />
      </AllresHeader>

      <AllSort resourcesLength={resources.length} />

      <Box className="mx-auto pt-10 bg-white px-12 py-4">
        <Grid container spacing={2}>
          {currentPosts.map((res, index) => (
            <Grid item xs={12} md={6} lg={3} key={index}>
              <ResCard
                cardClass="relative mb-10 w-[250px] h-[400px] object-cover bg-cream-100 rounded-md"
                iconClass="hidden"
                imgBg="bg-cream-200 "
                bodyBg="bg-cream-100"
                imageSrc={res.image}
                top={res.tops}
                title={res.titles}
                category={res.categ}
                titleUrl={`${location.pathname}/${res.slugs}`}
                playUrl={`${location.pathname}/${res.slugs}`}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Pagination
        totalPosts={resources.length}
        postsPerPage={postsPerPage}
        onClick={() => {
          setCurrentPage(currentPage - 1);
        }}
        onClicked={() => {
          setCurrentPage(currentPage + 1);
        }}
        currentPage={currentPage}
      />
      <Footer />
    </Fragment>
  );
};

export default ToolkitsPage;
