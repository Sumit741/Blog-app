import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import "../../styles/styles.css";

function ImageUpload({ setImage }) {
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFile) => {
      acceptedFile.forEach((file) => {
        setImage((prevState) => [...prevState, file]);
      });
    },
  });

  return (
    <div className="drag-container" {...getRootProps()}>
      <input {...getInputProps()} />
      <p>DROP & DRAG TO UPLOAD</p>
    </div>
  );
}

export default ImageUpload;
