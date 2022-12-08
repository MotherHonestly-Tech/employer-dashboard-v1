import {
  Zoom,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import React, { Fragment } from "react";
import Typography from "@mui/material/Typography";

import { ReactComponent as PlayIcon } from "../../../static/svg/play-btn.svg";
import { Link } from "react-router-dom";

export type CardProps = {
  cardClass: string;
  iconClass: string;
  createdDate?: string | undefined;
  imageSrc: string | undefined;
  podTop?: string;
  top?: string;
  season?: string;
  episode?: string;
  title: string | undefined;
  text?: string | undefined;
  category: string | undefined | any[];
  categoryTwo: string | undefined | any[];
  imgBg: string;
  bodyBg: string;
  titleUrl: string;
  playUrl: string;
};

const ResCard = (props: CardProps) => {
  return (
    <Fragment>
      <Link to={props.titleUrl} className="no-underline ">
        <Zoom in style={{ transitionDelay: "300ms" }}>
          <Card className={`${props.cardClass}`}>
            <CardMedia
              className={props.imgBg}
              component="img"
              image={props.imageSrc}
              alt="Resource Image"
            />
            <Link to={props.playUrl} className="no-underline">
              <PlayIcon className={`${props.iconClass} cursor-pointer`} />
            </Link>
            <CardContent className={`${props.bodyBg}`}>
              <Typography
                className="text-[11px] py-1 text-left font-areaExt uppercase text-navy-900"
                gutterBottom
                variant="h5"
                component="p"
              >
                {props.top}
              </Typography>
              <div className={`${props.podTop}`}>
                <Typography
                  className="text-[11px] text-start py-1 font-areaExt uppercase text-navy-900"
                  gutterBottom
                  variant="h5"
                  component="p"
                >
                  Episode {props.season}:{props.episode}
                </Typography>
              </div>
              <Typography
                className="text-sm h-10 mb-2 capitalize font-areaBold line-clamp-2 text-left text-navy-900"
                variant="body2"
                color="text.secondary"
              >
                {props.title}
              </Typography>

              {props.text ? (
                <Typography
                  className="text-xs h-10 text-start capitalize line-clamp-2 leading-[22px] font-areaSemi text-navy-900 opacity-50"
                  variant="body2"
                  color="text.secondary"
                >
                  {props.text}
                </Typography>
              ) : null}
            </CardContent>
            <hr className="w-[90%] mx-auto bg-navy-900 opacity-10 " />

            <CardActions
              className={`${props.bodyBg} text-xs -mt-2 text-navy-100`}
            >
              {props.category ? (
                <div
                  className="text-xs capitalize p-2 truncate text-navy-900 font-areaSemi"
                  // size="small"
                  // disabled
                >
                  {props.category} {props.categoryTwo ? ", " : null}
                  {props.categoryTwo}
                </div>
              ) : null}
            </CardActions>
          </Card>
        </Zoom>
      </Link>
    </Fragment>
  );
};

export default ResCard;
