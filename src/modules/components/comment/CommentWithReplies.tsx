import { Box } from "@chakra-ui/react";
import React from "react";
import Comment from "Comment";

const CommentWithReplies = (CommentComponent: any, id: any, replies: Array<string>) => {
  const _buildReplies = () => {
    return replies.map((reply: any) => (
      <Comment
        key={reply.id}
        content={reply.content}
        id={reply.id}
        parentId={id}
        score={reply.score}
        replies={reply.replies}
        createdAt={reply.createdAt}
        replyingTo={reply.replyingTo}
        user={reply.user}
      />
    ));
  };

  return (
    <Box>
      {CommentComponent}
      <Box
        className="replies_container"
        borderLeftWidth={"2px"}
        borderLeftColor={"blackAlpha.100"}
        paddingLeft={"1em"}
      >
        {replies.length > 0 && _buildReplies()}
      </Box>
    </Box>
  );
};

export default CommentWithReplies;
