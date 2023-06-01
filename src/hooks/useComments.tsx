import React, { useState, useContext, ReactNode } from "react";
import data from "./data.json";
import { selectionSort } from "../utils/Utils";

type Comment = {
  id: number;
  createdAt: Date;
  content: string;
  score: number;
  replyingTo?: string;
  user: { name: string; avatar: string };
  replies: Comment[];
};

type CommentsContextType = {
  comments: Comment[];
  incrementUpvote: (id: number, parentId?: number) => void;
  decrementUpvote: (id: number, parentId?: number) => void;
  loadComments: () => void;
  saveChanges: (newComments: Comment[]) => void;
  reply: (
    parentId: number,
    user: any,
    content: string,
    replyingTo?: string
  ) => void;
  addTopLevelComment: (content: string, user: any) => void;
  deleteComment: (id: number, parentId?: number) => void;
  showDeleteDialog: boolean;
  setDeleteDialogVisibility: (visibility: boolean) => void;
  currentCommentIdx: { id: number | null; parentId: number | null };
  setCurrentCommentIdx: (commentIdx: {
    id: number | null;
    parentId: number | null;
  }) => void;
  updateComment: (
    id: number,
    parentId: number | undefined,
    content: string
  ) => void;
};

const CommentsContext = React.createContext<CommentsContextType>({
  comments: [],
  incrementUpvote: () => {},
  decrementUpvote: () => {},
  loadComments: () => {},
  saveChanges: () => {},
  reply: () => {},
  addTopLevelComment: () => {},
  deleteComment: () => {},
  showDeleteDialog: false,
  setDeleteDialogVisibility: () => {},
  currentCommentIdx: { id: null, parentId: null },
  setCurrentCommentIdx: () => {},
  updateComment: () => {},
});

export function useComments() {
  return useContext(CommentsContext);
}

function CommentsProvider({ children }: { children: ReactNode }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [showDeleteDialog, setDeleteDialogVisibility] =
    useState<boolean>(false);
  const [currentCommentIdx, setCurrentCommentIdx] = useState<{
    id: number | null;
    parentId: number | null;
  }>({
    id: null,
    parentId: null,
  });

  // LoadComments
  function loadComments() {
    localStorage.getItem("comments") !== null
      ? setComments(JSON.parse(localStorage.getItem("comments")!))
      : setComments(sortByScore(data["comments"]));
  }

  // saveChanges
  function saveChanges(newComments: Comment[]) {
    localStorage.setItem("comments", JSON.stringify(sortByScore(newComments)));
    loadComments();
  }

  // sort Comments
  function sortByScore(comments: Comment[]) {
    let orderedComments = selectionSort(comments);

    return orderedComments;
  }

  // newComment
  function addTopLevelComment(content: string, user: any) {
    let newList = [...comments];
    let newComment: Comment = {
      id: Math.floor(Math.random() * 1000),
      createdAt: new Date(),
      content: content,
      score: 0,
      user: { ...user },
      replies: [],
    };
    newList.push(newComment);
    saveChanges(newList);
  }

  // NewReply
  function reply(
    parentId: number,
    user: any,
    content: string,
    replyingTo?: string
  ) {
    let newList = [...comments];

    let ParentIdx = findParentIndex(parentId);

    let newComment: Comment = {
      id: Math.floor(Math.random() * 1001),
      createdAt: new Date(),
      content: content,
      score: 0,
      replyingTo: replyingTo,
      replies: [],
      user: { ...user },
    };
    newList[ParentIdx].replies.push(newComment);
    saveChanges(newList);
  }

  function updateComment(
    id: number,
    parentId: number | undefined,
    content: string
  ) {
    let newList = [...comments];
    if (!parentId) {
      let idx = newList.findIndex((comment) => comment.id === id);
      newList[idx].content = content;
      saveChanges(newList);
    } else {
      let ParentIdx = findParentIndex(parentId);
      let idx = newList[ParentIdx].replies.findIndex(
        (comment) => comment.id === id
      );
      newList[ParentIdx].replies[idx].content = content;
      saveChanges(newList);
    }
  }

  // Delete Comment
  function deleteComment(id: number, parentId?: number) {
    let newList = [...comments];

    if (parentId == null) {
      let idx = newList.findIndex((comment) => comment.id === id);
      newList.splice(idx, 1);
      saveChanges(newList);
    } else {
      let ParentIdx = findParentIndex(parentId);
      let idx = newList[ParentIdx].replies.findIndex(
        (comment) => comment.id === id
      );
      newList[ParentIdx].replies.splice(idx, 1);
      saveChanges(newList);
    }
  }

  // IncrementUpvote
  function incrementUpvote(id: number, parentId?: number) {
    let newList = [...comments];
    if (parentId == null) {
      let idx = newList.findIndex((comment) => comment.id === id);
      newList[idx].score++;
      saveChanges(newList);
    } else {
      let ParentIdx = findParentIndex(parentId);
      let idx = newList[ParentIdx].replies.findIndex(
        (comment) => comment.id === id
      );
      newList[ParentIdx].replies[idx].score++;
      saveChanges(newList);
    }
  }

  // DecrementUpvote
  function decrementUpvote(id: number, parentId?: number) {
    let newList = [...comments];

    if (parentId == null) {
      let idx = newList.findIndex((comment) => comment.id === id);
      if (newList[idx].score > 0) {
        newList[idx].score--;
        saveChanges(newList);
      }
    } else {
      let ParentIdx = findParentIndex(parentId);
      let idx = newList[ParentIdx].replies.findIndex(
        (comment) => comment.id === id
      );
      if (newList[ParentIdx].replies[idx].score > 0) {
        newList[ParentIdx].replies[idx].score--;
        saveChanges(newList);
      }
    }
  }

  const value: CommentsContextType = {
    comments,
    incrementUpvote,
    decrementUpvote,
    loadComments,
    saveChanges,
    reply,
    addTopLevelComment,
    deleteComment,
    showDeleteDialog,
    setDeleteDialogVisibility,
    currentCommentIdx,
    setCurrentCommentIdx,
    updateComment,
  };

  function findParentIndex(parentId: number) {
    return comments.findIndex((comment) => comment.id === parentId);
  }

  return (
    <CommentsContext.Provider value={value}>
      {children}
    </CommentsContext.Provider>
  );
}

export default CommentsProvider;
