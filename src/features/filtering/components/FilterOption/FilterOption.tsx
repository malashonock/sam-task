import { ChangeEvent } from 'react';
import { CheckedChangedEvent } from '../../model/CheckedChangedEvent';
import { EventCallback } from '../../../../utils/EventCallback';
import { toKebabCase, toSentenceCase } from '../../../../utils/case-translator';

interface FilterOptionProps {
  value: string;
  checked: boolean;
  onCheckedChanged: EventCallback<CheckedChangedEvent>;
}

export default function FilterOption({
  value,
  checked,
  onCheckedChanged,
}: FilterOptionProps): JSX.Element {
  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    const checkbox: HTMLInputElement = event.target as HTMLInputElement;
    onCheckedChanged({ frontValue: value, checked: checkbox.checked });
  }

  return (
    <div className="form-check">
      <label className="form-check-label" htmlFor={toKebabCase(value)}>
        <input
          className="form-check-input"
          type="checkbox"
          id={toKebabCase(value)}
          checked={checked}
          onChange={handleChange}
        />
        {toSentenceCase(value)}
      </label>
    </div>
  );
}
