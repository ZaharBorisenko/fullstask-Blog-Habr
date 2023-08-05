import PostModel from "../Models/Post.js";


export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user').sort({createdAt: -1}).exec();
        res.json(posts)
    } catch (e) {
        console.log(e)
        res.status(403).json({
            message: 'Не удалось получить статьи'
        })
    }
}


export const getPopularity = async (req, res) => {
    try {
        const postsPopularity = await PostModel.find().sort({ viewCount: -1 }).limit(3).exec();
        res.json(postsPopularity)
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
            .populate('user')
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

export const remove = async (req, res) => {
    try {
        const postId = req.params.id;

        const deletedPost = await PostModel.findOneAndDelete(
            { _id: postId }
        );

        if (!deletedPost) {
            return res.status(404).json({
                message: 'Статья с указанным ID не найдена'
            });
        }

        res.json({
            message: 'Статья успешно удалена',
            deletedPost
        });


    } catch (e) {
        console.log(e)
        res.status(403).json({
            message: 'Не удалось удалить статью'
        })
    }
}

export const update = async (req, res) => {
    const data = req.body;
    try {
        const postId = req.params.id;

        await PostModel.updateOne(
            {_id: postId},
            {
                title: data.title,
                text: data.text,
                tags: data.tags,
                imagePost: data.imagePost,
                keywords: data.keywords,
                user: data.userId
            }
        )

        res.json({
            answer: true
        });

    }catch (e) {
        console.log(e)
        res.status(403).json({
            message: 'Не удалось обновить статью'
        })
    }
}
