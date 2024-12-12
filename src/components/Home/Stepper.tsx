import { Box, Stepper, Step, StepLabel, Typography,   } from "@mui/material";

const steps = [
  {
    description: `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`,
  },
  {
    description:
      "An ad group contains one or more ads which target a shared set of keywords.",
  },
  {
    description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
  },
];

export default function VerticalLinearStepper() {

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
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
