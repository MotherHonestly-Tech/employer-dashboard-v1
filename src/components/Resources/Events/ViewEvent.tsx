import React, { Fragment, useEffect, useState } from "react";
import ViewHeader from "../SubComponents/ViewHeader";
import Typography from "@mui/material/Typography";
import { Box, Grid } from "@mui/material";
import ResCard from "../SubComponents/ResCard";
import { useHistory, useLocation } from "react-router-dom";
import MHButton from "../../Button/MHButton";
import moment from "moment";

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

const ViewEvent = (props: ComponentProps) => {
  const location = useLocation();
  const [resources, setResources] = useState<ComponentProps[]>([]);

  const [noOfElement, setnoOfElement] = useState(8);
  const slice = resources.slice(0, noOfElement);

  var resUrl = `${process.env.REACT_APP_RES_URL}`;

  let history = useHistory();

  const handleClickOpen = () => {
    history.push(`${location}/articles`);
  };

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

  var viewUrl = `https://mocki.io/v1/f42e39da-9550-4718-a9f4-03e2ade39d30`;

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
        downloadClassName="hidden flex -ml-4 my-6"
        podClassName="mt-10 flex gap-32 hidden"
        ticketClassName="py-6"
        ticketLink={data.ticketUrl}
        date={moment(data.date).format("MMMM Do ")}
        dateTwo={moment(data.date).format("MMMM D YYYY")}
        dateClassName="text-left pb-2 w-3/4 text-base font-areaSemi"
        episodeClassName="hidden"
      />

      <Box className="px-40 py-10 bg-white">
        <Typography
          variant="h3"
          color="primary"
          className="text-3xl font-columbia font-[500]"
        >
          {data.description}
        </Typography>
        <Typography
          variant="body2"
          color="primary"
          className="text-[13px] mt-6 leading-[200%] font-areaSemi"
        >
          {data.importantInfo}
        </Typography>

        <img
          src={data.imageUrl}
          alt=""
          className="mx-auto my-6 w-full h-[600px]"
        />
        <Box className="flex justify-center py-6">
          <MHButton
            onClick={() => {
              window.open(data.ticketUrl);
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
                imageSrc={res.image}
                top={moment(res.createdAt!).format("MMMM Do ")}
                title={res.titles}
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

export default ViewEvent;
