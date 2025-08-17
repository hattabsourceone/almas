import {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useState,
  useRef,
} from "react";
import classnames from "classnames";

import "./MiltiRangeSlider.css";

export type Values = { min: number; max: number };
interface MultiRangeSliderProps {
  lable?: string;
  title?: string;
  min: number;
  max: number;
  step?: number;
  onChange: (values: Values) => void;
  lables?: string[];
  disabled?: boolean;
  defaultRange: number | null;
  hintmin?: number;
  hintmax?: number;
}

const MultiRangeSlider: FC<MultiRangeSliderProps> = ({
  lable,
  title,
  min,
  max,
  onChange,
  step,
  lables,
  disabled,
  defaultRange,
  hintmin,
  hintmax,
}) => {
  // const [minVal, setMinVal] = useState(min);
  // const [maxVal, setMaxVal] = useState(max);
  console.log(defaultRange, title);
  const [minVal, setMinVal] = useState(hintmin || min);
  //const [minVal, setMinVal] = useState((defaultRange) ?  title == 'Clarity' ? defaultRange + 1 : defaultRange : hintmin ? hintmin : min);
  const [maxVal, setMaxVal] = useState(hintmax !== null && hintmax !== undefined ? hintmax : max);
  //const [maxVal, setMaxVal] = useState((defaultRange || defaultRange == 0 ) ?title == 'Clarity' ? defaultRange == 3  ?defaultRange + 1: defaultRange + 2 :defaultRange : hintmax ? hintmax : max);
  const minValRef = useRef<HTMLInputElement>(null);
  const maxValRef = useRef<HTMLInputElement>(null);
  const range = useRef<HTMLDivElement>(null);
  const getPercent = useCallback(
    (value: number) =>
      Math.round(
        ((value - (disabled || false ? 0.3 : min)) /
          ((disabled || false ? 3.0 : max) - (disabled || false ? 0.3 : min))) *
        100
      ),
    [min, max]
  );

  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(+maxValRef.current.value); // Precede with '+' to convert the value from type string to type number
      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minVal, maxVal, getPercent]);

  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(+minValRef.current.value);
      const maxPercent = getPercent(maxVal);

      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [maxVal, getPercent]);

  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal, onChange]);

  return (
    <div className="range-container">
      {lable ? (
        <div className="flex-row-between cpb-3">
          <div>
            <span className="col w-fit">
              <label htmlFor="" className="text-sm pb-1">
                Min {lable}:
              </label>
              <input
                className="values-holder text-sm"
                style={{fontFamily: '"Open Sans", sans-serif'}}
                type="number"
                value={hintmin ? hintmin : minVal.toFixed(2)}
                min={min}
                max={max}
                step={step}
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  setMinVal(value ? parseFloat(value.toFixed(2)) : 0.0);
                }}
              />
            </span>
          </div>
          <div>
            <span className="col w-fit">
              <label htmlFor="" className="text-sm pb-1">
                Max {lable}:
              </label>
              <input
                className="values-holder text-sm"
                style={{fontFamily: '"Open Sans", sans-serif'}}
                type="number"
                value={hintmax ? hintmax : maxVal.toFixed(2)}
                min={min}
                max={max}
                step={step}
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  setMaxVal(value ? parseFloat(value.toFixed(2)) : 0.0);
                }}
              />
            </span>
          </div>
        </div>
      ) : null}

      <div className="pt-4">
        <div className="thum-holder">
          <input
            type="range"
            min={disabled || false ? 0.3 : min}
            max={disabled || false ? 3.0 : max}
            value={minVal}
            disabled={disabled || false}
            ref={minValRef}
            step={step || 1}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              const value = Math.min(+event.target.value, maxVal); // Allow min value to be equal to max value
              setMinVal(value);
              event.target.value = value.toString();
            }}
            className={classnames("thumb thumb--zindex-3", {
              "thumb--zindex-5": minVal > max - (min + max) / 2,
            })}
          />
        </div>
        <input
          type="range"
          min={disabled || false ? 0.3 : min}
          max={disabled || false ? 3.0 : max}
          value={maxVal}
          ref={maxValRef}
          disabled={disabled || false}
          step={step || 1}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            const value = Math.max(+event.target.value, minVal); // Allow max value to be equal to min value
            setMaxVal(value);
            event.target.value = value.toString();
          }}
          className={classnames("thumb thumb--zindex-3", {
            "thumb--zindex-5": !(minVal > max - (min + max) / 2),
          })}
        />

        <div className="relative">
          <span className="absolute z-0 flex flex-row justify-between">
            {lables?.map((_, i) => {
              return <div key={i} className="tag"></div>;
            })}
          </span>
          <div className="slider__track absolute z-1"></div>
          <div ref={range} className="slider__range absolute z-2"></div>
          {lables && (
            <ul className="absolute inset-0 flex justify-between px-3 pointer-events-none">
              {Array.from({ length: max + 1 }).map((_, index) => (
                <li key={index} className="relative flex">
                  {index < max + 1 ? (
                    <div
                      className={`absolute z-2 h-[12px] w-[1px] bg-[#D7D7D7] ${index === 0 ? "ml-0" : index === max ? "mr-20" : ""
                        }`}
                    ></div>
                  ) : (
                    <></>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="px-3 w-full justify-item-list">
          {lables?.map((value, i) => {
            return (
              <span key={i} className="w-1">
                <p className="nowrap capitalize text-[#99a4ac] text-[9px]" style={{fontFamily: '"Open Sans", sans-serif'}}>{value}</p>
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MultiRangeSlider;
