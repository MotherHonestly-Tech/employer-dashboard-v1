import React, { Fragment } from "react";
import Footer from "../../components/Layout/Footer";
import ResArticle from "../../components/Resources/main/ResArticle";
import ResHeader from "../../components/Resources/main/ResHeader";
import ResEvent from "../../components/Resources/main/ResEvent";
import ResPodcast from "../../components/Resources/main/ResPodcast";
import ResToolkit from "../../components/Resources/main/ResToolkit";
import ResVideo from "../../components/Resources/main/ResVideo";

const Resources = () => {
  return (
    <Fragment>
      <ResHeader />
      <ResToolkit />
      <ResVideo />
      <ResEvent />
      <ResArticle />
      <ResPodcast />

      <Footer />
    </Fragment>
  );
};

export default Resources;
