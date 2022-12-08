import React, { Fragment, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { Box, Grid } from "@mui/material";
import ResCard from "../SubComponents/ResCard";
import { useLocation, useParams } from "react-router-dom";
import VideoHeader from "./VideoHeader";
import AuthContext from "../../../store/context/auth-context";
import { Socials } from "../SubComponents/Socials";

type ComponentProps = {
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

const ViewVideo = (props: ComponentProps) => {
  const location = useLocation();
  const [resources, setResources] = useState<ComponentProps[]>([]);

  const [noOfElement, setnoOfElement] = useState(4);
  const slice = resources.slice(0, noOfElement);

  const authCtx = React.useContext(AuthContext);
  const { token, userId } = authCtx;

  var resUrl = `${process.env.REACT_APP_RES_VIDEO_URL}`;

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
  // console.log(params.id!);

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
      <VideoHeader
        title={data.title}
        description="Achieve your personal and professional goals with personalized solutions from our specialized experts in career, care, and wellbeing."
        imageUrl={data.thumbNailImageSrc}
        categoryOne={data.itemList ? data.itemList[0] : ""}
        categoryTwo={data.itemList ? data.itemList[2] : ""}
        downloadClassName="hidden flex -ml-4 my-6"
      />

      <Box className="px-40 py-10 bg-white">
        {/* <img
          src="https://res.cloudinary.com/mother-honestly/image/upload/v1661950701/image_unnc52.png"
          alt=""
          className="mx-auto my-6 w-full h-[600px]"
        /> */}

        <Box>
          {/* <iframe
            src="https://www.youtube.com/embed?v=Nn456EU1sUA&ab_channel=ShahzadaSalman"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="w-full h-full md:h-[400px] lg:h-[700px]"
            title={data.title}
          ></iframe> */}

          <iframe
            // src="https://www.youtube.com/embed/Ifld-VPhYgg"
            src={data.source}
            title="How To Install Node.Js App And NPM On Cpanel (Shared Hosting)"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full md:h-[400px] lg:h-[700px]"
          ></iframe>
        </Box>

        <Socials SocialClass="block py-12" />

        <Box className="px-12 pb-6 bg-white">
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
      </Box>

      <Box className="bg-gray-300 h-[1px] w-[91.4%] opacity-50 overflow-hidden mx-auto"></Box>

      <Box className="mx-auto pt-10 bg-white px-12 py-4">
        <Typography
          variant="h1"
          color="primary"
          className="font-areaSemi text-xl text-center py-4"
        >
          Videos You Might like
        </Typography>
        <Grid container spacing={2}>
          {slice.map((res, index) => (
            <Grid item xs={12} md={6} lg={3} key={index}>
              <ResCard
                cardClass="relative mb-10 w-[260px] h-[390px] object-cover bg-cream-100 rounded-md"
                iconClass="absolute top-10 ml-20 mt-12 w-20 h-20"
                imgBg="bg-sky-400 h-[260px]"
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
    </Fragment>
  );
};

export default ViewVideo;
