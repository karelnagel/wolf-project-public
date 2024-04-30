import Select, {
  ActionMeta,
  ClearIndicatorProps,
  components,
  DropdownIndicatorProps,
  MultiValueRemoveProps,
  OnChangeValue,
} from "react-select";
import { Plus, X } from "lucide-react";
import React, { useState } from "react";
import { Employee } from "./NewProject";
import clsx from "clsx";

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
  employeesList: Employee[];
  fixedOption: Employee | undefined;
  addEmployees: (x: Employee) => void;
  removeEmployees: (x: Employee) => void;
}

export const EmployeeSelector: React.FC<EmployeeSelectorProps> = ({
  employeesList: employeesList,
  fixedOption,
  addEmployees,
  removeEmployees,
}) => {
  const [value, setValue] = useState<readonly Employee[]>(
    employeesList.filter((x) => x.value === fixedOption?.value),
  );
  const onChange = (newValue: OnChangeValue<Employee, true>, actionMeta: ActionMeta<Employee>) => {
    switch (actionMeta.action) {
      case "pop-value":
      case "remove-value":
        if (actionMeta.removedValue.value === fixedOption?.value) {
          return;
        }
        removeEmployees(actionMeta.removedValue);
        break;
      case "clear":
        newValue = employeesList.filter((x) => x.value === fixedOption?.value);
        const removedEmployees = value.filter((employee) => !newValue.includes(employee));
        removedEmployees.forEach(removeEmployees);
        break;
      case "select-option":
        if (actionMeta.option! !== fixedOption) {
          addEmployees(actionMeta.option!);
        }
        break;
    }
    setValue(newValue);
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
      options={employeesList}
      placeholder={"Vali töötaja(d)"}
      noOptionsMessage={() => {
        return <div>{"Rohkem töötajaid pole"}</div>;
      }}
      value={value}
      isClearable={value.some((v) => v !== fixedOption)}
      onChange={onChange}
      isMulti
      closeMenuOnSelect
      components={usedComponents}
    />
  );
};
