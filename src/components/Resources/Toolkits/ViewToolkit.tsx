import React, { Fragment, useEffect, useState } from "react";
import ViewHeader from "../SubComponents/ViewHeader";
import Typography from "@mui/material/Typography";
import { Box, Grid } from "@mui/material";
import ResCard from "../SubComponents/ResCard";
import { useLocation, useParams } from "react-router-dom";
import moment from "moment";
import AuthContext from "../../../store/context/auth-context";

type ComponentProps = {
  thumbNailImageSrc?: string;
  itemList?: string[];
  texts?: string;
  categ?: string;
  id?: number;
  slug?: string;
  createdAt?: string;
  updatedAt?: string;
  title?: string | undefined;
};

const ViewToolkit = (props: ComponentProps) => {
  const location = useLocation();
  const [resources, setResources] = useState<ComponentProps[]>([]);

  const params = useParams<any>();

  const authCtx = React.useContext(AuthContext);
  const { token, userId } = authCtx;
  // console.log(params.id!);

  var resUrl = `${process.env.REACT_APP_RES_TOOLKIT_URL}`;
  var viewUrl = `${process.env.REACT_APP_ALL_RES_VIEW_URL}${params.id}`;

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
    } catch (err) {
      console.error("Cannot find Data");
    }
  };

  console.log(resources, "resources");
  const [noOfElement, setnoOfElement] = useState(4);
  const slice = resources.slice(0, noOfElement);

  const [data, setData] = useState<any>("");

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

  console.log(data, "data");

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
        description="Here's everything you need to know about this toolkit and why it's worth it."
        imageUrl={data.thumbNailImageSrc}
        headerDateClass="text-center block md:hidden mt-12 text-[12px] uppercase font-areaExt"
        categoryClassName="md:bottom-6 md:absolute"
        categoryOne={data.itemList ? data.itemList[0] : ""}
        categoryTwo={data.itemList ? data.itemList[1] : ""}
        downloadLink={data.source}
        downloadClassName="flex cursor-pointer md:-ml-4 my-8 md:my-3 lg:my-8 px-6 md:pt-0 lg:pt-6 pt-6 md:px-0"
        date={moment(data.date).format("DD/MM/YYYY h:mm")}
        dateTwo={moment(data.date).format("MMM D, YYYY")}
        ticketClassName="py-6 hidden"
        timeClassName="hidden"
        podClassName="mt-10 flex gap-32 hidden"
        dateClassName="hidden text-left pb-2 w-3/4 text-base font-areaSemi"
        episodeClassName="hidden"
        authorClassName="hidden"
      />

      <Box className="px-40 py-10 bg-white">
        <Typography
          variant="h3"
          color="primary"
          className="text-2xl md:text-3xl w-[90%] text-left font-columbia font-[500]"
        >
          When you’re a full-time working parent, your time isn’t just valuable,
          it’s priceless.
        </Typography>
        <Typography
          variant="body2"
          color="primary"
          className="text-[18px] text-left mt-6 leading-[200%] font-areaSemi"
        >
          {data.description}
        </Typography>
      </Box>

      <Box className="bg-gray-300 h-[1px] w-[91.4%] opacity-50 overflow-hidden mx-auto"></Box>

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
            <Grid item xs={12} md={6} lg={3} key={res.id}>
              <ResCard
                cardClass="relative mb-10 w-[260px] h-[400px] object-cover bg-cream-100 rounded-md"
                iconClass="hidden"
                imgBg="bg-cream-200 h-[260px]"
                bodyBg="bg-cream-100"
                imageSrc={res.thumbNailImageSrc}
                // top={res.interests}
                title={res.title}
                podTop="hidden"
                category={res.itemList ? res.itemList[0] : ""}
                categoryTwo={res.itemList ? res.itemList[1] : ""}
                titleUrl={`/organization/resources/toolkits/${res.slug}/${res.id}`}
                playUrl={`/organization/resources/toolkits/${res.slug}/${res.id}`}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Fragment>
  );
};

export default ViewToolkit;
