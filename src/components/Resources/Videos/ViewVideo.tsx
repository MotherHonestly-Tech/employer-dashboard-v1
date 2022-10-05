import React, { Fragment, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { Box, Grid } from "@mui/material";
import ResCard from "../SubComponents/ResCard";
import { useLocation, useParams } from "react-router-dom";
import VideoHeader from "./VideoHeader";
import AuthContext from "../../../store/context/auth-context";

type ComponentProps = {
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

const ViewVideo = (props: ComponentProps) => {
  const location = useLocation();
  const [resources, setResources] = useState<ComponentProps[]>([]);

  const [noOfElement, setnoOfElement] = useState(8);
  const slice = resources.slice(0, noOfElement);

  var resUrl = `${process.env.REACT_APP_RES_VIDEO_URL}`;

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
  // console.log(params.id!);

  var viewUrl = `${process.env.REACT_APP_RES_VIDEO_VIEW_URL}${params.id}`;

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
        description={data.description}
        imageUrl={data.s3bucketKeyThumbNail}
        categoryTwo={data.interests}
        downloadClassName="hidden flex -ml-4 my-6"
      />

      <Box className="px-40 py-10 bg-white">
        {/* <img
          src="https://res.cloudinary.com/mother-honestly/image/upload/v1661950701/image_unnc52.png"
          alt=""
          className="mx-auto my-6 w-full h-[600px]"
        /> */}

        <Box>
          <iframe
            src={data.source}
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="w-full h-full md:h-[400px] lg:h-[700px]"
            title="MH Mother: The Summit 2019"
          ></iframe>
        </Box>

        <Box className="mt-8">
          <Box className="flex mb-4">
            {/* <Box className="font-areaExt bg-yellow-100 px-2 pt-1 text-sm rounded-full">
              2
            </Box> */}
            <Typography
              variant="h3"
              color="primary"
              className="text-base px-24 uppercase font-areaNorm"
            >
              {/* {data.keypoint} */}
            </Typography>
          </Box>
          <Typography
            variant="body2"
            color="primary"
            className="text-[13px] px-24 my-4 leading-[200%] font-areaSemi"
          >
            {/* {data.keynote} */}
          </Typography>
        </Box>
      </Box>

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
                cardClass="relative mb-10 w-[270px] h-[420px] object-cover bg-cream-100 rounded-md"
                iconClass="absolute top-10 ml-20 mt-12 w-20 h-20"
                imgBg="bg-cream-200 "
                bodyBg="bg-cream-100"
                imageSrc={res.s3bucketKeyThumbNail}
                top={res.interests}
                title={res.title}
                category={res.interests}
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
