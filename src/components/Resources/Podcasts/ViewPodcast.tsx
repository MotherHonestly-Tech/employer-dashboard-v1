import React, { Fragment, useEffect, useState } from "react";
import ViewHeader from "../SubComponents/ViewHeader";
import Typography from "@mui/material/Typography";
import { Box, Grid } from "@mui/material";
import ResCard from "../SubComponents/ResCard";
import { useLocation } from "react-router-dom";
import PodcastPlayer from "./PodcastPlayer";

type ComponentProps = {
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

const ViewPodcast = (props: ComponentProps) => {
  const location = useLocation();
  const [resources, setResources] = useState<ComponentProps[]>([]);

  const [noOfElement, setnoOfElement] = useState(8);
  const slice = resources.slice(0, noOfElement);

  var resUrl = `${process.env.REACT_APP_RES_URL}`;

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

  const [data, setData] = useState<any>("");

  var viewUrl = `https://mocki.io/v1/eae5c0ae-f56b-440a-8384-3b596d9e51c4`;

  const getData = async () => {
    try {
      const response = await fetch(viewUrl, {
        method: "GET",
      });
      const jsonData = await response.json();
      setData(jsonData);
    } catch (err) {
      console.error("Cannot find Data");
    }
  };

  useEffect(() => {
    getResource();
    getData();
  }, []);
  return (
    <Fragment>
      <ViewHeader
        titles={data.title}
        description={data.titleDetails}
        imageUrl={data.bgImageUrl}
        categoryOne="Career"
        categoryTwo={data.category}
        downloadLink="https://podcasts.google.com/feed/aHR0cHM6Ly9mZWVkLnBvZGJlYW4uY29tL21vdGhlcmhvbmVzdGx5L2ZlZWQueG1s"
        downloadClassName="flex -ml-4 my-8 hidden"
        date={data.date}
        ticketClassName="py-6 hidden"
        podClassName="mt-10 flex gap-32"
        dateClassName="hidden text-left pb-2 w-3/4 text-base font-areaSemi"
        episodeClassName=" text-left pb-2 w-3/4 text-base font-areaSemi"
        episode={data.episode}
        season={data.season}
      />

      <Box className="px-40 py-10 bg-white">
        <Box className="mx-auto pt-10 bg-white px-12 py-4">
          <Typography
            variant="h1"
            color="primary"
            className="font-areaSemi text-xl text-center py-4"
          >
            Listen Now
          </Typography>

          <PodcastPlayer
            // appleUrl="https://embed.podcasts.apple.com/us/podcast/finding-flexibility-and-confidence-as-a-working/id1439395271?i=1000567545032"
            spotifyUrl={data.podUrl}
          />
        </Box>

        <Typography
          variant="h3"
          color="primary"
          className="text-xl mt-12 font-areaSemi"
        >
          Key Takeaway:
        </Typography>

        <Box className="mt-8">
          <Box className="flex mb-4">
            {/* <Box className="font-areaExt bg-yellow-100 px-2 pt-1 text-sm rounded-full">
              1
            </Box> */}
            <Typography
              variant="h3"
              color="primary"
              className="text-base px-24 uppercase font-areaNorm"
            >
              {data.keypoint}
            </Typography>
          </Box>
          <Typography
            variant="body2"
            color="primary"
            className="text-[13px] px-24 my-4 leading-[200%] font-areaSemi"
          >
            {data.keynote}
          </Typography>
        </Box>
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
          {slice.map((res, index) => (
            <Grid item xs={12} md={6} lg={3} key={index}>
              <ResCard
                cardClass="relative mb-10 w-[270px] h-[460px] object-cover bg-cream-100 rounded-md"
                iconClass="hidden"
                imgBg="bg-cream-200 "
                bodyBg="bg-cream-100"
                imageSrc={res.image}
                top={res.tops}
                title={res.titles}
                text={res.texts}
                category={res.categ}
                titleUrl={`${location.pathname}/${res.slugs}`}
                playUrl={`${location.pathname}/${res.slugs}`}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Fragment>
  );
};

export default ViewPodcast;
