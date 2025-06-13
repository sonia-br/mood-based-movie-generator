import { useState } from "react";
import './MoodSlider.css';

function MoodSlider(props)
{
    // 5-neutral value, user changes it
    const [value, setValue] = useState(5);

    function handleChange(event)
    {
        const newValue = Number(event.target.value);
        setValue(newValue);
        props.onChange(props.moodName, newValue);
    }

    return(
        <div className="slider">
            <label htmlFor={props.moodName}>
                {props.labelLeft} ({value}) {props.labelRight}
            </label>
            <br />
            <input
                id={props.moodName}
                type="range"
                min="0"
                max="10"
                step="1"
                value={value}
                onChange={handleChange}/>
            <div className="slider__title">
                <span>{props.labelLeft}</span>
                <span>{props.labelRight}</span>
            </div>
        </div>
    );
}

export default MoodSlider;