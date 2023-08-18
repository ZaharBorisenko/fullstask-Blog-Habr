import PostModel from "../Models/Post.js";
export const IdTags = async (req,res) => {
    const tag = req.params.tag;
    try {
        const postWithTags = await PostModel.find({tags:tag}).populate('user');
        res.json(postWithTags);
    }catch (e) {
        console.log(e)
    }
}
export const AllTags = async (req,res) => {
    try {
        const AllTags = await PostModel.aggregate([
            {$unwind: "$tags"},
            {$group: {_id: "$tags", count:{$sum: 1}}},
            { $sort: { count: -1 } }
        ])
        res.json(AllTags);
    }catch (e) {
        console.log(e)
    }
}

export const IdKeywords = async (req,res) => {
    const keyword = req.params.keywords;
    try {
        const postWithKeywords = await PostModel.find({keywords: keyword}).populate('user')
        res.json(postWithKeywords)
    }catch (e) {
        console.log(e)
    }
}