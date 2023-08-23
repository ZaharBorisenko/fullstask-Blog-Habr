import mongoose from "mongoose";

const CommentsPost = new mongoose.Schema({
        comment: {
            type: String,
            require: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
            require: true
        }
    },
    {
        timestamps: true
    }
)

export default mongoose.model('Comments',CommentsPost);