
import SelectController, { SelectControllerProps} from '@/components/SelectControl';
import BrandServicesAPI from '@/services/BrandServicesAPI';
import { FieldPath, FieldValues } from 'react-hook-form';
export default function SelectBrand<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>(props: Omit<SelectControllerProps<TFieldValues, TName> , "options">) {
  const { data: cates, isSuccess } = BrandServicesAPI.useList({}, { staleTime : Infinity })

  if (!isSuccess) {
    return null
  }
  const options = cates.map(cate => ({ label: cate.name, value: cate.id }))
  return (
    <SelectController   {...props}  options={options} />

  )
}
