// JobCardSkeleton.js

import { Card, CardContent, Box, Stack, Skeleton } from "@mui/material";
import { motion } from "framer-motion";

// Shimmer effect ke liye keyframes
const keyframes = `
  @keyframes shimmer {
    0% { background-position: -1200px 0; }
    100% { background-position: 1200px 0; }
  }
`;

// Shimmer style (thoda refined)
const shimmerStyle = {
  animation: `shimmer 2s infinite linear`,
  background: `linear-gradient(to right, transparent 8%, rgba(255, 255, 255, 0.3) 18%, transparent 33%)`,
  backgroundSize: "1200px 100%",
};

// Framer Motion Variants
// Parent container ke liye
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07, // Har child ke beech mein 0.07s ka delay
    },
  },
};

// Har ek skeleton item ke liye
const itemVariants = {
  hidden: { y: 10, opacity: 0 }, // Neeche se upar aayega aur fade-in hoga
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

// Helper component taaki code repeat na ho
const MotionSkeleton = ({ variant, sx, ...props }) => (
  <motion.div variants={itemVariants}>
    <Skeleton
      variant={variant}
      animation={false} // MUI ka animation band karke apna use karenge
      sx={{ ...sx, ...shimmerStyle, bgcolor: "rgba(0, 0, 0, 0.08)" }}
      {...props}
    />
  </motion.div>
);

const JobCardSkeleton = () => {
  return (
    <Card
      sx={{
        flexBasis: {
          xs: "100%",
          sm: "calc(50% - 24px)",
          md: "calc(33.33% - 24px)",
        },
        maxWidth: 350,
        p: 2,
        borderRadius: "18px 18px 25px 25px",
        background: "#fff",
        position: "relative",
        boxShadow: `
          #D2E8FF 0px 20px 0px 0px inset,
          #D2E8FF 10px 0px 0px 0px inset,
          #D2E8FF -10px 0px 0px 0px inset,
          #D2E8FF 0px -70px 0px 0px inset
        `,
        overflow: "hidden", // Important for shimmer to not overflow card
      }}
    >
      <style>{keyframes}</style>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <CardContent sx={{ px: 3, pt: 2.5, pb: 10 }}>
          {/* Company Logo and Name */}
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
            <MotionSkeleton variant="circular" width={44} height={44} />
            <MotionSkeleton variant="text" width="4000%" />
          </Stack>

          {/* Job Title & Salary */}
          <MotionSkeleton
            variant="text"
            sx={{ fontSize: "1.25rem", mb: 0.5 }}
          />
          <MotionSkeleton variant="text" width="60%" sx={{ mb: 1.5 }} />

          {/* Job Type Chip */}
          <MotionSkeleton
            variant="rounded"
            width={80}
            height={24}
            sx={{ mb: 2, borderRadius: 2 }}
          />

          {/* Job Description */}
          <Box sx={{ mb: 1.5 }}>
            <MotionSkeleton variant="text" width="70%" sx={{ mb: 0.5 }} />
            <MotionSkeleton variant="text" />
            <MotionSkeleton variant="text" width="80%" />
          </Box>

          {/* Skills */}
          <MotionSkeleton variant="text" width="40%" sx={{ mb: 1 }} />
          <Stack direction="row" flexWrap="wrap" spacing={1} sx={{ mb: 2 }}>
            <MotionSkeleton
              variant="rounded"
              width={60}
              height={22}
              sx={{ borderRadius: 3 }}
            />
            <MotionSkeleton
              variant="rounded"
              width={75}
              height={22}
              sx={{ borderRadius: 3 }}
            />
            <MotionSkeleton
              variant="rounded"
              width={50}
              height={22}
              sx={{ borderRadius: 3 }}
            />
          </Stack>

          {/* Education & Location */}
          <Stack direction="column" spacing={2} justifyContent="space-between">
            <Stack direction="row" alignItems="flex-start" gap={1}>
              <MotionSkeleton variant="circular" width={20} height={20} />
              <Box sx={{ flex: 1 }}>
                <MotionSkeleton variant="text" width="50%" />
                <MotionSkeleton variant="text" width="80%" />
              </Box>
            </Stack>
            <Stack direction="row" alignItems="flex-start" gap={1}>
              <MotionSkeleton variant="circular" width={20} height={20} />
              <Box sx={{ flex: 1 }}>
                <MotionSkeleton variant="text" width="50%" />
                <MotionSkeleton variant="text" width="80%" />
              </Box>
            </Stack>
          </Stack>
        </CardContent>

        {/* View Jobs Button */}
        <Box
          sx={{
            position: "absolute",
            bottom: 16,
            left: 16,
            right: 16,
          }}
        >
          <MotionSkeleton
            variant="rectangular"
            height={38}
            sx={{ borderRadius: 5, py: 0.5, px: 0.5 }}
          />
        </Box>
      </motion.div>
    </Card>
  );
};

export default JobCardSkeleton;
