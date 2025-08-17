import {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useState,
  useRef,
} from "react";

export type Values = { min: number; max: number };
interface SingleRangeSliderProps {
  min: number;
  max: number;
  step?: number;
  onChange: (index: number) => void;
  lables?: string[];
}

const StylerSingleSlider: FC<SingleRangeSliderProps> = ({
  min,
  max,
  onChange,
  step,
  lables,
}) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef<HTMLInputElement>(null);
  const maxValRef = useRef<HTMLInputElement>(null);
  const range = useRef<HTMLDivElement>(null);

  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(+maxValRef.current.value);

      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minVal, getPercent]);

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
    onChange(maxVal);
  }, [minVal, maxVal, onChange]);

  return (
    <div className="range-container">
      <div className="pt-6">
        <div className="flex flex-col w-full">
          <div className="relative w-full">
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={maxVal}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                const value = Math.max(+event.target.value, minVal);
                setMaxVal(value);
                event.target.value = value.toString();
              }}
              className="w-full h-4 appearance-none rounded-full"
              style={{
                background: `linear-gradient(to right, #201F41 ${
                  (maxVal / max) * 100
                }%, gray ${(maxVal / max) * 100}%)`,
              }}
            />
            <style>{`
              input[type="range"]::-webkit-slider-thumb {
                appearance: none;
                width: 25px;
                height: 25px;
                border-radius: 50%;
                background: #201f41;
                cursor: pointer;
                border: 6px solid white;
              }
              input[type="range"]::-moz-range-thumb {
                width: 16px;
                height: 16px;
                border-radius: 50%;
                background: white;
                cursor: pointer;
                border: 2px solid #201f41;
              }
            `}</style>
            <ul className="absolute inset-0 flex justify-between px-3 pointer-events-none">
              {Array.from({ length: max + 1 }).map((_, index) => (
                <li key={index} className="relative flex">
                  {index < max + 1 ? (
                    <div
                      className={`absolute h-4 w-[2px] bg-white ${
                        index === 0 ? "ml-0" : index === max ? "mr-20" : ""
                      }`}
                    ></div>
                  ) : (
                    <></>
                  )}
                </li>
              ))}
            </ul>
            <div className="px-4 w-full justify-item-list">
              {lables?.map((value, i) => {
                return (
                  <span key={i} className="w-1">
                    <p className="nowrap capitalize text-[10px]">{value}</p>
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StylerSingleSlider;
