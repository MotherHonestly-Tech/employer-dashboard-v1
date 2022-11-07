import { Fragment } from "react";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import ResCard from "../SubComponents/ResCard";

import { ReactComponent as BgOverlay } from "../../../static/svg/video.svg";
import AllSort from "../SubComponents/AllSort";
import AllresHeader from "../SubComponents/AllresHeader";
import { Box, Grid } from "@mui/material";
import Footer from "../../Layout/Footer";
import Pagination from "../../UI/Pagination";
import AuthContext from "../../../store/context/auth-context";

type ResProps = {
  thumbNailImageSrc?: string;
  itemList?: string[];
  title?: string;
  texts?: string;
  categ?: string;
  id?: number;
  slug?: string;
  createdAt?: string;
  updatedAt?: string;
};

const VideosPage = (props: ResProps) => {
  const location = useLocation();
  const [resources, setResources] = useState<ResProps[]>([]);

  const authCtx = React.useContext(AuthContext);
  const { token, userId } = authCtx;

  const params = useParams<any>();

  var resUrl = `${process.env.REACT_APP_RES_VIDEO_URL}`;

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(8);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = resources.slice(firstPostIndex, lastPostIndex);

  const getResource = async () => {
    try {
      const response = await fetch(resUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.accessToken}`,
        },
      });
      const jsonData = await response.json();
      setResources(jsonData.data);
      console.log(resources);
    } catch (err) {
      console.error("Cannot find Data");
    }
  };

  useEffect(() => {
    getResource();
  }, []);

  if (!token) {
    return null;
  }

  return (
    <Fragment>
      <AllresHeader
        boxClassName="place-content-center overscroll-x-hidden gap-2 flex pb-4"
        title="Videos"
        titleInfo="On-Demand Resources"
        titleInfoclassName="text-center my-2 -ml-6 w-full font-columbia text-4xl capitalize font-[500]"
        pageInfo="Achieve your personal and professional goals with personalized
      solutions from our specialized experts in career, care, and s
      wellbeing."
        pageInfoClassName="font-semibold  w-fit text-[14px] font-areaSemi"
        ResIconUrl="https://res.cloudinary.com/mother-honestly/image/upload/v1661645343/image_2_tbop0x.png"
        BgUrl="https://res.cloudinary.com/mother-honestly/image/upload/v1661639769/image_1_anpmco.png"
      >
        {/* <ResToolkitIcon className="" height="24px" width="25px" /> */}
        <BgOverlay
          className="overflow-hidden absolute top-6 -right-12"
          height="400px"
          width="400px"
        />
      </AllresHeader>

      <AllSort resourcesLength={resources.length} />

      <Box className="mx-auto pt-10 bg-white px-12 py-4">
        <Grid container spacing={2}>
          {currentPosts.map((res, index) => (
            <Grid item xs={12} md={6} lg={3} key={index}>
              <ResCard
                cardClass="relative mb-10 w-[270px] h-[390px] object-cover bg-cream-100 rounded-md"
                iconClass="absolute top-10 ml-20 mt-12 w-20 h-20"
                imgBg="bg-sky-400 h-[265px]"
                bodyBg="bg-cream-100"
                imageSrc={res.thumbNailImageSrc}
                // top={res.interests}
                podTop="hidden"
                title={res.title}
                category={res.itemList ? res.itemList[0] : ""}
                categoryTwo={res.itemList ? res.itemList[1] : ""}
                titleUrl={`/organization/resources/videos/${res.slug}/${res.id}`}
                playUrl={`/organization/resources/videos/${res.slug}/${res.id}`}
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

export default VideosPage;
