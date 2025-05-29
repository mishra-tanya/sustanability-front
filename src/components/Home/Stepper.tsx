import { Box, Stepper, Step, StepLabel, Typography,   } from "@mui/material";

const steps = [
  {
    description: `Register for the Olympiad`,
  },
  {
    description:"Choose from any of the 17 UN Sustainable Development Goals",
  },
  {
    description: `Complete three engaging tests for each SDG`,
  },
   {
    description: `Earn certificates recognizing your knowledge and commitment`,
  },
  {
    description: `Share your achievement and inspire others`,
  },
];

export default function VerticalLinearStepper() {

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
            padding:3,
          maxWidth: 800,
          width: "100%",
          "@media (min-width:1024px)": {
            display: "grid",
            columnGap: 2,
          },
        }}
      >
        <Stepper
          orientation="vertical"
          sx={{
            "& .MuiStep-root": {
              position: "relative",
            },
            "& .MuiStepLabel-root": {
              width: "100%",
            },
            "& .MuiStepLabel-label": {
              textAlign: "center", 
            },
            "@media (min-width:1024px)": {
              "& .MuiStep-root:nth-of-type(odd)": {
                gridColumnStart: 1,
              },
              "& .MuiStep-root:nth-of-type(even)": {
                gridColumnStart: 2,
              },
              "& .MuiStepLabel-label": {
                textAlign: "inherit",
              },
            },
          }}
        >
          {steps.map((step) => (
            <Step key={step.description}>
              <StepLabel>
                <Typography variant="h6">{step.description}</Typography>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
    </Box>
  );
}
