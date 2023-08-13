import PostModel from "../Models/Post.js";
export const IdTags = async (req,res) => {
    const tag = req.params.tag;
    try {
        const postWithTags = await PostModel.find({tags:tag})
        res.json(postWithTags);
    }catch (e) {
        console.log(e)
    }
}