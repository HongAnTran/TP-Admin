import React, { useState, useEffect } from 'react';
import { Button, Modal, List, ListItem, ListItemText, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { FileDetail } from '@/types/File.type';
import SingleImageUpload from '../SingleImageUpload';
import FileService from '@/services/File.service';
import cn from '@/utils/cn';

interface FileManagerProps {
  onFileSelect: (file: FileDetail) => void;
}

const FileManager: React.FC<FileManagerProps> = ({ onFileSelect }) => {
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<FileDetail | null>(null);

  const { data: fileList, refetch, isSuccess, isFetching } = FileService.useListArr({}, { enabled: open })



  const handleFileSelect = (file: FileDetail) => {
    setSelectedFile(file);
  };

  const handleSave = () => {
    if (selectedFile) {
      onFileSelect(selectedFile);
      setOpen(false);
    }
  };
  const handleUploadSuccess = () => {
    refetch();
  };

  const datas = fileList || []

  return (
    <div>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Manage Files
      </Button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={{ backgroundColor: 'white', padding: '20px', margin: '50px auto', maxWidth: '80vw' }} className=' overflow-auto'>
          <DialogTitle>Manage Files
            <SingleImageUpload onSuccess={handleUploadSuccess} onDelete={() => { }} />

          </DialogTitle>
          <DialogContent>
            <ul className=' grid grid-cols-6 gap-3  overflow-auto max-h-[700px]'>
              {datas.map((file) => (
                <li

                  key={file.id}
                  className={cn("p-2 border rounded-md", {
                    " border-green-500  border-2": selectedFile?.id === file.id
                  })}
                  onClick={() => handleFileSelect(file)}
                >
                  <img src={file.url} className='  w-full h-[100px]' />
                </li>
              ))}
            </ul>

          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="contained" color="primary" onClick={handleSave} disabled={!selectedFile}>
              Save
            </Button>
          </DialogActions>
        </div>
      </Modal>
    </div>
  );
};

export default FileManager;
