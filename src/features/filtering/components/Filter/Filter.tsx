import { useContext } from 'react';
import FilterContext, { FiltersState } from '../../model/FilterContext';
import { CheckedChangedEvent } from '../../model/CheckedChangedEvent';
import { FilterMapper } from '../../model/FilterMapper';
import deepClone from '../../../../utils/deepClone';
import { toKebabCase, toSentenceCase } from '../../../../utils/case-translator';
import FilterOption from '../FilterOption/FilterOption';

interface FilterProps<TValue> {
  filterBy: string;
  options: TValue[];
  mapper?: FilterMapper<TValue>;
}

export default function Filter<TValue = string>({
  filterBy,
  options,
  mapper,
}: FilterProps<TValue>): JSX.Element {
  let frontFilterBy: string;
  let frontOptions: string[];
  const { filters, setFilters }: FiltersState = useContext(FilterContext) as FiltersState;

  if (mapper) {
    if (mapper.name.back === filterBy) {
      frontFilterBy = mapper.name.front;
    } else {
      throw Error(`Filter name not found in mapper`);
    }

    frontOptions = options.map((option) => {
      const frontOption = mapper.values.find((value) => value.back === option)?.front;

      if (!frontOption) {
        throw Error('Value not found in mapper.');
      }

      return frontOption;
    });
  } else {
    frontFilterBy = filterBy;

    frontOptions = options.map((option) => {
      if (typeof option !== 'string') {
        throw Error(`Mapper needed to convert non-string values.`);
      }

      return option;
    });
  }

  function handleCheckedChanged({ frontValue, checked }: CheckedChangedEvent): void {
    const filtersClone = deepClone(filters);
    let backFilterBy: string;
    let backValue: TValue;

    if (mapper) {
      if (mapper.name.front === frontFilterBy) {
        backFilterBy = mapper.name.back;
      } else {
        throw Error(`Filter name not found in mapper`);
      }

      const frontValueMapping = mapper.values.find((value) => value.front === frontValue);
      if (frontValueMapping) {
        backValue = frontValueMapping.back;
      } else {
        throw Error('Value not found in mapper.');
      }
    } else {
      backFilterBy = frontFilterBy;
      backValue = frontValue as unknown as TValue;
    }

    let filterSelection = filtersClone[backFilterBy] as TValue[];

    if (checked) {
      filterSelection.push(backValue);
    } else {
      filterSelection = filterSelection.filter((element) => element !== backValue);
    }

    filtersClone[filterBy] = filterSelection;

    setFilters(filtersClone);
  }

  return (
    <div className="accordion-item">
      <h2 className="accordion-header" id={`filter-by-${toKebabCase(frontFilterBy)}`}>
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#filter-options-${toKebabCase(frontFilterBy)}`}
          aria-expanded="false"
          aria-controls={`filter-options-${toKebabCase(frontFilterBy)}`}
        >
          {toSentenceCase(frontFilterBy)}
        </button>
      </h2>
      <div
        id={`filter-options-${toKebabCase(frontFilterBy)}`}
        className="accordion-collapse collapse"
        aria-labelledby={`filter-by-${toKebabCase(frontFilterBy)}`}
        data-bs-parent="#filters"
      >
        <div className="accordion-body">
          {frontOptions.map((frontOption, index) => (
            <FilterOption
              key={frontOption}
              value={frontOption}
              checked={(filters[filterBy] as TValue[]).includes(options[index])}
              onCheckedChanged={handleCheckedChanged}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
