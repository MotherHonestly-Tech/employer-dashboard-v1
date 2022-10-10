import React, { Fragment, useEffect, useState } from "react";
import ViewHeader from "../SubComponents/ViewHeader";
import Typography from "@mui/material/Typography";
import { Box, Grid } from "@mui/material";
import ResCard from "../SubComponents/ResCard";
import { useHistory, useLocation, useParams } from "react-router-dom";
import MHButton from "../../Button/MHButton";
import moment from "moment";
import AuthContext from "../../../store/context/auth-context";

type ComponentProps = {
  s3bucketKeyThumbNail?: string;
  thumbNailImageSrc?: string;
  interests?: string;
  eventDate?: number;
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

  const [noOfElement, setnoOfElement] = useState(8);
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

  var viewUrl = `${process.env.REACT_APP_RES_EVENT_VIEW_URL}${params.id}`;

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
        imageUrl={data.s3bucketKeyThumbNail}
        categoryOne="Career"
        categoryTwo={data.interest}
        downloadClassName="hidden flex -ml-4 my-6"
        podClassName="mt-10 flex gap-32 hidden"
        ticketClassName="py-12"
        ticketLink={data.ticketLink}
        date={moment(data.eventDate).format("MMMM Do ")}
        dateTwo={moment(data.eventDate).format("MMMM D, YYYY")}
        dateClassName="text-left pb-2 w-3/4 text-base font-areaSemi"
        episodeClassName="hidden"
        authorClassName="hidden"
      />

      <Box className="px-40 py-10 bg-white">
        <Typography
          variant="h3"
          color="primary"
          className="text-3xl font-columbia font-[500]"
        >
          Description:
        </Typography>
        <Typography
          variant="body2"
          color="primary"
          className="text-[13px] mt-6 leading-[200%] font-areaSemi"
        >
          {data.description}
        </Typography>

        <img
          src={data.s3bucketKeyThumbNail}
          alt=""
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
                cardClass="relative mb-10 w-[270px] h-[410px] object-cover bg-cream-100 rounded-md"
                iconClass="hidden"
                imgBg="bg-cream-200 "
                bodyBg="bg-cream-100"
                top={moment(res.createdAt!).format("MMMM Do ")}
                imageSrc={res.thumbNailImageSrc}
                // top={res.interests}
                title={res.title}
                category={res.interests}
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
