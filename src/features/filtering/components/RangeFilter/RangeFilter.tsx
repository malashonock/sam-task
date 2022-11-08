import { useContext, useEffect, useState } from 'react';
import FilterContext, { FiltersState } from '../../model/FilterContext';
import GuitarFilters from '../../model/GuitarFilters';
import Range from '../../../../utils/Range';
import deepClone from '../../../../utils/deepClone';
import { toKebabCase, toSentenceCase } from '../../../../utils/case-translator';
import RangeSlider from '../RangeSlider/RangeSlider';

interface RangeFilterProps {
  filterBy: string;
  min: number;
  max: number;
}

export default function RangeFilter({ filterBy, min, max }: RangeFilterProps): JSX.Element {
  const [show, setShow] = useState(false);
  const { filters, setFilters }: FiltersState = useContext(FilterContext) as FiltersState;

  let valueStart: number = (filters[filterBy] as Range<number>).from;
  let valueEnd: number = (filters[filterBy] as Range<number>).to;

  function handleShowChanged(): void {
    setShow(!show);
  }

  function handleRangeChanged({ from, to }: Range<number>): void {
    setFilters((prevFilters: GuitarFilters): GuitarFilters => {
      const newFilters: GuitarFilters = deepClone(prevFilters);
      newFilters[filterBy] = { from, to } as Range<number>;
      return newFilters;
    });
  }

  useEffect(() => {
    valueStart = (filters[filterBy] as Range<number>).from;
    valueEnd = (filters[filterBy] as Range<number>).to;
  }, [filters]);

  return (
    <div className="accordion-item">
      <h2 className="accordion-header" id={`filter-by-${toKebabCase(filterBy)}`}>
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#filter-${toKebabCase(filterBy)}`}
          aria-expanded="false"
          aria-controls={`filter-${toKebabCase(filterBy)}`}
          onClick={handleShowChanged}
        >
          {toSentenceCase(filterBy)}
        </button>
      </h2>
      <div
        id={`filter-${toKebabCase(filterBy)}`}
        className="accordion-collapse collapse"
        aria-labelledby={`filter-by-${toKebabCase(filterBy)}`}
        data-bs-parent="#filters"
      >
        <div className="accordion-body">
          <RangeSlider
            show={show}
            min={Math.floor(min)}
            max={Math.ceil(max)}
            valueStart={valueStart}
            valueEnd={valueEnd}
            onRangeChanged={handleRangeChanged}
          />
        </div>
      </div>
    </div>
  );
}
