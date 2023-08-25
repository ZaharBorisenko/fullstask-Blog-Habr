import CommentsPost from "../Models/CommentsPost.js";
import PostSchema from "../Models/Post.js";


export const getCommentsByPost = async (req, res) => {
    try {
        const { postId } = req.params; // Получаем postId из параметров маршрута

        const post = await PostSchema.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Пост не найден' });
        }

        // Находим комментарии, связанные с этим постом
        const comments = await CommentsPost.find({ _id: { $in: post.comments } }).populate('user');

        res.json(comments);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: 'Что-то пошло не так' });
    }
};

export const createComment = async (req,res) => {
    try {
        const { postId } = req.params; // Получаем postId из параметров маршрута
        const { comment, userId } = req.body;

        if (!comment) return res.json({ message: 'Комментарий не может быть пустым' });

        const newComment = new CommentsPost({ comment, user: userId });
        await newComment.save();

        // Обновляем пост, добавляя комментарий к массиву комментариев
        await PostSchema.findOneAndUpdate(
            { _id: postId },
            {
                $push: { comments: newComment._id },
            }
        );

        res.json(newComment);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: 'Что-то пошло не так' });
    }
}
//
// export const removeComment = async (req,res) => {
//     try {
//         const {postId} = req.params;
//         const commentId = req.body.comments._id
//
//         await PostSchema.findOneAndUpdate(
//             {_id: postId},
//             {$pull: {comments: commentId}}
//         )
//
//         res.json({message: "Пост успешно удалён"})
//     }catch (e) {
//         console.log(e);
//         res.status(500).json({ message: 'Что-то пошло не так' });
//     }
// }