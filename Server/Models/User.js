import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
        firstName: String,
        lastName: String,
        aboutMe: String,
        privateProfile: {
            type: Boolean,
            default: true
        },
        avatar: {
            type:String,
            default: 'https://sun9-69.userapi.com/impg/ip7mMSxy27DreknYXVnpQun4JDxjXGVOuQRkqQ/48pmuGRu8Vc.jpg?size=512x512&quality=95&sign=67976be673a914f929889c897ba4ba84&c_uniq_tag=sMV5-9aNiYzKqQsHxDf93qbLtiRoaeD89YowIV-bgLA&type=album'
        },
        nickName: {
            type:String,
            require:true,
            unique: true,
        },
        email: {
            type: String,
            require: true,
            unique: true,
        },
        passwordHash: {
            type: String,
            require: true
        },
    },
    {
        timestamps: true,
    }
);
export default mongoose.model('Users', UserSchema);