import {useState} from "react";
import {errorMessageType, tagsType} from "../utils/Types";

export const useCreatePost = () => {
    const [title, setTitle] = useState<string>('');
    const [text, setText] = useState<string>(''); //text
    const [tags, setTags] = useState<Array<tagsType>>([]);
    const [imageUrl, setImageUrl] = useState<string>('uploads/Image-Place-Holder.jpg');
    const [keywords, setKeywords] = useState<string>('');
    const [level, setLevel] = useState<string>('Не указан');
    const [readingTime, setReadingTime] = useState<number>(0);
    const [validation, setValidation] = useState<boolean>(true);
    const [stageAdvancedSettings, setStageAdvancedSettings] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<Array<errorMessageType>>([]);

    const handleSetTags = (value:Array<tagsType>): void => {
        console.log(value)
        setTags(value)
    }
    const handleSetKeywords = (value:string): void => {
        setKeywords(value)
    }
    const handleSetLevel = (value:string): void => {
        setLevel(value)
    }
    const handleSetTitle = (value:string): void => {
        setTitle(value)
    }
    const handleSetText = (value:string): void => {
        setText(value)
    }
    return {
        title,text,tags,imageUrl,keywords,level,readingTime,validation,stageAdvancedSettings,errorMessage,
        handleSetKeywords,handleSetText,handleSetTitle,handleSetLevel,handleSetTags,setReadingTime,setImageUrl,setValidation,setStageAdvancedSettings,setErrorMessage
    }

}