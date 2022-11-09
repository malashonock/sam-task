import './Sorter.scss';
import { MDCSelect } from '@material/select';
import { useRef, useContext, useEffect, useCallback, MutableRefObject } from 'react';
import { Nullable, Undefinable } from '../../../../utils/Nullable';
import useFirstRender from '../../../../utils/useFirstRender';
import GuitarSorting, { SortedProperty, SortingOrder } from '../../model/GuitarSorting';
import SortingContext, { SortingState } from '../../model/SortingContext';
import sortingMapper from '../../model/SortingMapper';

export default function Sorter(): JSX.Element {
  const selectRootRef: MutableRefObject<Nullable<HTMLDivElement>> = useRef<HTMLDivElement>(null);
  const selectRef: MutableRefObject<Undefinable<MDCSelect>> = useRef<MDCSelect>();
  const isFirstRender: boolean = useFirstRender();
  const { sorting, setSorting }: SortingState = useContext(SortingContext) as SortingState;

  const handleSelectionChanged = useCallback((): void => {
    if (selectRef.current) {
      const [property, order]: string[] = selectRef.current.value.split('--');

      if (property && order) {
        setSorting((): GuitarSorting => {
          const newSorting: GuitarSorting = {
            property: property as SortedProperty,
            order: order as SortingOrder,
          };

          return newSorting;
        });
      }
    }
  }, [setSorting]);

  useEffect((): void => {
    // Initialize MDC Select
    if (isFirstRender && selectRootRef.current) {
      selectRef.current = new MDCSelect(selectRootRef.current);
      selectRef.current.listen('MDCSelect:change', handleSelectionChanged);
    }

    if (selectRef.current) {
      let index: number = -1;

      if (sorting) {
        index = (sortingMapper as GuitarSorting[]).findIndex(
          (mapping: GuitarSorting): boolean =>
            mapping.property === sorting.property && mapping.order === sorting.order
        );
      }

      selectRef.current.setSelectedIndex(index);
    }
  }, [handleSelectionChanged, isFirstRender, sorting]);

  return (
    <div className="mdc-select mdc-select--outlined m-3" ref={selectRootRef}>
      <div className="mdc-select__anchor" aria-labelledby="sorting-label sorting-selected-text">
        <span className="mdc-notched-outline">
          <span className="mdc-notched-outline__leading" />
          <span className="mdc-notched-outline__notch">
            <span id="sorting-label" className="mdc-floating-label">
              Sort guitars
            </span>
          </span>
          <span className="mdc-notched-outline__trailing" />
        </span>
        <span className="mdc-select__selected-text-container">
          <span id="sorting-selected-text" className="mdc-select__selected-text" />
        </span>
        <span className="mdc-select__dropdown-icon">
          <svg className="mdc-select__dropdown-icon-graphic" viewBox="7 10 10 5" focusable="false">
            <polygon
              className="mdc-select__dropdown-icon-inactive"
              stroke="none"
              fillRule="evenodd"
              points="7 10 12 15 17 10"
            />
            <polygon
              className="mdc-select__dropdown-icon-active"
              stroke="none"
              fillRule="evenodd"
              points="7 15 12 10 17 15"
            />
          </svg>
        </span>
      </div>

      <div className="mdc-select__menu mdc-menu mdc-menu-surface mdc-menu-surface--fullwidth">
        <ul className="mdc-list" role="listbox" aria-label="Guitar sorting select">
          {sortingMapper.map((mapping) => (
            <li
              className="mdc-list-item"
              aria-selected="false"
              data-value={`${mapping.property}--${mapping.order}`}
              key={`${mapping.property}--${mapping.order}`}
              role="option"
            >
              <span className="mdc-list-item__ripple" />
              <span className="mdc-list-item__text">{mapping.frontProperty}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
