import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { useEffect } from "react";
import Form from "./Form";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  useEffect(() => {
    document.title = "Welcome to FriendLink";
  }, []);
  return (
    <Box>
      <Box
        width="100%"
        backgroundcolor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          FriendLink
        </Typography>
      </Box>
      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundcolor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" fontSize="20px" sx={{ mb: "1.5rem" }}>
          Welcome to FriendLink!
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
