import React, { Fragment, useEffect, useState } from "react";
import ViewHeader from "../SubComponents/ViewHeader";
import Typography from "@mui/material/Typography";
import { Box, Grid } from "@mui/material";
import ResCard from "../SubComponents/ResCard";
import { useLocation } from "react-router-dom";
import AuthContext from "../../../store/context/auth-context";

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

const ViewArticle = (props: ComponentProps) => {
  const location = useLocation();
  const [resources, setResources] = useState<ComponentProps[]>([]);

  const [noOfElement, setnoOfElement] = useState(8);
  const slice = resources.slice(0, noOfElement);

  var resUrl = `${process.env.REACT_APP_RES_ARTICLE_URL}`;

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
      setResources(jsonData);
      console.log(resources);
    } catch (err) {
      console.error("Cannot find Data");
    }
  };

  useEffect(() => {
    getResource();

    console.log();
  }, []);

  if (!token) {
    return null;
  }

  return (
    <Fragment>
      <ViewHeader
        titles="What Black Working Moms Really Want in the Workplace."
        description="It’s going to take more than a few supportive press releases to help Black women advance in corporate America."
        imageUrl="https://res.cloudinary.com/mother-honestly/image/upload/v1661545700/image_hsichu.png"
        categoryOne="Career"
        categoryTwo="Career, Family, Back to Work"
        author="Blessing Adesiyan"
        authorClassName="text-left mt-6 opacity-50 text-[16px] mb-8 uppercase font-areaNorm"
        ticketClassName="py-6 hidden"
        timeClassName="hidden"
        podClassName="mt-10 flex gap-32 hidden"
        downloadClassName=" hidden flex -ml-4 my-6"
        date="2022-08-13T18:52:03.021Z"
        dateClassName="hidden text-left pb-2 w-3/4 text-base font-areaSemi"
        episodeClassName="hidden"
      />

      <Box className="px-40 py-10 bg-white">
        <Typography
          variant="h3"
          color="primary"
          className="text-3xl w-[80%] font-columbia font-[500]"
        >
          “The day after George Floyd’s death, I decided to leave corporate
          America.”
        </Typography>
        <Typography
          variant="body2"
          color="primary"
          className="text-[13px] mt-6 leading-[200%] font-areaSemi"
        >
          That’s because every moment you spend on household tasks is one you
          could have spent bonding with your kids or building your career. If
          you’re a master chef who loves cooking or a dedicated gardener who
          loves tending to your yard, the trade-off is worth it. But for chores
          that drain your time and energy, there’s a simple solution:
          Outsourcing.
        </Typography>
        <Typography
          variant="body2"
          color="primary"
          className="text-[13px] mt-6 leading-[200%] font-areaSemi"
        >
          So the day after Floyd’s death, I made sure to join my company’s
          stand-up Zoom meeting, even though I was reeling from grief and anger.
          The topic du jour? Dog safety. Yes, really. I listened to a 15-minute
          presentation about how to keep dogs safe while working from home, but
          mentally I couldn’t stop mentally replaying the horrifying moment
          Floyd called out for his mother shortly before he took his last
          breath. Floyd’s death went unacknowledged by my company’s leadership
          for another three weeks, presumably while they crafted a careful
          statement. Meanwhile, my Black colleagues and I felt lonelier than
          ever, surrounded by coworkers who didn’t know how to acknowledge our
          anguish, if they knew it existed at all. It’s a loneliness that’s all
          too familiar for Black people, and especially Black women, in the
          professional sphere. Though Black women make up 7.4% of the U.S.
          population, we only hold 1.7% of senior roles in corporate America.
          There are two Black women CEOs on the Fortune 500 list. Because Vice
          President Kamala Harris was elevated to the White House, there are now
          zero Black women senators. And if President Joe Biden follows through
          on his promise to nominate a Black woman to the Supreme Court
          following Justice Stephen Breyer’s retirement, she will be the first
          ever to hold the job.
        </Typography>

        <img
          src="https://res.cloudinary.com/mother-honestly/image/upload/v1661950701/image_unnc52.png"
          alt="Resource Image"
          className="mx-auto my-6 w-full h-[600px]"
        />

        <Typography
          variant="body2"
          color="primary"
          className="text-[13px] mt-6 leading-[200%] font-areaSemi"
        >
          So the day after Floyd’s death, I made sure to join my company’s
          stand-up Zoom meeting, even though I was reeling from grief and anger.
          The topic du jour? Dog safety. Yes, really. I listened to a 15-minute
          presentation about how to keep dogs safe while working from home, but
          mentally I couldn’t stop mentally replaying the horrifying moment
          Floyd called out for his mother shortly before he took his last
          breath. Floyd’s death went unacknowledged by my company’s leadership
          for another three weeks, presumably while they crafted a careful
          statement. Meanwhile, my Black colleagues and I felt lonelier than
          ever, surrounded by coworkers who didn’t know how to acknowledge our
          anguish, if they knew it existed at all. It’s a loneliness that’s all
          too familiar for Black people, and especially Black women, in the
          professional sphere. Though Black women make up 7.4% of the U.S.
          population, we only hold 1.7% of senior roles in corporate America.
          There are two Black women CEOs on the Fortune 500 list. Because Vice
          President Kamala Harris was elevated to the White House, there are now
          zero Black women senators. And if President Joe Biden follows through
          on his promise to nominate a Black woman to the Supreme Court
          following Justice Stephen Breyer’s retirement, she will be the first
          ever to hold the job.
        </Typography>

        <Box className="mt-8">
          <Box className="flex mb-4">
            <Box className="font-areaExt bg-yellow-100 px-2 pt-1 text-sm rounded-full">
              1
            </Box>
            <Typography
              variant="h3"
              color="primary"
              className="text-base px-16 uppercase font-areaNorm"
            >
              Seeing Ourselves at the Top.
            </Typography>
          </Box>
          <Typography
            variant="body2"
            color="primary"
            className="text-[13px] px-24 my-4 leading-[200%] font-areaSemi"
          >
            That’s because every moment you spend on household tasks is one you
            could have spent bonding with your kids or building your career. If
            you’re a master chef who loves cooking or a dedicated gardener who
            loves tending to your yard, the trade-off is worth it. But for
            chores that drain your time and energy, there’s a simple solution:
            Outsourcing.
          </Typography>
        </Box>

        <Box className="mt-8">
          <Box className="flex mb-4">
            <Box className="font-areaExt bg-yellow-100 px-2 pt-1 text-sm rounded-full">
              2
            </Box>
            <Typography
              variant="h3"
              color="primary"
              className="text-base px-16 uppercase font-areaNorm"
            >
              Equal pay—and equal opportunities.
            </Typography>
          </Box>
          <Typography
            variant="body2"
            color="primary"
            className="text-[13px] px-24 my-4 leading-[200%] font-areaSemi"
          >
            Black women are paid an average of 63 cents for each dollar paid to
            non-Hispanic white men. Companies can help remedy this disparity by
            performing routine compensation audits and taking concrete steps to
            close any gaps in pay, but they must also make sure that
            opportunities are being evenly distributed, too. A Lean In report on
            The State of Black Women in Corporate America found that Black women
            are much less likely than their non-Black colleagues to interact
            with senior leaders at work, and Black women are much less likely to
            say their manager gives them opportunities to manage people and
            projects. It’s pretty simple: Pay us what we deserve and give us
            time to shine in front of the people who matter most.
          </Typography>
        </Box>
      </Box>

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
                imageSrc={res.image}
                top={res.tops}
                title={res.titles}
                text={res.texts}
                podTop="hidden"
                category={res.categ}
                categoryTwo={res.categ}
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

export default ViewArticle;
