import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import React, { useEffect, Suspense } from "react";
import UserWidgetSkeleton from "components/skleleton/UserWidgetSkeleton";
import CreatePostSkeleton from "components/skleleton/CreatePostSkeleton";
import PostWidgetSkeleton from "components/skleleton/PostWidgetSkeleton";
import AdvertWidgetSkeleton from "components/skleleton/AdvertWidgetSkeleton";
import FriendListWidgetSkeleton from "components/skleleton/FriendListWidgetSkeleton";
const UserWidget = React.lazy(() => import("scenes/widgets/UserWidget"));
const MyPostWidget = React.lazy(() => import("scenes/widgets/MyPostWidget"));
const PostsWidget = React.lazy(() => import("scenes/widgets/PostsWidget"));
const AdvertWidget = React.lazy(() => import("scenes/widgets/AdvertWidget"));
const FriendListWidget = React.lazy(() =>
  import("scenes/widgets/FriendListWidget")
);

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);

  useEffect(() => {
    document.title = "FriendLink";
  }, []);
  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <Suspense fallback={<UserWidgetSkeleton />}>
            <UserWidget userId={_id} picturePath={picturePath} />
          </Suspense>
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <Suspense fallback={<CreatePostSkeleton />}>
            <MyPostWidget picturePath={picturePath} />
          </Suspense>
          <Suspense fallback={<PostWidgetSkeleton />}>
            <PostsWidget userId={_id} />
          </Suspense>
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <Suspense fallback={<AdvertWidgetSkeleton />}>
              <AdvertWidget />
            </Suspense>
            <Box margin="2rem 0" />
            <Suspense fallback={<FriendListWidgetSkeleton />}>
              <FriendListWidget userId={_id} />
            </Suspense>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
