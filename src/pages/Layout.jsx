import { Box, Typography, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import ModelDropdown from "../components/ModelDropdown";
import SearchBar from "../components/SearchBar";
import UploadButton from "../components/UploadButton";

const GradientText = styled("span")({
  background: "linear-gradient(134deg, #8E2DE2 1.47%, #4A00E0 94.07%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontWeight: 700,
});

export default function Layout() {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        backgroundImage: `url("/BANNER.jpg"), linear-gradient(120deg, #f8fbff 60%, #f6f7fc 100%)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "left top",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            fontSize: { xs: 28, md: 40 },
            letterSpacing: -1,
          }}
        >
          Introducing <GradientText>AI-Powered</GradientText> Job Search Engine
        </Typography>
        <Typography
          sx={{
            mt: 2,
            fontSize: { xs: 16, md: 20 },
            color: "#333",
            fontWeight: 500,
            fontFamily: "'Urbanist', sans-serif",
          }}
        >
          Direct Access{" "}
          <Box component="span" sx={{ color: "#7b2ff2", fontWeight: 700 }}>
            12,70,000+
          </Box>{" "}
          Jobs World Wide
        </Typography>
      </Box>

      <Box
        sx={{ width: { xs: "100%", sm: 500, md: 650 }, mt: { xs: 6, md: 8 } }}
      >
        <Typography
          sx={{
            mb: 1,
            ml: 2,
            fontSize: 15,
            fontWeight: 600,
            color: "#444",
            display: "flex",
            alignItems: "center",
            gap: 1,
            fontFamily: "'Urbanist', sans-serif",
          }}
        >
          <AutoAwesomeIcon sx={{ color: "#7b2ff2", fontSize: 18 }} />
          Ask AI
        </Typography>

        <SearchBar />
      </Box>

      <Box
        sx={{
          width: { xs: "100%", sm: 500, md: 650 },
          mt: 2.5,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: 15,
            fontWeight: 500,
            color: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            gap: 1,
            fontFamily: "'Urbanist', sans-serif",
            paddingLeft: "18px",
          }}
        >
          <LightbulbOutlinedIcon sx={{ color: "#7b2ff2", fontSize: 18 }} />
          Try our Latest AI Models
        </Typography>
        <ModelDropdown />
      </Box>

      <Divider
        sx={{
          width: { xs: "100%", sm: 500, md: 650 },
          mt: 6,
          mb: 0.5,
          "&::before, &::after": {
            borderColor: "rgba(0,0,0,0.1)",
          },
        }}
      >
        <Typography sx={{ color: "rgba(0,0,0,0.4)", fontSize: 15, px: 2 }}>
          Or
        </Typography>
      </Divider>

      <UploadButton />

      <Box
        sx={{
          width: { xs: "100%", sm: 500, md: 650 },
          mt: 6,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: 17,
            color: "rgba(0,0,0,0.7)",
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
            gap: 1,
            fontFamily: "'Urbanist', sans-serif",
          }}
        >
          <AutoAwesomeIcon sx={{ color: "#7b2ff2", fontSize: 18 }} />
          Let AI do the work! Get the best job recommendations for you
        </Typography>
      </Box>
    </Box>
  );
}
