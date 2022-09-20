import {
  Zoom,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Box,
  Rating,
} from "@mui/material";
import React, { Fragment } from "react";
import Typography from "@mui/material/Typography";
import { Link, useLocation } from "react-router-dom";

export type CardProps = {
  imageSrc?: string | undefined;
  name?: string | undefined;
  title?: string | undefined;
  rating?: number | undefined;
  amount?: number | undefined;
  category?: string | undefined;
  url?: string;
};

const Coach = (props: CardProps) => {
  const location = useLocation();
  return (
    <Fragment>
      <Zoom in style={{ transitionDelay: "300ms" }}>
        <Card
          className={`relative bg-cream-100  rounded-md w-[280px] h-[380px]`}
        >
          <CardMedia
            className={`h-[250px] w-full object-cover`}
            component="img"
            image={props.imageSrc}
            alt="Test Image"
          />

          <CardContent className={``}>
            <Typography
              className="text-sm truncate w-[70%] absolute top-[52%] left-0 font-areaSemi capitalize text-navy-900 font-black py-1.5 pl-1 pr-3 bg-ash-100  rounded-r-full"
              gutterBottom
              variant="h5"
              component="p"
              title={props.title}
              //   sx={{ fontWeight: 900, fontFamily: "Area-Normal" }}
            >
              {props.title}
            </Typography>

            <Typography
              className="relative "
              variant="body2"
              color="text.secondary"
              //   sx={{ fontWeight: 900, fontFamily: "Area-Normal" }}
            >
              <Link
                to={`${location.pathname}/${props.url}`}
                className="no-underline h-14 line-clamp-2 w-[70%] text-[16px] capitalize py-2 font-areaSemi leading-[140%] font-bold text-navy-900"
              >
                {props.name}
              </Link>

              <Rating
                className="absolute right-0 top-3 text-navy-900 opacity-60"
                name="size-large"
                defaultValue={props.rating}
                size="large"
                readOnly
                precision={0.5}
              />
            </Typography>

            <Typography
              className="text-[11px] font-areaSemi py-1 capitalize line-clamp-2 leading-[92%] font-[600] text-navy-900 opacity-40"
              variant="body2"
              color="text.secondary"
              //   sx={{ fontWeight: 600, fontFamily: "Area-Normal" }}
            >
              From ${props.amount} per session
            </Typography>
            <hr className="w-[100%] mx-auto bg-navy-900 opacity-10" />

            <Typography
              className="text-start py-3 text-navy-900 font-areaSemi"
              variant="body2"
            >
              {props.category}
            </Typography>
          </CardContent>

          {/* <CardActions
            className={`capitalize lg:-mt-4 font-areaNorm font-[600] text-[12px] tracking-[0.04rem] leading-[120%] text-navy-900`}
          >
            <Button
              className=" disabled:text-navy-900 "
              size="small"
              disabled
              sx={{ fontWeight: 600, fontFamily: "Area-Normal" }}
            >
              {props.category}
            </Button>
          </CardActions> */}
        </Card>
      </Zoom>
    </Fragment>
  );
};

export default Coach;
