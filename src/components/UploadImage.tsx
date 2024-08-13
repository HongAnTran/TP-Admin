import React, { useState, ChangeEvent, MouseEvent } from 'react';
import axios from 'axios';

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleFileUpload = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    
    if (!file) {
      alert('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setUploading(true);
    setUploadSuccess(null);
    setUploadError(null);

    try {
      const response = await axios.post('http://localhost:4000/v1/static/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setUploadSuccess(response.data.url);
    } catch (error) {
      setUploadError('Failed to upload file.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h1>Upload Image</h1>
      <input type="file" onChange={handleFileChange}      accept="image/*" />
      <button onClick={handleFileUpload} disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
      {uploadSuccess && <p>File uploaded successfully! URL: <a href={uploadSuccess} target="_blank" rel="noopener noreferrer">{uploadSuccess}</a></p>}
      {uploadError && <p style={{ color: 'red' }}>{uploadError}</p>}
    </div>
  );
};

export default FileUpload;
