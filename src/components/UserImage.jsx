import { Box } from "@mui/material";

const UserImage = ({ image, size = "60px" }) => {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user profile"
        src={`http://localhost:5000/assets/${image}`}
        // images are stored in backend Server; only Images's Name is sent from backend Server (then stored in global state),so we have to fetch it directly from Server.js
      />
    </Box>
  );
};

export default UserImage;
