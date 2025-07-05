import { Box, Typography, Chip, Stack, Avatar, Paper } from "@mui/material";
import GraduateIcon from "../assets/GraduateIcon";
import LocationIcon from "../assets/LocationIcon";
import useIsMobile from "./useIsMobile";

const JobCard = ({ job }) => {
  const isMobile = useIsMobile();

  const CompanyLogoOrAvatar = ({ logo, company }) => (
    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
      {logo ? (
        <Box sx={{ mr: 1 }}>{logo}</Box>
      ) : (
        <Avatar
          sx={{
            width: 44,
            height: 44,
            mr: 1,
            background:
              "linear-gradient(134deg, #8E2DE2 1.47%, #4A00E0 94.07%)",
            fontWeight: 700,
            fontSize: 28,
          }}
        >
          {company?.[0]?.toUpperCase() || "?"}
        </Avatar>
      )}
      <Typography
        variant="subtitle1"
        sx={{ color: "#757575", fontWeight: 500 }}
      >
        {company}
      </Typography>
    </Box>
  );

  return (
    <Paper
      elevation={2}
      sx={{
        padding: "18px",
        borderRadius: 3,
        background: "#FFF",
        boxShadow: "0px 0px 4px 3px rgba(0, 0, 0, 0.10)",
      }}
    >
      <Stack>
        <Typography
          sx={{
            color: "#0066B3",
            fontSize: "16px",
            fontWeight: 600,
            lineHeight: "120%",
            marginBottom: "18px",
          }}
        >
          About this job
        </Typography>
        <Stack
          direction="row"
          spacing={isMobile ? 1 : 8}
          alignItems="self-start"
        >
          <Box>
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{
                color: "#000",
                fontSize: isMobile ? "16px" : "21px",
                fontWeight: 600,
                lineHeight: "120%",
                maxWidth: "285px",
                marginBottom: "18px",
              }}
            >
              {job?.job_title || "Job Title"}
            </Typography>
            <Typography
              variant="subtitle2"
              color="textSecondary"
              sx={{
                color: "#3D3D3D",
                fontSize: isMobile ? "16px" : "21px",
                fontWeight: 600,
                lineHeight: "120%",
                marginBottom: "18px",
              }}
            >
              {`₹ ${job?.salary}`}
            </Typography>
            <Stack direction="row" spacing={1} mb="26px">
              <Chip
                label={job?.job_type}
                size="small"
                sx={{
                  borderRadius: "8p",
                  background: "#FFF",
                  boxShadow: "0px 0px 4px 1px rgba(0, 0, 0, 0.25)",
                  padding: "5px 10px",
                  color: "#055087",
                  fontSize: "12px",
                  fontWeight: 600,
                  lineHeight: "120%",
                }}
              />
              <Chip
                label={job?.job_location?.split("/")[0]}
                size="small"
                sx={{
                  borderRadius: "8p",
                  background: "#FFF",
                  boxShadow: "0px 0px 4px 1px rgba(0, 0, 0, 0.25)",
                  padding: "5px 10px",
                  color: "#055087",
                  fontSize: "12px",
                  fontWeight: 600,
                  lineHeight: "120%",
                }}
              />
              {/* <Chip
                label="2yr+ Exp"
                size="small"
                sx={{
                  borderRadius: "8p",
                  background: "#FFF",
                  boxShadow: "0px 0px 4px 1px rgba(0, 0, 0, 0.25)",
                  padding: "5px 10px",
                  color: "#055087",
                  fontSize: "12px",
                  fontWeight: 600,
                  lineHeight: "120%",
                }}
              /> */}
            </Stack>
          </Box>
          <CompanyLogoOrAvatar company={job?.company_name} />
        </Stack>
      </Stack>
      <Stack direction="row" spacing={2} mt={1}>
        <Stack gap={1}>
          <Typography
            sx={{
              color: "#000",
              fontSize: isMobile ? "12px" : "16px",
              fontWeight: 600,
              lineHeight: "120%",
            }}
          >
            Job Location
          </Typography>
          <Stack direction="row" gap={1} alignItems="center">
            <LocationIcon />
            <Typography
              variant="body2"
              sx={{
                color: "#000",
                fontWeight: 400,
                lineHeight: "120%",
              }}
            >
              {job?.job_location}
            </Typography>
          </Stack>
        </Stack>
        <Stack gap={1}>
          <Typography
            sx={{
              color: "#000",
              fontSize: isMobile ? "12px" : "16px",
              fontWeight: 600,
              lineHeight: "120%",
            }}
          >
            Education
          </Typography>
          <Stack direction="row" gap={1} alignItems="center">
            <GraduateIcon />
            <Typography
              variant="body2"
              sx={{
                color: "#000",
                fontSize: "12px",
                fontWeight: 400,
                lineHeight: "120%",
              }}
            >
              {job?.education_qualification || "Not Available"}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default JobCard;
