import {
  useController,
  UseControllerProps,
  FieldValues,
  FieldPath,
} from "react-hook-form";
import React from "react";
import { twMerge } from "tailwind-merge";
import { Typography } from "@mui/material";
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  iconAfter?: React.ReactNode;
  iconPrev?: React.ReactNode;
  onClickIconAfter?: () => void;
  onClickIconPrev?: () => void;
}
export interface InputPropsCustom {
  inputProps?: InputProps;
  label?: string;
  placeholder?: string;
  type?: "text" | "password";
  className?: string;
  labelClassName?: string;
  requied?: boolean;
}

export type InputPropsControl<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> = UseControllerProps<TFieldValues, TName>;

function InputController<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>({
  control,
  name,
  inputProps = {},
  className = "",
  label,
  placeholder = " ",
  type = "text",
  labelClassName = "",
  requied,
}: InputPropsControl<TFieldValues, TName> & InputPropsCustom) {
  const { field, fieldState } = useController({ name, control });
  const {
    iconAfter,
    iconPrev,
    className: classNameInput,
    onClickIconAfter,
    onClickIconPrev,
    ...props
  } = inputProps;
  return (
    <>
      <div className={twMerge("flex flex-col gap-1 w-full", className)}>
        {label ? (
          <label>
            <Typography
              
              className={`font-medium ${labelClassName}`}
            >
              {label}
            </Typography >
            {requied && <span className="  text-error">*</span>}
          </label>
        ) : null}
        <div className="flex-1 relative">
          <div>
            {iconPrev ? (
              <div
                className="h-full flex items-center justify-center absolute left-5 top-0"
                onClick={onClickIconPrev}
              >
                {iconPrev}
              </div>
            ) : null}
            <input
              {...field}
              {...props}
              type={type}
              className={twMerge(
                "input w-full  border  border-gray-600 h-[50px] focus:outline-none px-4 bg-white text-black",
                iconAfter && "pr-10",
                iconPrev && "pl-14",
                classNameInput,
                fieldState.error && "border-error"
              )}
              placeholder={placeholder}
            />
            {iconAfter ? (
              <div
                className="h-full flex items-center justify-center  cursor-pointer absolute right-3 top-0"
                onClick={onClickIconAfter}
              >
                {iconAfter}
              </div>
            ) : null}
          </div>
          {fieldState.error?.message ? (
            <p className="text-error"> {fieldState.error.message} </p>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default InputController;
