import React, { useEffect, useState } from "react";
import Select from "react-select";
import clsx from "clsx";

interface SelectOptions {
  value: string;
  label: string;
}

interface SingleSelectProps {
  selectOptions: SelectOptions[];
  selectedOption: string | undefined;
  parentSetMethod: (x: string) => void;
  dark: boolean;
}

const controlStyles = {
  base: "border rounded-2xl mt-4 min-w-48 px-2 py-2 bg-white text-black hover:cursor-pointer",
  focus: "border-primary2",
  dark: "border border-primary rounded-2xl px-2 py-2.5 bg-primary hover:cursor-pointer",
};

const valueStyles = {
  base: "border-none ml-2 bg-white text-black rounded-2xl",
  dark: "border-none font-normal rounded-2xl",
};

const optionsStyle = {
  base: "hover:cursor-pointer px-3 py-2 rounded",
  focus: "bg-black rounded-2xl",
};

export const SingleSelect: React.FC<SingleSelectProps> = ({
  selectOptions,
  selectedOption,
  parentSetMethod,
  dark,
}) => {
  const matchedOption = selectOptions.find((x) => x.value === selectedOption);
  const [value, setValue] = useState<SelectOptions | null>();

  /*If deleted, will break popup initial rendering */
  useEffect(() => {
    if (matchedOption !== undefined) {
      setValue(matchedOption);
      parentSetMethod(matchedOption.value);
    }
  }, [matchedOption, parentSetMethod]);

  /*Black magic */
  const onChange = (x: SelectOptions | null) => {
    if (x === null) return;
    setValue(x);
    parentSetMethod(x.value);
  };

  return (
    <Select
      unstyled
      styles={{
        input: (base) => ({
          ...base,
          "input:focus": {
            boxShadow: "none",
          },
        }),
        control: (base) => ({
          ...base,
          transition: "none",
        }),
      }}
      classNames={{
        container: () => "w-2/3",
        control: ({ isFocused }) =>
          clsx(isFocused && controlStyles.focus, dark ? controlStyles.dark : controlStyles.base),
        singleValue: () => clsx(dark ? valueStyles.dark : valueStyles.base),
        dropdownIndicator: () => "pr-2 hover:cursor-pointer",
        menu: () => "min-w-48 p-2 mt-2 mb-1 bg-primary border border-primary2 rounded-2xl",
        option: ({ isFocused }) => clsx(isFocused && optionsStyle.focus, optionsStyle.base),
      }}
      options={selectOptions}
      isSearchable={false}
      value={value}
      placeholder={false}
      onChange={onChange}
    />
  );
};
