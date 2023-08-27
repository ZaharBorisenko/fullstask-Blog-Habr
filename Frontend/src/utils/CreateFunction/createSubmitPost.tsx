// import axios from "../../axios";
// import {toast} from "react-toastify";
// import {useCreatePost} from "../../hook/useCreatePost";
// import {tagsType} from "../Types";
// import {useNavigate} from "react-router-dom";
//
// const tagsRefactor = (tags:Array<tagsType>) => {
//     if (tags) return tags.map(item => item.value)
// }
//
// export const createSubmitPost = async (isEditPost:boolean,id:string) : Promise<void> => {
//     try {
//         const params = {
//             title:createPost.title,
//             text:createPost.text,
//             tags:tagsRefactor(createPost.tags),
//             imagePost: `${createPost.imageUrl === '' ? 'uploads/Image-Place-Holder.jpg' : createPost.imageUrl}`,
//             keywords: createPost.keywords,
//             difficultyLevel: createPost.level,
//             readingTime: createPost.readingTime,
//         };
//
//         const { data } = isEditPost ? await axios.patch(`/posts/${id}`, params) : await axios.post('/posts', params);
//         toast.success(`${isEditPost? 'Пост успешно отредактирован' : 'Пост успешно создан'}`,{
//             autoClose: 1500,
//         });
//         const idPost = isEditPost ? id : data._id;
//
//         navigate(`/posts/${idPost}`);
//     }catch (error) {
//         if (error.response || error.response.data || error.response.data.message) {
//             createPost.setErrorMessage(error.response.data)
//         }
//     }
// }
