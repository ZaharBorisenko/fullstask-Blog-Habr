import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
        firstName: {
            type: String,
            require: true,
        },
        lastName: {
            type: String,
            require: true,
        },
        avatar: String,
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
export default mongoose.model('Users',UserSchema);