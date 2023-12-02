import React, { useState, useEffect} from "react";
import "../../styles/commentSection.css";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import FormularioClubLectura from "../clublectura";
import { sendComment } from "../../services/firestore";
import useAuth from "../../hooks/useAuth";

const CommentSection = ({ _id }) => {
  const { user } = useAuth();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("comments"); // Estado para gestionar la pestaña activa

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
        _id: _id,
      });
    }
    e.target.reset();
  };

  const [comments, setComments] = useState([]);

 


  return (
    <section className="comment__section">
      
      <div className="tab-buttons">
        <button onClick={() => setActiveTab("comments")} className={activeTab === "comments" ? "active" : ""}>
          Comentarios
        </button>
        <button onClick={() => setActiveTab("club")} className={activeTab === "club" ? "active" : ""}>
          Club De Lectura
        </button>
      </div>

     
      {activeTab === "comments" && (
        <div className="comments-section">
          <CommentForm onSubmit={handleCommentSubmit} isAlertOpen={isAlertOpen} />
          <CommentList comments={comments} _id={_id} />
        </div>
      )}
      {activeTab === "club" && <FormularioClubLectura _id={_id}/> 
      
      }
    </section>
  );
};

export default CommentSection;
