import React, { useState, ChangeEvent, MouseEvent } from 'react';
import FileService from '@/services/FileService';
import { FileDetail } from '@/types/File.type';
import { toast } from 'react-toastify';

const FileUpload = ({ onSuccess }: { onSuccess?: (file: FileDetail) => void }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadSuccess, setUploadSuccess] = useState<string[] | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);


  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFiles(Array.from(event.target.files));
    }
  };

  const handleFileUpload = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  
    if (files.length === 0) {
      toast.error('Please select at least one file.');
      return;
    }
  
    setUploading(true);
    setUploadSuccess(null);
    setUploadError(null);
  
    const uploadPromises = files.map(async (file) => {
      const formData = new FormData();
      formData.append('file', file);
  
      try {
        const response = await FileService.upload(formData, {
          isOptimize: true,
          height: 200,
          width: 200
        });
        return response.url;
      } catch (error) {
        throw new Error('Failed to upload file.');
      }
    });
  
    try {
      const responses = await Promise.all(uploadPromises);
      setUploadSuccess(responses);
      // onSuccess?.(responses);
    } catch (error) {
      setUploadError('Failed to upload one or more files.');
    } finally {
      setUploading(false);
    }
  };


  if (uploadSuccess) {

    return <img src={uploadSuccess[0]} className=' w-20 h-20' />
  }

  return (
    <div>
      <input type="file" onChange={handleFileChange} accept="image/*" multiple />
      <button onClick={handleFileUpload} disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
      {uploadError && <p style={{ color: 'red' }}>{uploadError}</p>}
    </div>
  );
};

export default FileUpload;
