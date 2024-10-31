import { useFieldArray, useForm, FormProvider } from 'react-hook-form';
import ValuesArray from './ValuesArray';
import { Button, MenuItem, Select } from '@mui/material';
// import { optionsValue } from '@/constans/options';
import { Attribute, AttributeValue, ProductAttributeCreateInput } from '@/types/attribute';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
export default function OptionsForm({ onSubmit, defaultValue, attributes, attributesValue }: {
  defaultValue?: ProductAttributeCreateInput[],
  onSubmit: (options: ProductAttributeCreateInput[]) => void,
  attributes: Attribute[],
  attributesValue: AttributeValue[]

}) {


  const methods = useForm({
    defaultValues: {
      options: defaultValue || []
    }
  })


  const { control, register, handleSubmit, watch } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });
  return (
    <FormProvider {...methods}>
      <form >
        <ul className=' flex flex-col gap-2 mb-2'>
          {fields.map((item, index) => {
            // let options = [...optionsValue]
            // if (index > 0) {
            //   const valuePre = values.map(field => field.name)
            //   if (valuePre.length) {
            //     options = options.filter(option => !valuePre.includes(option))
            //   }
            // }
            return (
              <li key={item.id} className=' flex gap-2 items-start justify-between'>
                <Select   {...register(`options.${index}.attribute.connect.id`)} placeholder="Tên" className="input input-bordered w-full max-w-xs" >
                  {attributes.map(op => {
                    return (<MenuItem key={op.id} value={op.id}>{op.name}</MenuItem>)
                  })}
                </Select>

                <ValuesArray attributesValue={attributesValue} nestIndex={index} attributeId={watch("options")?.[index]?.attribute.connect.id} />
                <Button startIcon={<DeleteIcon />} type="button" onClick={() => remove(index)}>Xóa dòng</Button>
              </li>
            )
          }
          )}
        </ul>

        <Button
          className=' mr-2'
          startIcon={<AddIcon />}
          onClick={() => append({ position: 0, attribute: { connect: { id: 0 } }, values: { connect: [] } })}
          variant="contained"
        >
          Thêm Thuộc tính
        </Button>
        <Button variant="contained" onClick={handleSubmit(data => onSubmit(data.options))} startIcon={<SaveIcon />}>Xong</Button>

      </form>
    </FormProvider>
  );
}
