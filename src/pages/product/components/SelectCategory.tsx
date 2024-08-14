import SelectController, { SelectControllerProps} from '@/components/SelectControl';
import CateProductsServicesAPI from '@/services/CateProductsServicesAPI'
import { FieldPath, FieldValues } from 'react-hook-form';
export default function SelectCategory<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>(props: Omit<SelectControllerProps<TFieldValues, TName> , "options">) {
  const { data: cates, isSuccess } = CateProductsServicesAPI.useList()
  if (!isSuccess) {
    return null
  }

  const options = cates.datas.map(cate => ({ label: cate.title, value: cate.id }))
  return (
    <SelectController   {...props}  options={options} />

  )
}
