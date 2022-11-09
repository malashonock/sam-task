import { MDCSlider } from '@material/slider';
import { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';
import { EventCallback } from '../../../../utils/EventCallback';
import { Nullable, Undefinable } from '../../../../utils/Nullable';
import Range from '../../../../utils/Range';
import useFirstRender from '../../../../utils/useFirstRender';
import './RangeSlider.scss';

interface RangeSliderProps {
  show: boolean;
  min: number;
  max: number;
  valueStart: number;
  valueEnd: number;
  onRangeChanged: EventCallback<Range<number>>;
}

export default function RangeSlider({
  show,
  min,
  max,
  valueStart,
  valueEnd,
  onRangeChanged,
}: RangeSliderProps): JSX.Element {
  const sliderRootRef: MutableRefObject<Nullable<HTMLDivElement>> = useRef<HTMLDivElement>(null);
  const sliderRef: MutableRefObject<Undefinable<MDCSlider>> = useRef<MDCSlider>();
  const isFirstRender: boolean = useFirstRender();
  const [isFirstShow, setIsFirstShow] = useState(true);

  const handleValueChanged = useCallback((): void => {
    if (sliderRef.current) {
      onRangeChanged({
        from: sliderRef.current.getValueStart(),
        to: sliderRef.current.getValue(),
      });
    }
  }, [onRangeChanged]);

  useEffect(() => {
    if (sliderRef.current && sliderRootRef.current) {
      sliderRef.current.destroy();
      sliderRef.current = new MDCSlider(sliderRootRef.current);
      sliderRef.current.listen('MDCSlider:change', handleValueChanged);
    }
  }, [min, max, handleValueChanged]);

  useEffect((): void => {
    // Initialize MDC Slider
    if (isFirstRender && sliderRootRef.current) {
      sliderRef.current = new MDCSlider(sliderRootRef.current);
      sliderRef.current.listen('MDCSlider:change', handleValueChanged);
    }

    // Recalculate layout on expanding the collapse
    if (show && sliderRootRef.current && sliderRef.current) {
      if (isFirstShow) {
        sliderRef.current.layout();
        setIsFirstShow(false);
      }
    }

    if (sliderRef.current) {
      sliderRef.current.setValueStart(Math.floor(valueStart));
      sliderRef.current.setValue(Math.ceil(valueEnd));
      sliderRef.current.layout();
    }
  }, [isFirstRender, show, handleValueChanged, isFirstShow, valueStart, valueEnd]);

  return (
    <div className="mdc-slider mdc-slider--range mdc-slider--discrete" ref={sliderRootRef}>
      <input
        className="mdc-slider__input"
        type="range"
        min={min.toString()}
        max={max.toString()}
        defaultValue={min.toString()}
        name="rangeStart"
        aria-label="Range start"
      />
      <input
        className="mdc-slider__input"
        type="range"
        min={min.toString()}
        max={max.toString()}
        defaultValue={max.toString()}
        name="rangeEnd"
        aria-label="Range end"
      />
      <div className="mdc-slider__track">
        <div className="mdc-slider__track--inactive" />
        <div className="mdc-slider__track--active">
          <div className="mdc-slider__track--active_fill" />
        </div>
      </div>
      <div className="mdc-slider__thumb mdc-slider__thumb--start">
        <div className="mdc-slider__value-indicator-container" aria-hidden="true">
          <div className="mdc-slider__value-indicator">
            <span className="mdc-slider__value-indicator-text">{min.toString()}</span>
          </div>
        </div>
        <div className="mdc-slider__thumb-knob" />
      </div>
      <div className="mdc-slider__thumb mdc-slider__thumb--end">
        <div className="mdc-slider__value-indicator-container" aria-hidden="true">
          <div className="mdc-slider__value-indicator">
            <span className="mdc-slider__value-indicator-text">{max.toString()}</span>
          </div>
        </div>
        <div className="mdc-slider__thumb-knob" />
      </div>
    </div>
  );
}
