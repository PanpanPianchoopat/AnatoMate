import React from "react";
import { Grid, BackHome, BackIcon } from "./styled";
import { useRouter } from "next/router";

const GridBg = ({ children }) => {
  const router = useRouter();
  return (
    <Grid>
      <BackHome onClick={() => router.push("/")}>
        <BackIcon />
        Homepage
      </BackHome>
      {children}
    </Grid>
  );
};

export default GridBg;
