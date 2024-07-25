import SelectMultipleControl from '@/components/SelectMultipleControl';
import CateProductsServicesAPI from '@/services/CateProductsServicesAPI'
export default function SelectCategorySub({ name , control}: { name : any , control : any}) {
  const { data: cates, isSuccess } = CateProductsServicesAPI.useList({}, { placeholderData: [] , staleTime : Infinity })


  if (!isSuccess) {
    return null
  }
  return (
    <SelectMultipleControl
    name={name}
    control={control}
    options={ cates.map(cate => {
      return {label : cate.title , value:cate.id}
    })}
  >
  </SelectMultipleControl>
  )
}
