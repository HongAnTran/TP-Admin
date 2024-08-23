import { Control, Controller, FieldValues, Path } from "react-hook-form";
import Select, { SelectProps } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";

export type FormInputSelectProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  options: { value: string | number; label: string }[];
  label: string;
} & SelectProps;

export default function FormSelect  <T extends FieldValues>({
  name,
  control,
  options,
  label,
  ...props}: FormInputSelectProps<T>){
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
      }) => (
        <FormControl error={!!error} fullWidth>
          <InputLabel>{label}</InputLabel>
          <Select
            {...props}
            value={value}
            onChange={onChange}
            label={label}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {error && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
}
