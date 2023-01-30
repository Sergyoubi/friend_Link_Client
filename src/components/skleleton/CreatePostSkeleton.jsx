import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

const CreatePostSkeleton = () => {
  return (
    <Stack spacing={1}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Skeleton variant="circular" width={80} height={80} />
        <Skeleton variant="rectangular" width={380} height={100} />
      </Box>
      <Skeleton variant="rounded" width={"100%"} height={60} />
    </Stack>
  );
};

export default CreatePostSkeleton;
