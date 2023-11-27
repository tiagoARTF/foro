import Comment from "./Comment";
import CommentSection from "./CommentSection";
import ReplyList from "./ReplyList";
import useAuth from "../../hooks/useAuth";
import React, { Fragment, useEffect, useState } from "react";
import {  deleteComment, editComment, upvoteComment, downvoteComment, commentsListner } from "../../services/firestore";

const CommentList = ({ _id }) => {
    const [comments, setComments] = useState([]);
    const { user } = useAuth();

    
      

      /*useEffect(() => {
        const unsubscribe = commentsListenerForBooks(_id, setComments); 
        return () => {
            unsubscribe();
        };
    }, [_id]);*/

    /*useEffect(() => {
        const unsubscribe = commentsListner(setComments);
        return () => {
            unsubscribe();
        };
    }, []);*/

    useEffect(() => {
        const unsubscribe = commentsListner(_id, setComments);
        return () => {
            unsubscribe();
        };
    }, [_id]);
    

   

    const onDelete = async (id) => {
        await deleteComment(id);
        const updatedComments = comments.filter(comment => comment.id !== id);
        setComments(updatedComments);
    };

    const onEdit = async (id, comment) => {
        await editComment(id, comment);
        const updatedComments = comments.map(c => (c.id === id ? { ...c, ...comment } : c));
        setComments(updatedComments);
    };

    const downvote = async (id) => {
        await downvoteComment(id, user?.name);
    };

    const upvote = async (id) => {
        await upvoteComment(id, user?.name);
    };

    return (
        <ul className=' container mt-3'>
    {comments.map((comment) => (
        <Fragment key={comment.id}>
            
                <Comment
                    comment={comment}
                    type='comment'
                    onDelete={onDelete}
                    onEdit={onEdit}
                    upvote={upvote}
                    downvote={downvote}
                />
            
            <li className='list-group-item'>
                <ReplyList commentID={comment.id} />
            </li>
        </Fragment>
    ))}
</ul>

    );
};

export default CommentList;
