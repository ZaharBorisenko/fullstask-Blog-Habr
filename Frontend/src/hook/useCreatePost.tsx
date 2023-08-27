import {useState} from "react";
import {errorMessageType, tagsType} from "../utils/Types";

export const useCreatePost = () => {

    return {
        title,text,tags,imageUrl,keywords,level,readingTime,validation,stageAdvancedSettings,errorMessage,
        handleSetKeywords,handleSetText,handleSetTitle,handleSetLevel,handleSetTags,setReadingTime,setImageUrl,setValidation,setStageAdvancedSettings,setErrorMessage
    }

}