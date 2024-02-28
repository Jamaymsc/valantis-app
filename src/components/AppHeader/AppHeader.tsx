import { Box } from "@mui/material";

export const AppHeader = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "200px",
        backgroundImage: `url(${process.env.PUBLIC_URL + "/logo/logo.png"})`,
        backgroundRepeat: "no-repeat",
        backgroundColor: "#A52838",
        backgroundPosition: "center",
      }}
    ></Box>
  );
};
