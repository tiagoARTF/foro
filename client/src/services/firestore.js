import { app } from './firebase.js'

import { Timestamp, addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, getFirestore, orderBy, query, updateDoc, where } from "firebase/firestore";


const db = getFirestore(app);

/*export const commentsListenerForBooks = (_id, callback) => {
    const commentsRef = collection(db, "comments");
    const bookCommentsQuery = query(commentsRef, where("_id", "==", _id));
    return listenToCollection(bookCommentsQuery, callback);
};*/
const listenToCollection = (collectionRef, callback) => {
    const collectionQuery = query(collectionRef, orderBy("createdAt", "desc"))
    const unsubscribe = onSnapshot(collectionQuery, (querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
            items.push({ ...doc.data(), id: doc.id });
        });
        callback(items);
    });
    return unsubscribe;
};

export const commentsListner = (_id, callback) => {
    const commentsRef = collection(db, "comments");
    const commentsQuery = query(commentsRef, where("_id", "==", _id));

    return onSnapshot(commentsQuery, (snapshot) => {
        const comments = [];
        snapshot.forEach((doc) => {
            comments.push({ ...doc.data(), id: doc.id });
        });
        callback(comments);
    });
};

/*export const commentsListner = (callback) => {
    const commentsRef = collection(db, "comments");
    return listenToCollection(commentsRef, callback);
};*/


export const repliesListner = (commentId, callback) => {
    const repliesRef = collection(db, "comments", commentId, "replies");
    return listenToCollection(repliesRef, callback);
};

export const sendComment = async (comment) => {
    const commentsRef = collection(db, "comments");
    await addDoc(commentsRef, {
        ...comment,
        score: [],
        createdAt: Timestamp.now(),
    });
};

export const deleteComment = async (commentId) => {
    const commentRef = doc(db, "comments", commentId);
    await deleteDoc(commentRef);
}

export const editComment = async (commentId, data) => {
    const commentRef = doc(db, "comments", commentId);
    await updateDoc(commentRef, data);
}


export const addReply = async (commentId, reply) => {
    const repliesRef = collection(db, "comments", commentId, "replies");
    await addDoc(repliesRef, {
        ...reply,
        score: [],
        createdAt: Timestamp.now(),
    });
}

export const deleteReply = async (commentId, replyId) => {
    const commentRef = doc(db, "comments", commentId);
    const replyRef = doc(commentRef, "replies", replyId);
    await deleteDoc(replyRef);
}

export const editReply = async (commentId, replyId, data) => {
    const commentRef = doc(db, "comments", commentId);
    const replyRef = doc(commentRef, "replies", replyId);
    await updateDoc(replyRef, data);
}

const updateScoreArray = async (docRef, name, increment) => {
    const docSnapshot = await getDoc(docRef);
    const scoreArray = docSnapshot.data().score || []; // default to empty array if score doesn't exist
    const index = scoreArray.indexOf(name);
    if (increment && index < 0) {
        scoreArray.push(name); // add name to scoreArray
    } else if (!increment && index >= 0) {
        scoreArray.splice(index, 1); // remove name from scoreArray
    }
    await updateDoc(docRef, {
        score: scoreArray,
    });
}

export const upvoteComment = async (commentId, name) => {
    const commentRef = doc(db, "comments", commentId);
    await updateScoreArray(commentRef, name, true);
}

export const downvoteComment = async (commentId, name) => {
    const commentRef = doc(db, "comments", commentId);
    await updateScoreArray(commentRef, name, false);
}

export const upvoteReply = async (commentId, replyId, name) => {
    const commentRef = doc(db, "comments", commentId, "replies", replyId);
    await updateScoreArray(commentRef, name, true);
}

export const downvoteReply = async (commentId, replyId, name) => {
    const commentRef = doc(db, "comments", commentId, "replies", replyId);
    await updateScoreArray(commentRef, name, false);
}

/*export const getCommentsByBookId = async (_id) => {
    try {
        const commentsRef = collection(db, "comments");
        const q = query(commentsRef, where("_id", "==", _id));
        const commentsSnapshot = await getDocs(q);

        const comments = [];
        commentsSnapshot.forEach((doc) => {
            comments.push({ id: doc.id, ...doc.data() });
        });

        return comments;
    } catch (error) {
        console.error("Error fetching comments:", error);
        return [];
    }
};*/


