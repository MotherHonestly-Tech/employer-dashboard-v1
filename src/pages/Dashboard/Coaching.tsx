import React, { Fragment } from "react";
import CoachingHeader from "../../components/Coaching/CoachingHeader";
import CoachPager from "../../components/Coaching/CoachPager";

const Coaching = () => {
  return (
    <Fragment>
      <CoachingHeader />
      <CoachPager />
    </Fragment>
  );
};

export default Coaching;
