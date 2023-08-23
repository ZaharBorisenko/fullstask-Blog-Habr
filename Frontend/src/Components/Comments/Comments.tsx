import React from 'react';
import st from './Comments.module.scss'
const Comments = () => {
    return (
        <div className={st.container}>
           <div className={st.content}>
               <p className={st.title}>Комментарии <span>3</span></p>

               <div className={st.containerComments}>
               </div>

           </div>
        </div>
    );
};

export default Comments;