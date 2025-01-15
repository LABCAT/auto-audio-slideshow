import Dropzone from "react-dropzone-uploader";
import "react-dropzone-uploader/dist/styles.css";
import "./styles/main.scss";
import "./App.scss";

function App() {
  const handleChangeStatus = ({ meta, remove }, status: string) => {
    if (status === "headers_received") {
      console.log("Uploading", meta);
    } else if (status === "aborted") {
      remove();
    }
  };

  const handleSubmit = (files) => {
    const file = files[0];
    if (file) {
      console.log(file.meta);
    }
  };

  return (
    <div className="app">
      <div className="app__container">
        <h1>Auto Audio Slideshow</h1>
        <p>Create audio synchronized slideshows from your photos</p>
        <Dropzone
          classNames={{
            dropzone: "app__dropzone",
            dropzoneActive: "app__dropzone--active",
          }}
          accept="audio/mpeg,audio/ogg"
          maxFiles={1}
          multiple={false}
          canCancel={false}
          onChangeStatus={handleChangeStatus}
          onSubmit={handleSubmit}
          inputContent="Drop your audio file here or click to select"
          styles={{
            dropzone: { borderWidth: 2, borderColor: "var(--color-border)" },
            dropzoneActive: { borderColor: "var(--color-border-hover)" },
          }}
        />
      </div>
    </div>
  );
}

export default App;
