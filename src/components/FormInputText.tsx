import { Controller, FieldValues  , FieldPath, UseControllerProps} from "react-hook-form";
import TextField, { TextFieldProps } from "@mui/material/TextField";

export type PropsController<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> = UseControllerProps<TFieldValues, TName>;

export type FormInputTextProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = PropsController<TFieldValues, TName> & TextFieldProps
export const FormInputText = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>({ name, control, disabled, rules, shouldUnregister, ...props }: FormInputTextProps<TFieldValues, TName>) => {
  return (
    <Controller
      name={name}
      disabled={disabled}
      rules={rules}
      shouldUnregister={shouldUnregister}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
      }) => (
        <TextField
          {...props}
          disabled={disabled}
          helperText={error ? error.message : null}
          error={!!error}
          onChange={onChange}
          value={value}
        />
      )}
    />
  );
};