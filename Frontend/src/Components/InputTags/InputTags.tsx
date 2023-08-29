import Select from 'react-select';
import {options} from "../../utils/OptionSelect";
import {FC} from "react";

type propsType ={
    value:any,
    handleSetTags: any,
}

const InputTags:FC<propsType> = ({handleSetTags,value}) => {
    console.log(value)
    return (
        <div>
            <Select
                options={options}
                defaultValue={value}
                onChange={handleSetTags}
                placeholder="Теги"
                isMulti
                isSearchable
                noOptionsMessage={() => "Теги не найдены"}
            />
        </div>
    );
};

export default InputTags;