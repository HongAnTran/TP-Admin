import * as React from 'react';
import { Button, Dialog, DialogContent } from '@mui/material';
import FormAddSpe from './FormAddSpe';
import FormSelectSpe from './FormSelectSpe';



export default function SelectSpecifications({ value, onChange }: { value: number[], onChange: (ids: number[]) => void }) {
  const [open, setOpen] = React.useState(false)
  const [openNew, setOpenNew] = React.useState(false)


  const handleChange = (event: number[]) => {
    onChange(event);
  };
  return (
    <>
      <div>
      

        <Button onClick={() => setOpen(true)} variant="contained" className=' mr-6'>Thêm thông số</Button>

      </div>

      <Dialog open={openNew} onClose={() => setOpenNew(false)} >
        <DialogContent>
          <FormAddSpe />
        </DialogContent>
      </Dialog>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="lg" fullWidth>

        <DialogContent>
          <FormSelectSpe value={value} onChange={handleChange} />
          <div className=' flex justify-end gap-4'>

            <Button onClick={() => setOpenNew(true)} variant="contained">Thêm thông số mới</Button>
            <Button onClick={() => setOpen(false)} variant="contained">Xong</Button>
          </div>

        </DialogContent>
      </Dialog>
    </>
  );
}
