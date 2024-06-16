import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import SpecificationsProductsServicesAPI from '@/services/SpecificationsProductsServicesAPI';
import { Box, Button, Chip, Dialog, DialogContent } from '@mui/material';
import FormAddSpe from './FormAddSpe';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function SelectSpecifications({ value, onChange }: { value: number[], onChange: (ids: number[]) => void }) {
  const { data: specifications, isSuccess: suc } = SpecificationsProductsServicesAPI.useList({}, { placeholderData: [] })
  const [open, setOpen] = React.useState(false)


  const handleChange = (event: SelectChangeEvent<number[] | string[]>) => {
    const {
      target: { value },
    } = event;
    console.log(value)
    if (typeof value === "string") return

    onChange(value.map(va => Number(va)));
  };

  if (!suc) return null

  return (
    <>
      <div>
        <FormControl sx={{ m: 1, width: 600 }}>
          <InputLabel id="demo-multiple-name-label">Thông số kĩ thuật</InputLabel>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            multiple
            value={value.map(item => item.toString())}
            onChange={handleChange}
            
            input={<OutlinedInput label="Thông số kĩ thuật" />}
            MenuProps={MenuProps}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            {specifications.map((spe) => (
              <MenuItem
                key={spe.id}
                value={spe.id.toString()}
              >
                {spe.name} - {spe.value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button onClick={() => setOpen(true)} variant="contained">Thêm thông số</Button>

      </div>

      <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description" >
        <DialogContent>
          <FormAddSpe />
        </DialogContent>
      </Dialog>
    </>
  );
}
