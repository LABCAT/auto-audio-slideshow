import { useState } from 'react';
import { AudioUpload } from '@/components/Steps/AudioUpload/AudioUpload';
import { NavStepper } from '@/components//NavStepper/NavStepper';
import { AppState, AppStep } from './types/types';
import "./styles/main.scss";
import "./App.scss";

function App() {
  const [state, setState] = useState<AppState>({
    audioFile: null,
    images: [],
    currentStep: AppStep.AUDIO_UPLOAD
  });

  const handleAudioSelect = (file: File) => {
    setState(prev => ({
      ...prev,
      audioFile: { file }
    }));
  };

  const handleNextStep = () => {
    setState(prev => {
      const nextStep = prev.currentStep + 1;
      return {
        ...prev,
        currentStep: nextStep
      };
    });
  };

  const canProgressToNextStep = () => {
    switch (state.currentStep) {
      case AppStep.AUDIO_UPLOAD:
        return !!state.audioFile;
      case AppStep.BPM_ANALYSIS:
        // Add logic for BPM analysis completion if needed
        return true;
      case AppStep.IMAGE_UPLOAD:
        return state.images.length > 0;
      case AppStep.PREVIEW:
        return false;
      default:
        return false;
    }
  };

  return (
    <div className="app">
      <div className="app__container">
        <h1>Auto Audio Slideshow</h1>
        <p>Create audio synchronized slideshows from your photos</p>

        <NavStepper 
          currentStep={state.currentStep}
          canProgress={canProgressToNextStep()}
          onNext={handleNextStep}
        />

        {state.currentStep === AppStep.AUDIO_UPLOAD && (
          <AudioUpload
            onAudioSelect={handleAudioSelect}
            currentFile={state.audioFile?.file || null}
          />
        )}
        {/* Add other step components here as needed */}
      </div>
    </div>
  );
}

export default App;