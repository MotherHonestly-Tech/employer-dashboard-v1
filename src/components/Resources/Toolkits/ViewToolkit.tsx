import React, { Fragment, useEffect, useState } from "react";
import ViewHeader from "../SubComponents/ViewHeader";
import Typography from "@mui/material/Typography";
import { Box, Grid } from "@mui/material";
import ResCard from "../SubComponents/ResCard";
import { useLocation } from "react-router-dom";
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
  title?: string | undefined;
};

const ViewToolkit = (props: ComponentProps) => {
  const location = useLocation();
  const [resources, setResources] = useState<ComponentProps[]>([]);

  const [noOfElement, setnoOfElement] = useState(8);
  const slice = resources.slice(0, noOfElement);

  // const params = useParams<any>();
  // console.log(params.slug!);

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

  var viewUrl = `https://mocki.io/v1/03a58836-bfe9-4d5d-ac55-11cd5c00f367`;

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
        categoryTwo={data.category}
        downloadLink={data.downloadUrl}
        downloadClassName="flex -ml-4 my-8"
        date={moment(data.date).format("DD/MM/YYYY HH:mm")}
        dateTwo={moment(data.date).format("MMMM D, YYYY")}
        ticketClassName="py-6 hidden"
        podClassName="mt-10 flex gap-32 hidden"
        dateClassName="hidden text-left pb-2 w-3/4 text-base font-areaSemi"
        episodeClassName="hidden"
        authorClassName="hidden"
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
      </Box>

      <Box className="mx-auto pt-10 bg-white px-12 py-4">
        <Typography
          variant="h1"
          color="primary"
          className="font-areaSemi text-xl text-center py-4"
        >
          Toolkits You Might like
        </Typography>
        <Grid container spacing={2}>
          {slice.map((res, index) => (
            <Grid item xs={12} md={6} lg={3} key={index}>
              <ResCard
                cardClass="relative mb-10 w-[270px] h-[400px] object-cover bg-cream-100 rounded-md"
                iconClass="hidden"
                imgBg="bg-cream-200 "
                bodyBg="bg-cream-100"
                imageSrc={res.image}
                top={res.tops}
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

export default ViewToolkit;
