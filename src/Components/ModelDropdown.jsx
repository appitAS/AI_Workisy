import React, { useState } from "react";
import {
  Box,
  Button,
  Menu,
  MenuItem,
  Typography,
  Chip,
  ListItemIcon,
  IconButton,
  Tooltip,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import useJobStore from "../store/jobStore";

const allModels = [
  { label: "SNR", name: "sonar", comment: "Perplexity's fast model" },
  {
    label: "SNR-Pro",
    name: "sonar-pro",
    comment: "Anthropic's advanced model",
    badge: "new",
    badgeColor: "primary",
  },
];

export default function ModelDropdown() {
  const { setOnselectedModel } = useJobStore();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedModel, setSelectedModel] = useState(allModels[0]);

  const mainModels = allModels.slice(0, 3);
  const extraModels = allModels.slice(3);

  const handleSelect = (model) => {
    setSelectedModel(model);
    setAnchorEl(null);
    if (setOnselectedModel) setOnselectedModel(model);
  };

  const handleMoreClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        alignItems: "center",
        flexWrap: "wrap",
        ml: "2rem",
      }}
    >
      {mainModels.map((model) => (
        <Tooltip key={model.name} title={model.comment} arrow placement="top">
          <Button
            onClick={() => handleSelect(model)}
            size="small"
            sx={{
              px: 1.4,
              py: 0.4,
              fontSize: 11,
              borderRadius: 10,
              textTransform: "none",
              backgroundColor:
                selectedModel.name === model.name ? "black" : "#f5f5f5",
              color: selectedModel.name === model.name ? "#fff" : "#333",
              fontWeight: 500,
              boxShadow: selectedModel.name === model.name ? 2 : 0,
              "&:hover": {
                backgroundColor: "#eaeaea",
                color: "black",
              },
            }}
          >
            {model.label}
          </Button>
        </Tooltip>
      ))}

      <IconButton
        onClick={handleMoreClick}
        size="small"
        sx={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          backgroundColor: "#f5f5f5",
          border: "1px solid #ddd",
          "&:hover": {
            backgroundColor: "#e0e0e0",
          },
        }}
      >
        <MoreHorizIcon fontSize="small" />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 260,
            borderRadius: 2,
            p: 0.5,
            boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
          },
        }}
      >
        {extraModels.map((model) => (
          <Tooltip
            key={model.name}
            title={model.comment}
            arrow
            placement="right"
          >
            <MenuItem
              onClick={() => handleSelect(model)}
              sx={{
                borderRadius: 1.5,
                py: 1.2,
                px: 1.5,
                display: "flex",
                alignItems: "flex-start",
                gap: 1,
                "&:hover": {
                  backgroundColor: "#f9f9f9",
                },
              }}
            >
              {selectedModel.name === model.name && (
                <ListItemIcon sx={{ minWidth: 0, mr: 1, color: "#000" }}>
                  <CheckIcon fontSize="small" />
                </ListItemIcon>
              )}
              <Box>
                <Typography variant="subtitle2" fontWeight={600} fontSize={13}>
                  {model.label}
                  {model.badge && (
                    <Chip
                      label={model.badge}
                      color={model.badgeColor || "primary"}
                      size="small"
                      sx={{
                        ml: 1,
                        height: 16,
                        fontSize: 9,
                        fontWeight: 600,
                        borderRadius: "6px",
                      }}
                    />
                  )}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ fontSize: 11, opacity: 0.65 }}
                >
                  {model.name}
                </Typography>
              </Box>
            </MenuItem>
          </Tooltip>
        ))}
      </Menu>
    </Box>
  );
}
