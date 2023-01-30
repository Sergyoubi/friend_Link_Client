import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

const FriendListWidgetSkeleton = () => {
  return (
    <Stack spacing={1} sx={{ width: "100%" }}>
      <Skeleton variant="rounded" width={"100%"} height={150} />
    </Stack>
  );
};

export default FriendListWidgetSkeleton;
