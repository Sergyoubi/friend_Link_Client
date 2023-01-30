import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

const PostWidgetSkeleton = () => {
  return (
    <Stack spacing={1} m="1rem 0" sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
          width: "100%",
        }}
        m="1.5rem 0"
      >
        <Skeleton variant="circular" width={80} height={80} />
        <Skeleton
          variant="rectangular"
          width={100}
          height={30}
          sx={{ margin: "0 1rem" }}
        />
      </Box>
      <Skeleton variant="rounded" width="100%" height={100} m="2rem 0" />
    </Stack>
  );
};

export default PostWidgetSkeleton;
