/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/label-has-associated-control */
import './SearchBox.scss';
import { MDCTextField } from '@material/textfield';
import { MutableRefObject, useCallback, useContext, useEffect, useRef } from 'react';
import deepClone from '../../../../utils/deepClone';
import { Nullable, Undefinable } from '../../../../utils/Nullable';
import useFirstRender from '../../../../utils/useFirstRender';
import FilterContext, { FiltersState } from '../../model/FilterContext';
import GuitarFilters from '../../model/GuitarFilters';

interface CustomInputEventDetail {
  value: string;
}

export default function SearchBox(): JSX.Element {
  const textFieldRootRef: MutableRefObject<Nullable<HTMLDivElement>> = useRef<HTMLDivElement>(null);
  const textFieldRef: MutableRefObject<Undefinable<MDCTextField>> = useRef<MDCTextField>();
  const isFirstRender: boolean = useFirstRender();
  const { filters, setFilters }: FiltersState = useContext(FilterContext) as FiltersState;

  const handleInput = useCallback(
    (event: Event): void => {
      if (textFieldRef.current) {
        const newSearchQuery: string =
          ((event as InputEvent).target as HTMLInputElement).value ||
          ((event as CustomEvent).detail as CustomInputEventDetail).value ||
          '';

        setFilters((prevFilters: GuitarFilters): GuitarFilters => {
          const newFilters: GuitarFilters = deepClone(prevFilters);
          newFilters.searchQuery = newSearchQuery;
          return newFilters;
        });
      }
    },
    [setFilters]
  );

  function handleClearSearchClick(): void {
    if (textFieldRef.current) {
      textFieldRef.current.emit('input', { value: '' });
    }
  }

  useEffect((): void => {
    // Initialize MDC Text Field
    if (isFirstRender && textFieldRootRef.current) {
      textFieldRef.current = new MDCTextField(textFieldRootRef.current);
      textFieldRef.current.listen('input', handleInput);
      textFieldRef.current.focus();
    }

    if (textFieldRef.current) {
      textFieldRef.current.value = filters.searchQuery;
    }
  }, [filters, handleInput, isFirstRender]);

  return (
    <div
      className="mdc-text-field mdc-text-field--outlined mdc-text-field--with-leading-icon mdc-text-field--with-trailing-icon m-3"
      ref={textFieldRootRef}
    >
      <i className="material-icons mdc-text-field__icon mdc-text-field__icon--leading">search</i>
      <input className="mdc-text-field__input" id="search-guitars" />
      <button
        className="mdc-icon-button material-icons mdc-text-field__icon mdc-text-field__icon--trailing"
        type="button"
        tabIndex={0}
        onClick={handleClearSearchClick}
      >
        clear
      </button>
      <div className="mdc-notched-outline">
        <div className="mdc-notched-outline__leading" />
        <div className="mdc-notched-outline__notch">
          <label htmlFor="search-guitars" className="mdc-floating-label">
            Search guitars by model
          </label>
        </div>
        <div className="mdc-notched-outline__trailing" />
      </div>
    </div>
  );
}
