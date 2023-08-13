import React from 'react';
import st from './InputTags.module.scss'
import Select from 'react-select';
import {options} from "../../utils/OptionSelect";
const InputTags = ({handleSetKeywords,value}) => {
    return (
        <div>
            <Select
                options={options}
                defaultValue={value}
                onChange={handleSetKeywords}
                placeholder="Теги"
                isMulti
                isSearchable
                noOptionsMessage={() => "Теги не найдены"}
            />
        </div>
    );
};

export default InputTags;