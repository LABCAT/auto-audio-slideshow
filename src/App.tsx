import { useCallback, useState } from 'react';
import { useDropzone, FileRejection, DropEvent } from 'react-dropzone';
import "./styles/main.scss";
import "./App.scss";

function App() {
  const [error, setError] = useState('');
  const [currentFile, setCurrentFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError('');  // Clear any existing errors
    const file = acceptedFiles[0];

    if (file) {
      setCurrentFile(file);
    }
  }, []);

  const onDropRejected = useCallback((fileRejections: FileRejection[]) => {
    const rejection = fileRejections[0];
    if (rejection.errors[0].code === 'file-invalid-type') {
      setError('Invalid file type. Only MP3 and OGG files are allowed.');
    }
    setCurrentFile(null);  
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
    <div className="app">
      <div className="app__container">
        <h1>Auto Audio Slideshow</h1>
        <p>Create audio synchronized slideshows from your photos</p>
        <div
          {...getRootProps()}
          className={`app__dropzone ${isDragActive ? 'app__dropzone--active' : ''}`}
        >
          <input {...getInputProps()} />
          {currentFile ? (
            <div className="app__selected">
              <svg className="app__icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18V5l12-2v13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="2"/>
                <circle cx="18" cy="16" r="3" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <p className="app__filename"> {currentFile.name}</p>
            </div>
            ) : (
            <p>Drop your audio file here or click to select</p>
          )}
          {error && <p className="app__error">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default App;