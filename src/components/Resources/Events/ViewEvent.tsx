import React, { Fragment, useEffect, useState } from "react";
import ViewHeader from "../SubComponents/ViewHeader";
import Typography from "@mui/material/Typography";
import { Box, Grid } from "@mui/material";
import ResCard from "../SubComponents/ResCard";
import { useHistory, useLocation, useParams } from "react-router-dom";
import MHButton from "../../Button/MHButton";
import moment from "moment";
import AuthContext from "../../../store/context/auth-context";
import { Socials } from "../SubComponents/Socials";

type ComponentProps = {
  thumbNailImageSrc?: string;
  itemList?: string[];
  startTime?: number;
  endTime?: number;
  time?: number;
  title?: string;
  texts?: string;
  categ?: string;
  id?: number;
  slug?: string;
  createdAt?: string;
  updatedAt?: string;
};

const ViewEvent = (props: ComponentProps) => {
  const location = useLocation();
  const [resources, setResources] = useState<ComponentProps[]>([]);

  const [noOfElement, setnoOfElement] = useState(4);
  const slice = resources.slice(0, noOfElement);

  var resUrl = `${process.env.REACT_APP_RES_EVENT_URL}`;

  const authCtx = React.useContext(AuthContext);
  const { token, userId } = authCtx;

  let history = useHistory();

  const handleClickOpen = () => {
    history.push(`${location}/articles`);
  };

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

  const params = useParams<any>();
  // console.log(params.id!);

  const [data, setData] = useState<any>("");

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
        description="Catch up on amazing events"
        imageUrl={data.thumbNailImageSrc}
        headerDateClass="text-center hidden md:hidden mt-12 text-[12px] uppercase font-areaExt"
        // imageUrl="https://res.cloudinary.com/mother-honestly/image/upload/v1661961579/image_1_ynjaab.png"
        categoryClassName="md:-bottom-3 md:absolute"
        categoryOne={data.itemList ? data.itemList[0] : "Career"}
        categoryTwo={data.itemList ? data.itemList[1] : "Work"}
        downloadClassName="hidden flex -ml-4 my-6"
        podClassName="mt-10 flex gap-32 hidden"
        ticketClassName="pt-12"
        ticketLink={data.ticketLink}
        timeClassName="hidden"
        bottomDateClass="hidden"
        date={moment(data.startTime).format("MMMM Do ")}
        startTime={moment(data.startTime).format("h:mma")}
        endTime={moment(data.endTime).format("h:mma")}
        dateTwo={moment(data.startTime).format("MMMM D, YYYY")}
        dateClassName="text-left pb-2 w-3/4 text-base font-areaSemi"
        episodeClassName="hidden"
        authorClassName="hidden"
      />

      <Box className="px-40 py-10 bg-white">
        <Typography
          variant="h3"
          color="primary"
          className="text-2xl text-start font-areaSemi font-[600]"
        >
          The Importance of Caregivers and their Support Systems
        </Typography>
        <Typography
          variant="body2"
          color="primary"
          className="text-[13px] text-start py-12 leading-[200%] font-areaSemi"
        >
          {data.description}
        </Typography>

        <img
          src={data.thumbNailImageSrc}
          alt="Resource Image"
          className="mx-auto my-6 w-full h-[600px]"
        />

        <Box className="flex justify-center py-6">
          <MHButton
            onClick={() => {
              window.open(data.ticketLink);
            }}
            sx={{ width: "113px" }}
          >
            Buy A Ticket
          </MHButton>
        </Box>
      </Box>
      <Socials SocialClass="block py-12" />

      <Box className="bg-gray-300 h-[1px] w-[91.4%] opacity-50 overflow-hidden mx-auto"></Box>

      <Box className="mx-auto pt-10 bg-white px-12 py-4">
        <Typography
          variant="h1"
          color="primary"
          className="font-areaSemi text-xl text-center py-4"
        >
          Past Events You Might like
        </Typography>
        <Grid container spacing={2}>
          {slice.map((res, index) => (
            <Grid item xs={12} md={6} lg={3} key={index}>
              <ResCard
                cardClass="relative mb-10 w-[270px] h-[350px] object-cover bg-cream-100 rounded-md"
                iconClass="hidden"
                imgBg="bg-pink-700 h-[270px]"
                bodyBg="bg-cream-100"
                top={moment(res.startTime!).format("MMMM D, h:mma")}
                imageSrc={res.thumbNailImageSrc}
                podTop="hidden"
                title={res.title}
                category={res.itemList ? res.itemList[0] : ""}
                categoryTwo={res.itemList ? res.itemList[1] : ""}
                titleUrl={`/organization/resources/events/${res.slug}/${res.id}`}
                playUrl={`/organization/resources/events/${res.slug}/${res.id}`}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Fragment>
  );
};

export default ViewEvent;
