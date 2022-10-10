import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import CoachPagination from "./CoachPagination";
import Coach from "./Coach";

type CoProps = {
  imageSrc?: string;
  name?: string;
  title?: string;
  rating?: number;
  amount?: number;
  category?: string;
  slug?: string;
};

const CoachPager = (props: CoProps) => {
  const [resources, setResources] = useState<CoProps[]>([]);

  var resUrl = `${process.env.REACT_APP_COACH_PAGER_URL}`;

  const getResource = async () => {
    try {
      const response = await fetch(resUrl, {
        method: "GET",
      });
      const jsonData = await response.json();
      setResources(jsonData);
    } catch (err) {
      console.error("Cannot find Data");
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = resources.slice(firstPostIndex, lastPostIndex);

  useEffect(() => {
    getResource();
  }, []);

  return (
    <Box className="mx-auto pt-10 bg-white relative px-6 pb-4">
      <Grid container spacing={4}>
        <>
          {currentPosts.map((res, index) => (
            <Grid item xs={12} md={6} lg={4}>
              <Coach
                name={res.name}
                title={res.title}
                rating={res.rating}
                amount={res.amount}
                category={res.category}
                imageSrc={res.imageSrc}
                url={`${res.slug}`}
              />
            </Grid>
          ))}
        </>
      </Grid>

      <CoachPagination
        totalPosts={resources.length}
        postsPerPage={postsPerPage}
        onClick={() => {
          setCurrentPage(currentPage - 1);
        }}
        onClicked={() => {
          setCurrentPage(currentPage + 1);
        }}
        currentPage={currentPage}
      />
    </Box>
  );
};

export default CoachPager;
