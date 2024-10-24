"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const ProgressBarClient = () => {
  return (
    <>
      <ProgressBar
        height="4px"
        color="linear-gradient(90deg, rgba(32,240,163,0.9973262032085561) 0%, rgba(255,255,255,1) 84%) !important"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
};

export default ProgressBarClient;
