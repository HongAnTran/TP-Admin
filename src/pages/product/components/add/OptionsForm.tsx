import { useFieldArray, useForm, FormProvider } from 'react-hook-form';
import ValuesArray from './ValuesArray';
import { Button, MenuItem, Select } from '@mui/material';
import { ProductOption } from '@/types/product';
import { optionsValue } from '@/constans/options';



export default function OptionsForm(
  { onSubmit, defaultValue }:
    { defaultValue?: ProductOption[], onSubmit: (options: ProductOption[]) => void }) {

  const methods = useForm({
    defaultValues: {
      options: defaultValue || []
    }
  })

  const { control, register, handleSubmit, watch } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'options',

  });

 

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(data => onSubmit(data.options))}>
        <ul className=' flex flex-col gap-2 mb-2'>
          {fields.map((item, index) => (
            <li key={item.id} className=' flex gap-2 items-start justify-between'>
              <Select   {...register(`options.${index}.name`)} placeholder="Name" className="input input-bordered w-full max-w-xs" >
                {optionsValue.map(op => {
                  return (<MenuItem key={op} value={op}>{op}</MenuItem>)
                })}
              </Select>

              <ValuesArray nestIndex={index} name={watch("options")?.[index]?.name} />
              <Button type="button" onClick={() => remove(index)}>Xóa</Button>
            </li>
          ))}
        </ul>
        <Button
          className=' mr-2'
          variant="contained"
          onClick={() => append({ name: '', position: 0, values: [''], product_id: null })}
        >
          Thêm Thuộc tính
        </Button>
        <Button variant="contained" type="submit">Xong</Button>
      </form>
    </FormProvider>
  );
}
