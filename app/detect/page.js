'use client';
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios'; // Import axios for making HTTP requests
import { Button } from 'antd';

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
  width: 200,
  height: 200,
  boxSizing: 'border-box'
};

const img = {
  display: 'block',
  width: '100%',
  height: '100%',
  objectFit: 'cover'
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

    const apiUrl = 'http://192.168.1.239:8000/detect';

    try {
      const response = await axios.post(apiUrl, formData);
      console.log('Response Data:', response.data.class);
      setDetect(response.data.class);
      console.log('Response Data:', response.data.confidence_score);
      setConfidence(response.data.confidence_score);
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
    <div className="p-8">
      <section className=" flex justify-center">
        <div {...getRootProps({ className: 'dropzone flex flex-col items-center text-center justify-between border border-dashed p-2 rounded-xl transition-all duration-400 border-black' })}>
          <input {...getInputProps()} />
          <p>Зураг оруулна уу</p>
          <div style={thumbsContainer}>{thumbs}</div>
        </div>
        
      </section>
     <div className="justify-center text-center p-5" >
     <p>{
      detect == 'Real' ? 'Энгийн': 'Хуурамч'}</p>
      <p>{confidence}</p>
      <Button type="dashed" onClick={handleImageSwap} className='mt-2' >
        таних
      </Button>
     </div>
    </div>
  );
}

export default DetectPage;
