export enum AppStep {
    AUDIO_UPLOAD = 0,
    BPM_ANALYSIS = 1,
    IMAGE_UPLOAD = 2,
    PREVIEW = 3
}

export type AudioFile = {
    file: File;
    bpm?: number;
    detectedBpm?: number;
};

export type ImageFile = {
    file: File;
    id: string;
};

export type AppState = {
    audioFile: AudioFile | null;
    images: ImageFile[];
    currentStep: AppStep;
};

export type NavigationProps = {
    currentStep: AppStep;
    canProgress: boolean;
    onNext: () => void;
    onBack: () => void;
};

export type AudioUploadProps = {
    onAudioSelect: (file: File) => void;
    currentFile: File | null;
    error?: string;
};

export type BpmAnalysisProps = {
    audioFile: AudioFile;
    onBpmConfirm: (bpm: number) => void;
};

export type ImageUploadProps = {
    onImagesSelect: (files: File[]) => void;
    images: ImageFile[];
    error?: string;
};

export type PreviewProps = {
    audioFile: AudioFile;
    images: ImageFile[];
};