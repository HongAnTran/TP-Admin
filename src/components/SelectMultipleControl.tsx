"use client";
import { useController, FieldValues, FieldPath, UseControllerProps } from "react-hook-form";
import { useState } from "react";
import { twMerge } from "tailwind-merge";


export type PropsController<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> = UseControllerProps<TFieldValues, TName>;


type ValueOptionType = number | string;
export interface Option {
  label: string;
  value: ValueOptionType;
}
export interface SelectPropsCustom {
  options: Option[];
  label?: string;
  placeholder?: string;
  className?: string;
  selectClassName?: string;
  optionClassName?: string;
  labelClassName?: string;
  activeClassName?: string;
  showError?: boolean;
  required?: boolean;
  loading?: boolean;
}

function SelectMultipleControl<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>({
  control,
  name,
  className = "",
  label,
  placeholder = "",
  labelClassName = "",
  options,
  selectClassName,
  optionClassName,
  activeClassName = "",
  rules,
  showError = true,
  required = false,

}: PropsController<TFieldValues, TName> & SelectPropsCustom) {
  const { field, fieldState } = useController({ name, control, rules });
  const [open, setOpen] = useState(false);
  function handlerChange(value: ValueOptionType) {
    if (!field.value.includes(value)) {
      field.onChange([...field.value, value]);
      return;
    }
    const newData = field.value.filter(
      (item: ValueOptionType) => item !== value
    );
    field.onChange(newData);
    return;
  }



 
  return (
    <>
      <div
        className={twMerge(
          `flex flex-col gap-1 relative ${
            fieldState.error && showError && "mb-4"
          }`,
          className
        )}
      >
        {label ? (
          <label className={`font-medium mb-2 ${labelClassName}`}>
            {label}
            {required && <span className="text-red-500"> *</span>}
          </label>
        ) : null}
        <div className="flex-1 relative z-[1]">
          <div className="relative block z-[1]">
            <div
              tabIndex={0}
              className={twMerge(
                `bg-white translate z-[1] p-3 min-w-[150px] min-h-10 flex items-center justify-between gap-2 border border-gray-900 cursor-pointer transition-all ${
                  open ? `rounded-t` : "rounded"
                }`,
                selectClassName
              )}
              onClick={() => {
                setOpen(!open);
              }}
            >
              <div className={`flex-1`}>
                <div className={`flex flex-wrap gap-3 z-10`}>
                  {field.value.length ? (
                    field.value.map((item: ValueOptionType, index: number) => {
                      return (
                        <div
                          key={index}
                          className="py-1 px-2 rounded bg-gray-900 flex items-center gap-1 justify-center"
                        >
                          <span className="text-white">
                            {options.find((op) => op.value === item)?.label}
                          </span>
                          <span
                            className="cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              handlerChange(item);
                            }}
                          >
                            {/* <CloseIcon className="w-4 h-4" /> */}
                            x
                          </span>
                        </div>
                      );
                    })
                  ) : (
                    <span className="text-base text-gray-800">
                      {placeholder}
                    </span>
                  )}
                </div>
              </div>
              <span className="w-5 h-full cursor-pointer">
                {/* <ChevronDownIcon className="w-5 h-5" /> */}
              </span>
            </div>
            <ul
              tabIndex={0}
              className={`bg-white border border-gray-900 rounded-b shadow overflow-hidden w-full flex flex-col gap-3 mt-[-1px] absolute z-10 top-ful left-0 transition-all duration-500 overflow-y-scroll scrollbarCustomer p-3 ${
                open ? `opacity-100 max-h-[900px] ` : "opacity-0 max-h-0"
              }`}
            >
          
                <>
                  {options.map((option, index) => {
                    return (
                      <li
                        key={index}
                        value={option.value}
                        className={twMerge(
                          "cursor-pointer last:border-none bg-white text-gray-800 first:pt-0 last:pb-0 flex items-center gap-3",
                          optionClassName,
                          field.value.includes(option.value) && activeClassName
                        )}
                        onClick={(e) => {
                          e.stopPropagation();
                          handlerChange(option.value);
                        }}
                      >
                        <span
                          className={`w-3 min-w-3 h-3 rounded-sm overflow-hidden border flex items-center justify-center ${
                            field.value.includes(option.value)
                              ? "border-[#22c55e] bg-[#22c55e]"
                              : "border-gray-900"
                          } `}
                        >
                          {field.value.includes(option.value) && <span>v</span>}
                        </span>
                        <span className="text-inherit">{option.label}</span>
                      </li>
                    );
                  })}
                </>
         
            </ul>
            {open && (
              <div
                className="fixed inset-0 bg-transparent -z-[1]"
                onClick={() => setOpen(false)}
              ></div>
            )}
          </div>
        </div>
        {/* <ErrorControl
          error={fieldState.error}
          showError={showError}
          className="absolute top-[80px] left-0"
        /> */}
      </div>
    </>
  );
}

export default SelectMultipleControl;
