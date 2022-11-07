import React, { Fragment, useEffect, useState } from "react";
import ViewHeader from "../SubComponents/ViewHeader";
import Typography from "@mui/material/Typography";
import { Box, Grid } from "@mui/material";
import ResCard from "../SubComponents/ResCard";
import { useLocation, useParams } from "react-router-dom";
import PodcastPlayer from "./PodcastPlayer";
import AuthContext from "../../../store/context/auth-context";

type ComponentProps = {
  thumbNailImageSrc?: string;
  itemList?: string[];
  season?: string;
  episode?: string;
  title?: string;
  texts?: string;
  categ?: string;
  id?: number;
  slug?: string;
  createdAt?: string;
  updatedAt?: string;
};

const ViewPodcast = (props: ComponentProps) => {
  const location = useLocation();
  const [resources, setResources] = useState<ComponentProps[]>([]);

  const [noOfElement, setnoOfElement] = useState(8);
  const slice = resources.slice(0, noOfElement);

  var resUrl = `${process.env.REACT_APP_RES_PODCAST_URL}`;

  const authCtx = React.useContext(AuthContext);
  const { token, userId } = authCtx;

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

  const [data, setData] = useState<any>("");

  const params = useParams<any>();
  console.log(params.id!);

  var viewUrl = `${process.env.REACT_APP_RES_PODCAST_VIEW_URL}${params.id}`;

  const getData = async () => {
    try {
      const response = await fetch(viewUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.accessToken}`,
        },
      });
      const jsonData = await response.json();
      setData(jsonData.data);
    } catch (err) {
      console.error("Cannot find Data");
    }
  };

  useEffect(() => {
    getResource();
    getData();
  }, []);

  if (!token) {
    return null;
  }

  return (
    <Fragment>
      <ViewHeader
        titles={data.title}
        description={data.description}
        imageUrl="https://res.cloudinary.com/mother-honestly/image/upload/v1661545700/image_hsichu.png"
        categoryOne="Career"
        categoryTwo={data.interests}
        downloadLink="https://podcasts.google.com/feed/aHR0cHM6Ly9mZWVkLnBvZGJlYW4uY29tL21vdGhlcmhvbmVzdGx5L2ZlZWQueG1s"
        downloadClassName="flex -ml-4 my-8 hidden"
        date={data.date}
        ticketClassName="py-6 hidden"
        timeClassName="hidden"
        podClassName="mt-10 flex gap-32"
        dateClassName="hidden text-left pb-2 w-3/4 text-base font-areaSemi"
        episodeClassName=" text-left pb-2 w-3/4 text-base font-areaSemi"
        episode={data.episode}
        season={data.season}
        authorClassName="hidden"
      />

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
          spotifyUrl={data.source}
        />
      </Box>
      <Box className="px-40 py-10 bg-white">
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
                cardClass="relative mb-10 w-[270px] h-[410px] object-cover bg-cream-100 rounded-md"
                iconClass="hidden"
                imgBg="bg-green-100 h-[265px]"
                bodyBg="bg-cream-100"
                imageSrc={res.thumbNailImageSrc}
                // top={res.interests}
                season={res.season}
                episode={res.episode}
                title={res.title}
                category={res.itemList ? res.itemList[0] : ""}
                categoryTwo={res.itemList ? res.itemList[1] : ""}
                titleUrl={`/organization/resources/podcasts/${res.slug}/${res.id}`}
                playUrl={`/organization/resources/podcasts/${res.slug}/${res.id}`}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Fragment>
  );
};

export default ViewPodcast;
