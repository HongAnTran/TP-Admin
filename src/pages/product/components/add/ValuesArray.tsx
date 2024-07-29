import { Button, MenuItem, Select } from '@mui/material';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { GridAddIcon } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { AttributeValue } from '@/types/attribute';



function ValuesArray({ nestIndex, attributeId , attributesValue }: { attributeId: number, nestIndex: number  , attributesValue: AttributeValue[]}) {
  const { control, register } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `options.${nestIndex}.values.connect`,

  });



  const valuesOption = attributesValue.filter(value=>value.attribute_id ===attributeId)
  return (
    <ul>
      {fields.map((item, index) => (
        <li key={item.id} className=' flex gap-2'>
          <Select className='  min-w-32' {...register(`options.${nestIndex}.values.connect[${index}].id`)} placeholder="Value"  >
            {valuesOption.map(value => {
              return (<MenuItem key={value.id} value={value.id}>{value.value}</MenuItem>)
            })}
          </Select>
          <Button type="button" onClick={() => remove(index)} startIcon={<DeleteIcon />}></Button>
        </li>
      ))}
      <Button variant="contained" className=' mt-2' type="button" onClick={() => append({id : 0})} startIcon={<GridAddIcon />}>Thêm giá trị</Button>
    </ul>
  );
}

export default ValuesArray;
