import { Box, Typography } from "@mui/material";
import {
  footerOutterBoxStyle,
  footerTypographyTextStyle,
} from "./AppFooterStyles";

export const AppFooter = () => {
  return (
    <Box sx={footerOutterBoxStyle}>
      <Typography sx={footerTypographyTextStyle}>
        Данный проект выполнил Соболев К.Ю.
      </Typography>
    </Box>
  );
};
