import React, { useState } from 'react';
import { Button, CircularProgress, Dialog, IconButton } from '@mui/material';
import { Delete, ZoomIn } from '@mui/icons-material';
import { FileDetail } from '@/types/File.type';
import FileService from '@/services/File.service';

interface UploadImageProps {
  onSuccess: (file: FileDetail) => void;
  onDelete?: (id: number) => void;
}

const SingleImageUpload: React.FC<UploadImageProps> = ({ onSuccess, onDelete }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedImage, setUploadedImage] = useState<FileDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append('file', selectedFile);
    try {
      setLoading(true);
      const response = await FileService.upload(formData);
      setUploadedImage(response.data);
      onSuccess(response.data);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!uploadedImage) return;

    try {
      await FileService.delete(uploadedImage.id); // Assuming FileService.delete exists
      setUploadedImage(null);
      setSelectedFile(null);
      onDelete?.(uploadedImage.id);
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  return (
    <div>
      {/* File Input */}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        id="image-upload-input"
      />
      <label htmlFor="image-upload-input">
        <Button variant="contained" component="span">
          Tải lên
        </Button>
      </label>

      {/* Upload Button */}
      {selectedFile && !uploadedImage && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          disabled={loading}
          style={{ marginLeft: '10px' }}
        >
          {loading ? <CircularProgress size={24} /> : 'Upload'}
        </Button>
      )}

      {/* Display Uploaded Image */}
      {uploadedImage && (
        <div style={{ marginTop: '20px', position: 'relative' }}>
          <img
            src={uploadedImage.url}
            alt={uploadedImage.name || 'Uploaded'}
            style={{ width: '200px', height: 'auto', cursor: 'pointer' }}
            onClick={() => setOpenDialog(true)}
          />
          {/* Zoom and Delete Buttons */}
          <IconButton color="primary" onClick={() => setOpenDialog(true)}>
            <ZoomIn />
          </IconButton>
          <IconButton color="secondary" onClick={handleDelete}>
            <Delete />
          </IconButton>
        </div>
      )}

      {/* Dialog for Zoomed Image */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        {uploadedImage && (
          <img
            src={uploadedImage.url}
            alt={uploadedImage.name || 'Zoomed'}
            style={{ width: '100%', height: 'auto' }}
          />
        )}
      </Dialog>
    </div>
  );
};

export default SingleImageUpload;
