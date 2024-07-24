import BrandServicesAPI from '@/services/BrandServicesAPI';
import { FormControl ,FormLabel,Select, SelectChangeEvent } from '@mui/material'
import MenuItem from '@mui/material/MenuItem';
export default function SelectBrand({ value, onChange }: { value: string, onChange: (id: number) => void }) {
  const { data: cates, isSuccess } = BrandServicesAPI.useList({}, { placeholderData: [] , staleTime : Infinity })

  const handleChange = (event: SelectChangeEvent) => {
    onChange(Number(event.target.value));
  };

  if (!isSuccess) {
    return null
  }
  return (
    <FormControl fullWidth>
      <FormLabel>Thương hiệu</FormLabel>
      <Select
      
        labelId="brand"
        id="brand"
        value={value}
        label="Thương hiệu"
        onChange={handleChange}
      >
        {cates.map(cate => {
          return (<MenuItem key={cate.id} value={cate.id.toString()}>{cate.name}</MenuItem>)
        })}
      </Select>
    </FormControl>

  )
}
