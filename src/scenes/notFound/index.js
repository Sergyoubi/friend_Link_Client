import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import FlexBetween from "components/FlexBetween";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const NotFound = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);

  return (
    <FlexBetween sx={{ width: "100%", height: "100%" }}>
      <Box
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
        sx={{
          width: "100%",
          height: "100%",
        }}
      >
        <Typography sx={{ color: "#e2e8f0", fontSize: "2rem" }}>
          Sorry, the page you are trying to access does not exist !
        </Typography>
        <Button
          type="button"
          sx={{
            height: "4rem",
            m: "2rem 0",
            p: "1rem",
            backgroundColor: "#38bdf8",
            "&:hover": { backgroundColor: "#0ea5e9" },
          }}
          onClick={() => {
            if (!token) {
              navigate("/");
            } else {
              navigate("/home");
            }
          }}
        >
          <Typography sx={{ color: "#e2e8f0", fontSize: "1rem" }}>
            {!token ? "Back to Sign In page" : "Back to Homepage"}
          </Typography>
        </Button>
      </Box>
    </FlexBetween>
  );
};

export default NotFound;
