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
  createdAt?: string | undefined;
  imageSrc: string | undefined;
  top?: string | undefined;
  title: string | undefined;
  text?: string | undefined;
  category: string | undefined;
  imgBg: string;
  bodyBg: string;
  titleUrl: string;
  playUrl: string;
};

const ResCard = (props: CardProps) => {
  return (
    <Fragment>
      <Zoom in style={{ transitionDelay: "300ms" }}>
        <Card className={`${props.cardClass}`}>
          <CardMedia
            className={props.imgBg}
            component="img"
            image={props.imageSrc}
            alt="Test Image"
          />
          <Link to={props.playUrl} className="no-underline">
            <PlayIcon className={`${props.iconClass} cursor-pointer`} />
          </Link>
          <CardContent className={`${props.bodyBg}`}>
            <Typography
              className="text-xs font-areaNorm uppercase text-navy-900 pb-1"
              gutterBottom
              variant="h5"
              component="p"
            >
              {props.top}
            </Typography>
            <Link to={props.titleUrl} className="no-underline">
              <Typography
                className="text-sm font-areaBold line-clamp-2 text-navy-900"
                variant="body2"
                color="text.secondary"
              >
                {props.title}
              </Typography>
            </Link>
            <Typography
              className="text-xs line-clamp-2 leading-[22px] font-areaSemi text-navy-900 opacity-50"
              variant="body2"
              color="text.secondary"
            >
              {props.text}
            </Typography>
          </CardContent>
          <hr className="w-[90%] mx-auto bg-navy-900 opacity-10" />

          <CardActions className={`${props.bodyBg} text-xs text-navy-100`}>
            <Button
              className="text-xs disabled:text-navy-900 font-areaSemi"
              size="small"
              disabled
            >
              {props.category}
            </Button>
          </CardActions>
        </Card>
      </Zoom>
    </Fragment>
  );
};

export default ResCard;
