import {
  useController,
  UseControllerProps,
  FieldValues,
  FieldPath,
} from "react-hook-form";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { Typography } from "@mui/material";
import cn from "@/utils/cn";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
type ValueOptionType = number | string;

export interface Option {
  label: string;
  value: ValueOptionType;
}
 interface SelectPropsCustom {
  options: Option[];
  mutiple?: boolean;
  label?: string;
  placeholder?: string;
  className?: string;
  selectClassName?: string;
  optionClassName?: string;
  labelClassName?: string;
  iconClassName?: string;
}
 type SelectPropsControl<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = UseControllerProps<TFieldValues, TName>;

export type SelectControllerProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = SelectPropsControl<TFieldValues, TName> & SelectPropsCustom


function SelectController<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>({
  control,
  name,
  className = "",
  label,
  placeholder = " ",
  labelClassName = "",
  options,
  selectClassName,
  optionClassName,
  mutiple,
}: SelectControllerProps<TFieldValues, TName>) {
  const { field, fieldState } = useController({ name, control });
  const [open, setOpen] = useState(false);



  function handlerChange(value: ValueOptionType) {
    if (mutiple && field.value.length) {
      if (!field.value?.includes(value)) {
        field.onChange([...field.value, value]);
        return;
      }
      const newData = field.value.filter(
        (item: ValueOptionType) => item !== value
      );
      console.log(newData)
      field.onChange(newData);
      return;
    }
    field.onChange(value);
    setOpen(false);
  }

  return (
    <>
      <div className={twMerge("flex flex-col gap-1", className)}>
        {label ? (
          <label>
            <Typography
              variant="h6"
              className={`font-medium text-[#272727] ${labelClassName}`}
            >
              {label}
            </Typography>
          </label>
        ) : null}
        <div className="flex-1 relative z-[1]">
          <div className="relative z-[1]">
            <div
              tabIndex={0}
              className={twMerge(
                "bg-white translate cursor-pointer  z-[1] m-1 px-[13px] min-w-[150px] h-10  py-[8px]  flex  items-center  justify-between gap-[6px] rounded border border-gray-600",

                selectClassName
              )}
              onClick={() => {
                setOpen(!open);
              }}
            >
              <div className="flex-1">
                {mutiple ? (
                  <div className=" flex gap-1">
                    {field.value.length
                      ? field.value.map(
                        (item: ValueOptionType, index: number) => {
                          return (
                            <div
                              key={index}
                              className=" border border-primary px-2 h-full rounded "
                            >
                              <Typography
                                variant="body2"
                              >
                                {
                                  options.find((op) => op.value === item)?.label
                                }
                              </Typography>
                            </div>
                          );
                        }
                      )
                      : null}
                  </div>
                ) : (
                  <p className="text-black text-[14px]">
                    {options.find((item) => item.value === field.value)
                      ?.label || placeholder}
                  </p>
                )}
              </div>
              <ArrowDropDownIcon />
            </div>
            <ul
              tabIndex={0}
              className={cn(
                " bg-white z-[1] shadow overflow-hidden   rounded-lg w-full hidden opacity-0 invisible transition-all duration-300 absolute  top-full left-0 ",
                {
                  " visible opacity-100 block": open,
                }
              )}
            >
              {options.map((option, index) => {
                return (
                  <li
                    key={index}
                    value={option.value}
                    className={cn(
                      " cursor-pointer hover:bg-black  p-2 border-b  border-[#2727271a] bg-white text-[#27272780] hover:text-white",
                      {
                        "bg-primary text-white": field?.value === option.value,
                      },
                      optionClassName
                    )}
                    onClick={() => handlerChange(option.value)}
                  >
                    <Typography className="  text-inherit">
                      {option.label}
                    </Typography>
                  </li>
                );
              })}
            </ul>
            {open && (
              <div
                className=" fixed inset-0 bg-transparent -z-[1]"
                onClick={() => setOpen(false)}
              ></div>
            )}
          </div>
        </div>
      </div>
      {fieldState.error?.message ? (
        <p className="text-error"> {fieldState.error.message} </p>
      ) : null}
    </>
  );
}

export default SelectController;
