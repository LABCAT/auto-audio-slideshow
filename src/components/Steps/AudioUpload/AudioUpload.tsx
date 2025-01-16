import { useCallback, useState } from 'react';
import { useDropzone, FileRejection } from 'react-dropzone';
import { AudioUploadProps } from '@/types/types';
import './AudioUpload.scss';

export const AudioUpload = ({ onAudioSelect, currentFile, error: propError }: AudioUploadProps) => {
    const [error, setError] = useState('');

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setError('');
        const file = acceptedFiles[0];
        if (file) {
            onAudioSelect(file);
        }
    }, [onAudioSelect]);

    const onDropRejected = useCallback((fileRejections: FileRejection[]) => {
        const rejection = fileRejections[0];
        if (rejection.errors[0].code === 'file-invalid-type') {
            setError('Invalid file type. Only MP3 and OGG files are allowed.');
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        onDropRejected,
        accept: {
            'audio/mpeg': ['.mp3'],
            'audio/ogg': ['.ogg', '.oga']
        },
        maxFiles: 1,
        multiple: false
    });

    return (
        <div className="audio-upload">
            <div
                {...getRootProps()}
                className={`audio-upload__dropzone ${isDragActive ? 'audio-upload__dropzone--active' : ''}`}
            >
                <input {...getInputProps()} />
                {currentFile ? (
                    <div className="audio-upload__selected">
                        <svg className="audio-upload__icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 18V5l12-2v13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="2"/>
                            <circle cx="18" cy="16" r="3" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        <p className="audio-upload__filename">{currentFile.name}</p>
                    </div>
                ) : (
                    <p>Drop your audio file here or click to select</p>
                )}
                {(error || propError) && <p className="audio-upload__error">{error || propError}</p>}
            </div>
        </div>
    );
};