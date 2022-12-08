import { Fragment } from "react";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import {
  Box,
  Card,
  CardMedia,
  Grid,
  IconButton,
  Typography,
  Zoom,
} from "@mui/material";

import { ReactComponent as BgOverlay } from "../../../static/svg/article.svg";
import Footer from "../../Layout/Footer";
import Pagination from "../../UI/Pagination";
import AllresHeader from "../SubComponents/AllresHeader";
import ResCard from "../SubComponents/ResCard";
import ArticleSort from "./ArticleSort";
import AuthContext from "../../../store/context/auth-context";

type ResProps = {
  thumbNailImageSrc?: string;
  itemList?: string[];
  title?: string;
  author?: string;
  CatchPhrase?: string;
  categ?: string;
  id?: number;
  slug?: string;
  createdAt?: string;
  updatedAt?: string;
};

const ArticlesPage = (props: ResProps) => {
  const location = useLocation();
  const [resources, setResources] = useState<ResProps[]>([]);
  let [count] = useState(0);

  var resUrl = `${process.env.REACT_APP_RES_ARTICLE_URL}`;

  const authCtx = React.useContext(AuthContext);
  const { token, userId } = authCtx;

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(7);

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
        title="Articles"
        titleInfo="Read The Latest Articles + Interviews"
        titleInfoclassName="text-left -ml-14 line-clamp-3 my-2 w-screen font-columbia text-4xl capitalize font-[500]"
        pageInfo="  Achieve your personal and professional goals with personalized
      solutions from our specialized experts in career, care, and
      wellbeing."
        pageInfoClassName="font-semibold line-clamp-3 w-fit text-[14px] font-areaSemi"
        ResIconUrl="https://res.cloudinary.com/mother-honestly/image/upload/v1661645343/image_1_h2qjf3.png"
        BgUrl="https://res.cloudinary.com/kehinde-motherhoneestly/image/upload/v1668532869/MHresources/image_bdm0lx.png"
      >
        {/* <ResToolkitIcon className="" height="24px" width="25px" /> */}
        <BgOverlay
          className="overflow-hidden absolute -bottom-12 -right-20"
          height="400px"
          width="400px"
        />
      </AllresHeader>
      <ArticleSort resourcesLength={resources.length} />

      <Box className="mx-auto pt-10 bg-white px-6 pb-4">
        <Grid container spacing={2}>
          {currentPosts.map((res, index) => (
            <>
              <p className="hidden"> {(count = count + 1)}</p>

              {count === 1 ? (
                <Grid item xs={12} md={12} lg={6}>
                  <Zoom in style={{ transitionDelay: "200ms" }}>
                    <Card
                      className={`relative w-auto h-[460px] object-cover bg-pink-700 rounded-md`}
                    >
                      <IconButton
                        disabled
                        className="absolute outline-none top-[6%] left-[5%]"
                      >
                        {/* <img
                         className="h-6 w-6"
                         src="https://res.cloudinary.com/mother-honestly/image/upload/v1661645343/image_3_woz2ng.png"
                         alt=""
                       /> */}

                        <Typography className=" capitalize font-areaSemi text-[15px] font-[900] leading-[92%] tracking-[0.1rem] text-white">
                          Latest Article
                        </Typography>
                      </IconButton>
                      <Box className="  absolute top-[20%] left-[6%]">
                        <Typography className=" capitalize  w-4/5 font-areaSemi text-[22px] leading-[150%] tracking-[-0.04rem] font-[600] text-white">
                          {res.title}
                        </Typography>
                        {/* <Typography className="pt-4 uppercase w-full font-areaNorm text-[11px] font-[900] leading-[102%] tracking-[0.1rem] text-white">
                         {res.createdAt}
                       </Typography>
                       <Typography className="pt-4  w-3/4 font-areaSemi -3 text-[15px] font-[700] leading-[200%] tracking-[0.02rem]  text-white">
                         {res.texts}
                       </Typography> */}

                        <Box className="pt-12 space-x-4">
                          <Link
                            to={`${location.pathname}/${res.slug}/${res.id}
                     `}
                            className="bg-white w-[108px] no-underline  px-6 py-4 h-[45px] text-navy-900 font-areaSemi not-italic text-[12px] font-[700] leading-[102%] tracking-[0.05rem]"
                          >
                            Read
                          </Link>
                          {/* <Link
                           to={`${location.pathname}/events/${res.slugs}
                     `}
                           className="bg-white w-[120px] no-underline px-8 py-4 h-[45px] text-navy-900 font-areaSemi not-italic text-[12px] font-[700] leading-[102%] tracking-[0.05rem]"
                         >
                           Watch Video
                         </Link> */}
                        </Box>
                      </Box>
                      <CardMedia
                        className="object-cover h-[460px]"
                        component="img"
                        image={res.thumbNailImageSrc}
                        // image="https://res.cloudinary.com/mother-honestly/image/upload/v1661545700/image_hsichu.png"
                        alt="Resource Image"
                      />
                    </Card>
                  </Zoom>
                </Grid>
              ) : count >= 2 ? (
                <Grid item xs={12} md={6} lg={3} key={index}>
                  <ResCard
                    cardClass="relative w-[280px] mb-10 h-[460px] object-cover bg-cream-100 rounded-md shadow-sm"
                    iconClass="hidden absolute top-10 ml-20 mt-12 w-20 h-20" //absolute top-10 ml-20 mt-12 w-20 h-20
                    imgBg="bg-navy-100 h-[280px]"
                    bodyBg="bg-cream-100"
                    imageSrc={res.thumbNailImageSrc}
                    podTop="hidden"
                    top={res.itemList ? res.itemList[0] : ""}
                    title={res.title}
                    text={res.CatchPhrase}
                    category={res.itemList ? res.itemList[0] : ""}
                    categoryTwo={res.itemList ? res.itemList[1] : ""}
                    titleUrl={`/organization/resources/articles/${res.slug}/${res.id}`}
                    playUrl={`/organization/resources/articles/${res.slug}/${res.id}`}
                  />
                </Grid>
              ) : null}
            </>
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

export default ArticlesPage;
