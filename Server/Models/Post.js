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
            default: [],
        },
        keywords: {
            type: Array,
            require: true
        },
        imagePost: String,
        difficultyLevel: {
            type: String,
            default: 'Не указан',
            require:true
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
        comments: [{
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Comments',
        }]
    },
    {
        timestamps: true,
    },
);
export default mongoose.model('Post', PostSchema);