import { Box, Typography, Chip, Stack, Avatar, Paper } from "@mui/material";
import GraduateIcon from "../assets/GraduateIcon";
import LocationIcon from "../assets/LocationIcon";
import { CompanyLogoOrAvatar } from "../pages/JobCards";

const JobCard = ({ job }) => {
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
        <Stack direction="row" spacing={8} alignItems="self-start">
          <Box>
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{
                color: "#000",
                fontSize: "21px",
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
                fontSize: "21px",
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
              <Chip
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
              />
            </Stack>
            <Stack direction="row" spacing={2} mt={1}>
              <Stack gap={1}>
                <Typography
                  sx={{
                    color: "#000",
                    fontSize: "16px",
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
                      fontSize: "12px",
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
                    fontSize: "16px",
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
          </Box>
          <CompanyLogoOrAvatar company={job?.company_name} />
        </Stack>
      </Stack>
    </Paper>
  );
};

export default JobCard;
