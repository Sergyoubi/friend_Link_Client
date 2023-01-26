import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useEffect } from "react";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const [url, setUrl] = useState(null);

  useEffect(() => {
    setUrl("https://erin-lucky-mite.cyclic.app");
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
      </FlexBetween>

      <img
        src={`${url}/assets/shampoo.jpeg`}
        alt="advert"
        width="100%"
        height="auto"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>L'Oreal Paris</Typography>
        <Typography color={main}>www.loreal-paris.fr</Typography>
      </FlexBetween>
      <Typography color={medium} margin="0.5rem 0">
        Indulge in caring formulas without the weigh down. L'Oreal Paris offers
        hair conditioners for every concern and hair type.
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
