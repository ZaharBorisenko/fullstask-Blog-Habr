import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
        title: {
            type: String,
            require: true,
        },
        text: {
            type: String,
            require: true
        },
        tags: {
            type: Array,
            require: true
        },
        keywords: {
            type: Array,
            default: []
        },
        imagePost: String,
        difficultyLevel: {
            type: String,
            default: 'Не указан',
        },
        viewCount: {
            type: Number,
            default: 0,
        },
        readingTime: {
            type: Number,
            default: 5,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
            require: true,
        },
    },
    {
        timestamps: true,
    },
);
export default mongoose.model('Post', PostSchema);