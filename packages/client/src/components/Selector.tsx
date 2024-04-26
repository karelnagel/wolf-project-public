import Select, {
  ClearIndicatorProps,
  components,
  DropdownIndicatorProps,
  MultiValueRemoveProps,
} from "react-select";
import { ChevronDownIcon, X } from "lucide-react";
import React from "react";

const DropdownIndicator = (props: DropdownIndicatorProps) => {
  return (
    <components.DropdownIndicator {...props}>
      <ChevronDownIcon />
    </components.DropdownIndicator>
  );
};
const ClearIndicator = (props: ClearIndicatorProps) => {
  return (
    <components.ClearIndicator {...props}>
      <X />
    </components.ClearIndicator>
  );
};

const MultiValueRemove = (props: MultiValueRemoveProps) => {
  return (
    <components.MultiValueRemove {...props}>
      <X />
    </components.MultiValueRemove>
  );
};

const usedComponents = { DropdownIndicator, ClearIndicator, MultiValueRemove }

interface SelectorProps {
  options: any[];
  value: any[];
  onChange: (x: string[]) => void;
}

export const Selector: React.FC<SelectorProps> = ({ options, value }) => {
  return (
    <Select
      options={options}
      value={value}
      isMulti
      closeMenuOnSelect
      components={usedComponents}
    />
  );
};
