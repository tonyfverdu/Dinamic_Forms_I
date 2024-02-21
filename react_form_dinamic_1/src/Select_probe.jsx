import { useState, useEffect } from 'react';
import './input.css';

export function Select_probe({ select_id, selectTextLabel, array_options, option_select, handleSelect }) {
    
    return (
        <div>
            <SelectElement
                select_id = {select_id} 
                textlabel={selectTextLabel}  
                selectTextLabel
                required={true}
                disabled={false}
                response={[""]}
                optionsValues={array_options}
                value={option_select}
                onChange={handleSelect}
            // setValue={(ev) => setDataSubmit({ ...data_submit, "provincia": ev.target.value })}
            />
        </div>
    )
}



function SelectElement({ select_id, textlabel, required, disabled, response, optionsValues, value, onChange }) {
    const [valueSelect, setValueSelect] = useState("")
    const [responseSelect, setResponseSelect] = useState(response[0])

    useEffect(() => {
        console.log("Label: " + textlabel)
        console.log("Value es: ", value)
        setValueSelect(value)
    }, [])

    function handleOnChangeSelect(ev) {
        ev.preventDefault();
        setValueSelect(ev.target.value)
        onChange(ev.target.value)
    }


    return (
        <div className="containerSelect">
            <label htmlFor={select_id}>{textlabel}</label>
            <select id={select_id} size="1" aria-label=".form-select-sm" disabled={disabled} required={required} value={value}
                onChange={(ev) => handleOnChangeSelect(ev)} >
                <option value="">Select option</option>
                {Array.isArray(optionsValues) > 0 ?
                    optionsValues.map(element => <option key={element} value={element} >{element}</option>)
                    :
                    null
                }
            </select>
        </div>
    );
}