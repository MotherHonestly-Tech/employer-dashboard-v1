import { Fragment } from "react";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import ResCard from "../SubComponents/ResCard";

import { ReactComponent as BgOverlay } from "../../../static/svg/podcast.svg";

import AllresHeader from "../SubComponents/AllresHeader";
import { Box, Grid, Typography } from "@mui/material";
import Footer from "../../Layout/Footer";
import PodcastPlayer from "./PodcastPlayer";
import Pagination from "../../UI/Pagination";
import AuthContext from "../../../store/context/auth-context";

type ResProps = {
  s3bucketKeyThumbNail?: string;
  interests?: string;
  title?: string;
  texts?: string;
  categ?: string;
  id?: number;
  slug?: string;
  createdAt?: string;
  updatedAt?: string;
};

const PodcastsPage = (props: ResProps) => {
  const location = useLocation();
  const [resources, setResources] = useState<ResProps[]>([]);

  var resUrl = `${process.env.REACT_APP_RES_PODCAST_URL}`;

  const [noOfElement, setnoOfElement] = useState(1);

  const sliceOne = resUrl.slice(0, noOfElement);

  const authCtx = React.useContext(AuthContext);
  const { token, userId } = authCtx;

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

    console.log();
  }, []);

  if (!token) {
    return null;
  }

  return (
    <Fragment>
      <AllresHeader
        boxClassName="place-content-center overscroll-x-hidden gap-2 flex pb-4"
        title="Podcast"
        titleInfo="The Podcast"
        titleInfoclassName="text-center mb-2 w-full font-columbia text-4xl capitalize font-semibold"
        pageInfo="  Achieve your personal and professional goals with personalized
      solutions from our specialized experts in career, care, and s
      wellbeing."
        podClassName="absolute top-52 left-20 flex gap-32 "
        pageInfoClassName="font-semibold w-fit text-[14px] font-areaSemi"
        ResIconUrl="https://res.cloudinary.com/mother-honestly/image/upload/v1661824668/image_1_oe6a7y.png"
        BgUrl="https://res.cloudinary.com/mother-honestly/image/upload/v1661880063/image_m2yyjt.png"
      >
        {/* <ResToolkitIcon className="" height="24px" width="25px" /> */}
        <BgOverlay
          className="overflow-hidden absolute top-2 right-0"
          height="400px"
          width="400px"
        />
      </AllresHeader>

      <Box className="mx-auto pt-10 bg-white px-12 py-4">
        <Typography
          variant="h1"
          color="primary"
          className="font-areaSemi text-xl text-center py-4"
        >
          Latest Episode
        </Typography>

        <PodcastPlayer
          // appleUrl="https://embed.podcasts.apple.com/us/podcast/finding-flexibility-and-confidence-as-a-working/id1439395271?i=1000567545032"
          spotifyUrl="https://open.spotify.com/embed/episode/2e8huJzMCJKNweADw1A0Kt?utm_source=generator"
        />
      </Box>

      <Box className="mx-auto pt-10 bg-white px-12 py-4">
        <Typography
          variant="h1"
          color="primary"
          className="font-areaSemi text-xl text-center py-4"
        >
          Episodes You Might like
        </Typography>
        <Grid container spacing={2}>
          {currentPosts.map((res, index) => (
            <Grid item xs={12} md={6} lg={3} key={index}>
              <ResCard
                cardClass="relative mb-10 w-[250px] h-auto object-cover bg-cream-100 rounded-md"
                iconClass="hidden"
                imgBg="bg-cream-200 "
                bodyBg="bg-cream-100"
                imageSrc={res.s3bucketKeyThumbNail}
                top={res.interests}
                title={res.title}
                category={res.interests}
                titleUrl={`/organization/resources/podcasts/${res.slug}/${res.id}`}
                playUrl={`/organization/resources/podcasts/${res.slug}/${res.id}`}
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

export default PodcastsPage;
