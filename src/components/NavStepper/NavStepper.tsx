import { AppStep } from '@/types/types';
import './NavStepper.scss';

type NavStepperProps = {
  currentStep: AppStep;
};

export const NavStepper = ({ currentStep }: NavStepperProps) => {
  const steps = [
    { step: AppStep.AUDIO_UPLOAD, label: 'Audio Upload' },
    { step: AppStep.BPM_ANALYSIS, label: 'BPM Analysis' },
    { step: AppStep.IMAGE_UPLOAD, label: 'Image Upload' },
    { step: AppStep.PREVIEW, label: 'Preview' }
  ];

  return (
    <div className="nav-stepper">
      {steps.map(({ step, label }) => (
        <div 
          key={step}
          className={`
            nav-stepper__step
            ${step === currentStep ? 'nav-stepper__step--active' : ''}
            ${step < currentStep ? 'nav-stepper__step--completed' : ''}
          `}
        >
          <div className="nav-stepper__indicator">
            {step < currentStep ? '✓' : step + 1}
          </div>
          <span className="nav-stepper__label">{label}</span>
        </div>
      ))}
    </div>
  );
};