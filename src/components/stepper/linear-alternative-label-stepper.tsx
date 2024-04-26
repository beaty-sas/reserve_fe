import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import Stepper from '@mui/material/Stepper';
import StepLabel from '@mui/material/StepLabel';

// ----------------------------------------------------------------------

interface Props {
  activeStep: number;
}

const steps = ['Оберіть Послугу', 'Оберіть час', 'Введіть ваші дані'];

export default function LinearAlternativeLabel({ activeStep }: Props) {

  return (
    <Box sx={{ maxWidth: 800 }} alignItems={'center'} ml={'auto'} mr={'auto'} mb={2}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};

          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
}
