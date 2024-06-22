
import SpecificationsProductsServicesAPI from "@/services/SpecificationsProductsServicesAPI";
import { Box, Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, Typography } from "@mui/material";


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
function FormSelectSpe({ value, onChange }: { value: number[], onChange: (ids: number[]) => void }) {


  const { data: specifications, isSuccess } = SpecificationsProductsServicesAPI.useListType({}, { placeholderData: [] })

  const { data, isSuccess: isSuccessList } = SpecificationsProductsServicesAPI.useList({})

  const handleChange = (event: SelectChangeEvent<number[] | string[]>) => {
    const {
      target: { value: valueNew },
    } = event;
    if (typeof valueNew === "string") return

    onChange(valueNew.map(va => Number(va)));
  };

  if (!isSuccess || !isSuccessList) return <></>

  return (

    <div className=" min-h-[400px]">
      <Typography variant="h2">Thêm thông số cho sản phẩm</Typography>
      <div className=" grid grid-cols-2 mt-4 gap-4">
        {specifications.map(type => {
          const listSpe = data.filter(spe => spe.type_id === type.id)
          return <div>
            <Typography variant="h4">{type.name}</Typography>
            <FormControl sx={{ m: 1, width: 600 }}>
              <InputLabel id={`demo-multiple-name-label-${type.id}`}>Thông số kĩ thuật</InputLabel>
              <Select
                labelId={`demo-multiple-name-label-${type.id}`}
                id="demo-multiple-name"
                multiple
                value={value.map(item => item.toString())}
                onChange={handleChange}

                input={<OutlinedInput label={type.name} />}
                MenuProps={MenuProps}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => {
                      const item = listSpe.find(spe => spe.id.toString() === value)
                      if (item) {
                        return (
                          <Chip key={value} label={item.value || value} />
                        )
                      }

                    })}
                  </Box>
                )}
              >
                {listSpe.map((specification) => (
                  <MenuItem
                    key={specification.id}
                    value={specification.id.toString()}
                  >
                    {specification.name} - {specification.value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        })}
      </div>

    </div>
  )


}

export default FormSelectSpe