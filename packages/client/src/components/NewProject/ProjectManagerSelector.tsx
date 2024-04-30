import Select, { components, DropdownIndicatorProps } from "react-select";
import { ChevronDown } from "lucide-react";
import React, { useState } from "react";
import { Employee } from "./NewProject";
import clsx from "clsx";

const DropdownIndicator = (props: DropdownIndicatorProps<Employee, false>) => {
  return (
    <components.DropdownIndicator {...props}>
      <ChevronDown color="#32853f" size={24} fill="#32853f" rotate={270} />
    </components.DropdownIndicator>
  );
};

const controlStyles = {
  base: "border rounded-2xl min-w-56 mt-4 py-[1px] border-primary font-normal bg-primary hover:cursor-pointer",
  focus: "border-primary2 ring-1 ring-primary-500",
};

const optionsStyle = {
  base: "hover:cursor-pointer px-3 py-2 rounded",
  focus: "bg-black rounded-2xl",
};

interface EmployeeSelectorProps {
  employeesList: Employee[];
  fixedOption: Employee | undefined;
  setProjectManager: (x: Employee | undefined) => void;
}

export const ProjectManagerSelector: React.FC<EmployeeSelectorProps> = ({
  employeesList: employeesList,
  fixedOption,
  setProjectManager,
}) => {
  const [value, setValue] = useState<Employee | null>(
    employeesList.find((x) => x.value === fixedOption?.value) ?? null,
  );
  const onChange = (x: Employee | null) => {
    setValue(x);
    setProjectManager(x !== null ? x : undefined);
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
        control: ({ isFocused }) => clsx(isFocused && controlStyles.focus, controlStyles.base),
        placeholder: () => "px-2 py-0.5",
        input: () => "pl-2 py-2.5",
        valueContainer: () => "gap-1",
        singleValue: () => "px-2 py-1 border mx-2 border-black bg-black rounded-2xl",
        dropdownIndicator: () => "pr-2 hover:cursor-pointer",
        menu: () => "p-2 mt-2  min-w-48 mb-1 bg-primary border border-primary2 rounded-2xl",
        option: ({ isFocused }) => clsx(isFocused && optionsStyle.focus, optionsStyle.base),
      }}
      placeholder={"Vali töötaja"}
      value={value}
      options={employeesList}
      onChange={onChange}
      closeMenuOnSelect
      isDisabled={fixedOption === undefined ? false : true}
      components={{ DropdownIndicator: fixedOption === undefined ? DropdownIndicator : null }}
    />
  );
};
