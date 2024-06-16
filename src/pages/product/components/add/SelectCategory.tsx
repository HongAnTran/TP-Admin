import CateProductsServicesAPI from '@/services/CateProductsServicesAPI'
import { FormControl ,Select, SelectChangeEvent } from '@mui/material'
import MenuItem from '@mui/material/MenuItem';
export default function SelectCategory({ value, onChange }: { value: string, onChange: (id: number) => void }) {
  const { data: cates, isSuccess } = CateProductsServicesAPI.useList({}, { placeholderData: [] , staleTime : Infinity })

  const handleChange = (event: SelectChangeEvent) => {
    onChange(Number(event.target.value));
  };

  if (!isSuccess) {
    return null
  }
  return (
    <FormControl fullWidth>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label="Danh mục"
        onChange={handleChange}
      >
        {cates.map(cate => {
          return (<MenuItem key={cate.id} value={cate.id}>{cate.title}</MenuItem>)
        })}


      </Select>
    </FormControl>

  )
}
