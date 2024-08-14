import  { SelectControllerProps} from '@/components/SelectControl';
import SelectMultipleControl from '@/components/SelectMultipleControl';
import CateProductsServicesAPI from '@/services/CateProductsServicesAPI'
import { FieldPath, FieldValues } from 'react-hook-form';
export default function SelectCategorySub<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>(props: Omit<SelectControllerProps<TFieldValues, TName> , "options">) {
  const { data: cates, isSuccess } = CateProductsServicesAPI.useList()
  if (!isSuccess) {
    return null
  }

  const options = cates.datas.map(cate => ({ label: cate.title, value: cate.id }))
  return (
    <SelectMultipleControl   {...props}  options={options} />

  )
}
