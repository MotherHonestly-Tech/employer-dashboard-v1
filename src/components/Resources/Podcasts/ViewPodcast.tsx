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

  const [noOfElement, setnoOfElement] = useState(4);
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

  var viewUrl = `${process.env.REACT_APP_ALL_RES_VIEW_URL}${params.id}`;

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
        description="This is an episode of our podcast, Listen and enjoy!"
        imageUrl={data.thumbNailImageSrc}
        // imageUrl="https://res.cloudinary.com/mother-honestly/image/upload/v1661545700/image_hsichu.png"
        categoryClassName="md:bottom-0 lg:-bottom-5 md:absolute"
        categoryOne={data.itemList ? data.itemList[0] : ""}
        categoryTwo={data.itemList ? data.itemList[1] : ""}
        downloadLink="https://podcasts.google.com/feed/aHR0cHM6Ly9mZWVkLnBvZGJlYW4uY29tL21vdGhlcmhvbmVzdGx5L2ZlZWQueG1s"
        downloadClassName="flex -ml-4 my-8 hidden"
        date={data.date}
        ticketClassName="py-6 hidden"
        timeClassName="hidden"
        podClassName="md:bottom-12 lg:bottom-[210px] md:absolute md:flex podClass gap-32 md:gap-24 lg:gap-32 py-14 md:py-0"
        dateClassName="hidden text-left pb-2 w-3/4 text-base font-areaSemi"
        episodeClassName=" text-left pb-2 w-3/4 text-[22px] font-areaSemi"
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
      <Box className="px-6 w-full md:px-20 lg:px-48 pb-6 bg-white">
        <Typography
          variant="h3"
          color="primary"
          className="text-[22px] mb-4 text-left font-areaSemi font-[500]"
        >
          Key Takeaways:
        </Typography>
        <Box className="flex">
          {/* Content */}
          <div dangerouslySetInnerHTML={{ __html: data.description }} />
        </Box>
      </Box>

      <Box className="bg-gray-300 h-[1px] w-[91.4%] opacity-50 overflow-hidden mx-auto"></Box>

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
