import PostModel from "../Models/Post.js";


export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user').exec();
        res.json(posts)
    } catch (e) {
        console.log(e)
        res.status(403).json({
            message: 'Не удалось получить статьи'
        })
    }
}

export const getOnePost = async (req, res) => {
    try {
        const postId = req.params.id;
        PostModel.findOneAndUpdate(
            {_id: postId},
            {$inc: {viewCount: 1}},
            {updatedDocument: 'after'})
            .then(doc => res.json(doc))
            .catch(err => res.status(403).json({message: 'статья не найдена'}))
    } catch (e) {
        console.log(e)
        res.status(403).json({
            message: 'Не удалось получить статью'
        })
    }
}

export const create = async (req, res) => {
    const data = req.body;
    try {
        const doc = new PostModel({
            title: data.title,
            text: data.text,
            tags: data.tags,
            imagePost: data.imagePost,
            keywords: data.keywords,
            difficultyLevel: data.difficultyLevel,
            readingTime: data.readingTime,

            user: req.userId,
        })

        const post = await doc.save()
        res.json(post)

    } catch (e) {
        console.log(e)
        res.status(403).json({
            message: 'Не удалось создать статью'
        })
    }
}
