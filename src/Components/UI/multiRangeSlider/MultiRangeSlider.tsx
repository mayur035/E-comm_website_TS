import React, { useCallback, useEffect, useState, useRef } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import styles from "./MultiRangeSlider.module.css";
type MultiRangeSliderProps = {
    min: number;
    max: number;
    onChange: (values: { min: number, max: number }) => void;
}
const MultiRangeSlider = (props: MultiRangeSliderProps) => {
    const [minVal, setMinVal] = useState<number>(props.min);
    const [maxVal, setMaxVal] = useState<number>(props.max);
    const minValRef = useRef<HTMLInputElement>(null);
    const maxValRef = useRef<HTMLInputElement>(null);
    const range = useRef<HTMLDivElement>(null);

    // Convert to percentage
    const getPercent = useCallback(
        (value: number) => Math.round(((value - props.min) / (props.max - props.min)) * 100),
        [props.min, props.max]
    );

    // Set width of the range to decrease from the left side
    useEffect(() => {
        if (maxValRef.current) {
            const minPercent = getPercent(minVal);
            const maxPercent = getPercent(+maxValRef.current.value); // Preceding with '+' converts the value from type string to type number

            if (range.current) {
                range.current.style.left = `${minPercent}%`;
                range.current.style.width = `${maxPercent - minPercent}%`;
            }
        }
    }, [minVal, getPercent]);

    // Set width of the range to decrease from the right side
    useEffect(() => {
        if (minValRef.current) {
            const minPercent = getPercent(+minValRef.current.value);
            const maxPercent = getPercent(maxVal);

            if (range.current) {
                range.current.style.width = `${maxPercent - minPercent}%`;
            }
        }
    }, [maxVal, getPercent]);

    // Get min and max values when their state changes
    useEffect(() => {
        props.onChange({ min: minVal, max: maxVal });
    }, [minVal, maxVal, props.onChange]);

    return (
        <div className={styles.container}>
        <input
            type="range"
            min={props.min}
            max={props.max}
            value={minVal}
            ref={minValRef}
            onChange={(event) => {
                const value = Math.min(+event.target.value, maxVal - 1);
                setMinVal(value);
                event.target.value = value.toString();
            }}
            className={classnames(styles.thumb, styles["thumb--zindex-3"], {
                [styles["thumb--zindex-5"]]: minVal > props.max - 100
            })}
        />
        <input
            type="range"
            min={props.min}
            max={props.max}
            value={maxVal}
            ref={maxValRef}
            onChange={(event) => {
                const value = Math.max(+event.target.value, minVal + 1);
                setMaxVal(value);
                event.target.value = value.toString();
            }}
            className={classnames(styles.thumb, styles["thumb--zindex-4"])}
        />

        <div className={styles.slider}>
            <div className={styles.slider__track} />
            <div ref={range} className={styles.slider__range} />
            <div className={styles['slider__left-value']}>{minVal}</div>
            <div className={styles['slider__right-value']}>{maxVal}</div>
        </div>
    </div>
);
};

MultiRangeSlider.propTypes = {
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
};

export default MultiRangeSlider;
