"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const ProgressBarClient = () => {
  return (
    <>
      <ProgressBar
        height="4px"
        color="linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(43,145,122,1) 61%) !important"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
};

export default ProgressBarClient;
