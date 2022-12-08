import React, { Fragment, useEffect, useState } from "react";
import ViewHeader from "../SubComponents/ViewHeader";
import Typography from "@mui/material/Typography";
import { Box, Grid } from "@mui/material";
import ResCard from "../SubComponents/ResCard";
import { useLocation, useParams } from "react-router-dom";
import AuthContext from "../../../store/context/auth-context";
import moment from "moment";

type ComponentProps = {
  thumbNailImageSrc?: string;
  itemList?: string[];
  title?: string;
  author?: string;
  CatchPhrase?: string;
  categ?: string;
  id?: number;
  slug?: string;
  createdAt?: string;
  updatedAt?: string;
};

const ViewArticle = (props: ComponentProps) => {
  const location = useLocation();
  const [resources, setResources] = useState<ComponentProps[]>([]);

  const [noOfElement, setnoOfElement] = useState(4);
  const slice = resources.slice(0, noOfElement);

  const params = useParams<any>();

  var resUrl = `${process.env.REACT_APP_RES_ARTICLE_URL}`;
  var viewUrl = `${process.env.REACT_APP_ALL_RES_VIEW_URL}${params.id}`;

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

  const getData = async () => {
    try {
      const response = await fetch(viewUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const jsonData = await response.json();
      setData(jsonData.data);
    } catch (err) {
      console.error("Cannot find Data");
    }
  };

  useEffect(() => {
    getData();
    getResource();
  }, []);

  if (!token) {
    return null;
  }

  return (
    <Fragment>
      <ViewHeader
        titles={data.title}
        description="Our articles are designed to help you understand more on work, life and care"
        imageUrl={data.thumbNailImageSrc}
        // imageUrl="https://res.cloudinary.com/mother-honestly/image/upload/v1661545700/image_hsichu.png"
        headerDateClass="text-center block md:hidden mt-12 text-[12px] uppercase font-areaExt"
        categoryClassName="md:bottom-6 md:absolute"
        categoryOne={data.itemList ? data.itemList[0] : ""}
        categoryTwo={data.itemList ? data.itemList[1] : ""}
        writtenBy={data.author}
        authorClassName="text-left mt-6 opacity-50 text-[16px] mb-8 uppercase font-areaNorm"
        ticketClassName="py-6 hidden"
        timeClassName="hidden"
        podClassName="mt-10 flex gap-32 hidden"
        downloadClassName=" hidden flex -ml-4 my-6"
        date={moment(data.createdAt).format("DD/MM/YYYY h:mm")}
        dateTwo={moment(data.createdAt).format("MMM D, YYYY")}
        dateClassName="hidden md:hidden text-left pb-2 w-3/4 text-base font-areaSemi"
        episodeClassName="hidden"
      />

      <Box className="px-40 py-10 bg-white">
        <Typography
          variant="h3"
          color="primary"
          className="text-3xl w-[80%] font-columbia font-[500]"
        >
          {data.CatchPhrase}
        </Typography>
        <img
          src={data.source}
          // src="https://res.cloudinary.com/mother-honestly/image/upload/v1661950701/image_unnc52.png"
          alt="Resource Image"
          className="mx-auto bg-navy-100 object-cover my-6 w-full h-[600px]"
        />

        {/* Article Content */}
        <div dangerouslySetInnerHTML={{ __html: data.description }} />
      </Box>

      <Box className="bg-gray-300 h-[1px] w-[91.4%] opacity-50 overflow-hidden mx-auto"></Box>

      <Box className="mx-auto pt-10 bg-white px-12 py-4">
        <Typography
          variant="h1"
          color="primary"
          className="font-areaSemi text-xl text-center py-4"
        >
          Articles You Might like
        </Typography>
        <Grid container spacing={2}>
          {slice.map((res, index) => (
            <Grid item xs={12} md={6} lg={3} key={index}>
              <ResCard
                cardClass="relative w-[270px] mb-10 h-[450px] object-cover bg-cream-100 rounded-md shadow-sm"
                iconClass="hidden absolute top-10 ml-20 mt-12 w-20 h-20" //absolute top-10 ml-20 mt-12 w-20 h-20
                imgBg="bg-navy-100 h-[270px]"
                bodyBg="bg-cream-100"
                imageSrc={res.thumbNailImageSrc}
                podTop="hidden"
                // top=""
                title={res.title}
                text={res.CatchPhrase}
                category={res.itemList ? res.itemList[0] : ""}
                categoryTwo={res.itemList ? res.itemList[1] : ""}
                titleUrl={`/organization/resources/articles/${res.slug}/${res.id}`}
                playUrl={`/organization/resources/articles/${res.slug}/${res.id}`}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Fragment>
  );
};

export default ViewArticle;
