import React from "react";
import { ReactComponent as Instagram } from "../../../static/svg/instagram.svg";
import { ReactComponent as Facebook } from "../../../static/svg/facebook.svg";
import { ReactComponent as Pinterest } from "../../../static/svg/pinterest.svg";
import { ReactComponent as Twitter } from "../../../static/svg/twitter.svg";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";

type Props = {
  SocialClass: string | undefined;
};

export const Socials = (props: Props) => {
  return (
    <Box className={props.SocialClass}>
      <Box className="mx-auto text-center place-content-center flex gap-4">
        <Link className="cursor-pointer" to={""} title="Visit our socials">
          <Instagram />
        </Link>
        <Link className="cursor-pointer" to={""} title="Visit our socials">
          <Facebook />
        </Link>
        <Link className="cursor-pointer" to={""} title="Visit our socials">
          <Pinterest />
        </Link>
        <Link className="cursor-pointer" to={""} title="Visit our socials">
          <Twitter />
        </Link>
      </Box>
    </Box>
  );
};
