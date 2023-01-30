import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

const AdvertWidgetSkeleton = () => {
  return (
    <Stack spacing={1} sx={{ width: "100%" }}>
      <Skeleton variant="rounded" width={"100%"} height={330} />
      <Skeleton variant="rectangular" width={"100%"} height={130} />
    </Stack>
  );
};

export default AdvertWidgetSkeleton;
