'use client';
import { Button } from '@/component/ui/button';
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios'; // Import axios for making HTTP requests

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 200, // Reduce thumbnail size for better layout
  height: 200,
  padding: 4,
  boxSizing: 'border-box'
};

const img = {
  display: 'block',
  width: '100%',
  height: '100%',
  objectFit: 'cover' // Ensure image fits inside thumbnail container
};

function DetectPage() {
  const [files, setFiles] = useState([]);
  const [detect, setDetect] = useState('');
  const [confidence, setConfidence] = useState('');
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );
    }
  });

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <img src={file.preview} style={img} alt="Uploaded Image" />
    </div>
  ));

  const handleImageSwap = async () => {
    if (files.length === 0) {
      alert('Please select an image.');
      return;
    }

    const formData = new FormData();
    formData.append('image', files[0]); // Assuming only one file is selected

    const apiUrl = 'http://172.20.10.4:8000/detect';

    try {
      const response = await axios.post(apiUrl, formData);
      console.log('Response Data:', response.data.class);
      setDetect(response.data.class)
      console.log('Response Data:', response.data.confidence_score);
      setConfidence(response.data.confidence_score)
      // Handle the response data here (update state, display result, etc.)
    } catch (error) {
      console.error('Image Upload Error:', error);
      alert('An error occurred while uploading the image. Please try again.');
    }
  };

  useEffect(() => {
    // Clean up preview URLs to avoid memory leaks
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  return (
    <div className="container">
      <section className="border flex justify-center">
        <div {...getRootProps({ className: 'dropzone flex items-center text-center justify-between border border-dashed p-2 rounded-xl transition-all duration-400 h-full w-full border-black"' })}>
          <input {...getInputProps()}  />
          <p clas>Зураг оруулна уу</p>
        </div>
      </section>
      <aside style={thumbsContainer}>{thumbs}</aside>
      <p>{detect}</p>
      <p>{confidence}</p>
      <Button type="button" onClick={handleImageSwap}>
        таних
      </Button>
    </div>
  );
}

export default DetectPage;
