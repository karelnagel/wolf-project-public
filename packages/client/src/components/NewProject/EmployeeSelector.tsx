import Select, {
  ClearIndicatorProps,
  components,
  DropdownIndicatorProps,
  MultiValueRemoveProps,
} from "react-select";
import { Plus, X } from "lucide-react";
import React from "react";
import { $projectInput, Employee } from "./NewProject";
import clsx from "clsx";
import { useStore } from "@nanostores/react";

const DropdownIndicator = (props: DropdownIndicatorProps<Employee>) => {
  return (
    <components.DropdownIndicator {...props}>
      <Plus color="#32853f" size={24} fill="#32853f" rotate={270} />
    </components.DropdownIndicator>
  );
};

const ClearIndicator = (props: ClearIndicatorProps<Employee>) => {
  return (
    <components.ClearIndicator {...props}>
      <X />
    </components.ClearIndicator>
  );
};

const MultiValueRemove = (props: MultiValueRemoveProps<Employee>) => {
  return (
    <components.MultiValueRemove {...props}>
      <X />
    </components.MultiValueRemove>
  );
};

const usedComponents = { DropdownIndicator, ClearIndicator, MultiValueRemove };

const controlStyles = {
  base: "border rounded-2xl min-w-48 mt-4 py-[1px] border-primary bg-primary font-normal hover:cursor-pointer",
  focus: "border border-primary2",
};

const optionsStyle = {
  base: "hover:cursor-pointer px-3 py-2 rounded",
  focus: "bg-black rounded-2xl",
};

interface EmployeeSelectorProps {
  employees: Employee[];
}

export const EmployeeSelector: React.FC<EmployeeSelectorProps> = ({ employees }) => {
  const input = useStore($projectInput);

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
        multiValueLabel: (base) => ({
          ...base,
          whiteSpace: "normal",
          overflow: "visible",
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
        multiValue: () => "px-2 py-1 border mx-2 border-black bg-black rounded-2xl",
        multiValueRemove: () => "rounded-md hover:cursor-pointer hover:text-red",
        clearIndicator: () => "rounded-md hover:cursor-pointer hover:text-red",
        dropdownIndicator: () => "pr-2 hover:cursor-pointer",
        menu: () => "p-2 mt-2 mb-1 bg-primary border border-primary2 rounded-2xl",
        option: ({ isFocused }) => clsx(isFocused && optionsStyle.focus, optionsStyle.base),
        noOptionsMessage: () => "p-2 bg-primary border border-dashed rounded-sm",
      }}
      options={employees}
      placeholder={"Vali töötaja(d)"}
      noOptionsMessage={() => {
        return <div>{"Rohkem töötajaid pole"}</div>;
      }}
      value={input.employees.map((id) => employees.find((x) => x.value === id)!)}
      onChange={(newValue) => {
        $projectInput.setKey(
          "employees",
          newValue.map((x) => x.value),
        );
      }}
      isMulti
      closeMenuOnSelect
      components={usedComponents}
    />
  );
};
