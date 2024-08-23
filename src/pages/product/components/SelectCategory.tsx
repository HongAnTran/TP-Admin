import FormSelect, { FormInputSelectProps } from '@/components/FormSelect';
import CateProductsServicesAPI from '@/services/CateProductsServicesAPI'
import {  FieldValues } from 'react-hook-form';


export default function SelectCategory<
  TFieldValues extends FieldValues,
>(props:Omit< FormInputSelectProps<TFieldValues> , "options">) {
  const { data: cates, isSuccess } = CateProductsServicesAPI.useList()
  if (!isSuccess) {
    return null
  }

  const options = cates.datas.map(cate => ({ label: cate.title, value: cate.id }))
  return (
    <FormSelect   {...props}  options={options} />

  )
}
