import { Button, Input } from '@mui/material';
import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

function ValuesArray({ nestIndex }: { nestIndex: number }) {
  const { control, register } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `options.${nestIndex}.values`,
  });

  return (
    <ul>
      {fields.map((item, index) => (
        <li key={item.id} className=''>
          <Input {...register(`options.${nestIndex}.values.${index}`)} placeholder="Value"  />
          <Button variant="contained" type="button" onClick={() => remove(index)}>Delete Value</Button>
        </li>
      ))}
      <Button variant="contained" type="button" onClick={() => append('')}>Thêm giá trị</Button>
    </ul>
  );
}

export default ValuesArray;
