import React, {useState, useEffect} from "react";
import "../../styles/commentSection.css";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import {sendComment, getCommentsByBookId} from "../../services/firestore";
import useAuth from "../../hooks/useAuth";


const CommentSection = ({ _id }) => {
    const { user } = useAuth();
    const [isAlertOpen, setIsAlertOpen] = useState(false);


    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            setIsAlertOpen(true);
            setTimeout(() => {
                setIsAlertOpen(false);
            }, 2000);
            return;
        }
        const comment = e.target.comment.value;
        if (comment) {
            await sendComment({
                content: comment,
                user: {
                    name: user.name,
                    image: user.photoURL,
                },
                _id: _id, // Asocia el comentario con el libro
            });
        }
        e.target.reset();
    };

    const [comments, setComments] = useState([]);

    useEffect(() => {
        // Carga los comentarios para el libro específico
        const fetchComments = async () => {
            const bookComments = await getCommentsByBookId(_id);
            setComments(bookComments);
        };

        fetchComments();
    }, [_id]);

    return (
        <section className='comment__section'>
            <CommentForm onSubmit={handleCommentSubmit} isAlertOpen={isAlertOpen} />
            <CommentList comments={comments} _id={_id} />
        </section>
    );
};


export default CommentSection;
