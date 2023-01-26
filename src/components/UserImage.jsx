import { Box } from "@mui/material";
import { useEffect, useState } from "react";

const UserImage = ({ image, size = "60px" }) => {
  const [url, setUrl] = useState(null);

  useEffect(() => {
    setUrl("https://erin-lucky-mite.cyclic.app");
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user profile"
        src={`${url}/assets/${image}`}
        // images are stored in backend Server; only Images's Name is sent from backend Server (then stored in global state),so we have to fetch it directly from Server.js
      />
    </Box>
  );
};

export default UserImage;
