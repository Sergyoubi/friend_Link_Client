import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

const UserWidgetSkeleton = () => {
  return (
    <Stack spacing={1}>
      <Skeleton variant="circular" width={60} height={60} />
      <Skeleton variant="rectangular" width={310} height={100} />
      <Skeleton variant="rectangular" width={310} height={30} />
      <Skeleton variant="rectangular" width={310} height={70} />
      <Skeleton variant="rectangular" width={310} height={70} />
    </Stack>
  );
};

export default UserWidgetSkeleton;
