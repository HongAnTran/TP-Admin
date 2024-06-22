import { Button, MenuItem, Select } from '@mui/material';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { optionsValues } from '@/constans/options';



function ValuesArray({ nestIndex, name }: { nestIndex: number, name: string }) {
  const { control, register } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `options.${nestIndex}.values`,
    
  });
  const values = optionsValues[name]
  return (
    <ul>
      {fields.map((item, index) => (
        <li key={item.id} className=' flex gap-2'>
          <Select className='  min-w-32' {...register(`options.${nestIndex}.values.${index}`)} placeholder="Value"  >
            {values.map(value => {
              return (<MenuItem key={value} value={value}>{value}</MenuItem>)
            })}
          </Select>
          <Button type="button" variant="contained" onClick={() => remove(index)}>X</Button>
        </li>
      ))}
      <Button variant="contained" className=' mt-2' type="button" onClick={() => append('')}>Thêm giá trị</Button>
    </ul>
  );
}

export default ValuesArray;
