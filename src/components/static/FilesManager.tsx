import React, { useState } from 'react';
import { Button, DialogActions, DialogContent, DialogTitle, Dialog } from '@mui/material';
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

  const { data: fileList, refetch } = FileService.useListArr({}, { enabled: open })



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
        Chọn ảnh
      </Button>

      <Dialog fullWidth maxWidth="lg" open={open} onClose={() => setOpen(false)} >
        <DialogTitle>Chọn ảnh
          <SingleImageUpload onSuccess={handleUploadSuccess} onDelete={() => { }} />
        </DialogTitle>
        <DialogContent>
          <ul className=' grid grid-cols-6 gap-3  overflow-auto w-full max-h-[500px] lg:max-h-[500px]'>
            {datas.map((file) => (
              <li
                key={file.id}
                className={cn("p-2   aspect-square border rounded-md", {
                  " border-green-500  border-2": selectedFile?.id === file.id
                })}
                onClick={() => handleFileSelect(file)}
              >
                <img src={file.url} className='  w-full' />
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

      </Dialog>
    </div >
  );
};

export default FileManager;
