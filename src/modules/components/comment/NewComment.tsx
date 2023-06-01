import React, { useState, useEffect } from "react";
import { Box, Button, Flex, Text, Textarea } from "@chakra-ui/react";
import UserAvatar from "../media/UserAvatar";
import data from "../data.json";
import { useComments } from "../../../hooks/useComments";

interface Props {
  isUpdate: boolean;
  replyingTo?: string;
  isNewComment: boolean;
  id?: number;
  parentId?: number;
  closeEditor: () => void;
}

const AuthUser = data.currentUser;

function CommentEditor({
  isUpdate,
  replyingTo,
  isNewComment,
  id,
  parentId,
  closeEditor,
}: Props) {
  const [commentText, setCommentText] = useState<string>("");

  const { reply, addTopLevelComment, updateComment } = useComments();

  useEffect(() => {
    if (replyingTo) setCommentText(`@${replyingTo}, `);
  }, [replyingTo]);

  const removeTagFromCommentText = (): string => {
    return commentText.substring(replyingTo!.length + 2);
  };

  const handleClick = () => {
    if (commentText === "") return;

    if (!isUpdate && !isNewComment) {
      let cleanedText = removeTagFromCommentText().trim();
      reply(parentId!, AuthUser, cleanedText, replyingTo!);

      closeEditor();
    }

    if (isNewComment) {
      addTopLevelComment(commentText, AuthUser);
    }

    if (isUpdate) {
      updateComment(id!, parentId!, commentText);
      closeEditor();
    }

    reset();
  };

  const reset = () => {
    setCommentText("");
  };

  return (
    <Box
      className="comment"
      bg={"white"}
      borderRadius={"xl"}
      my={4}
      p={5}
      boxShadow={"sm"}
    >
      <Box>
        <Flex alignItems={"start"} justifyContent="space-between">
          <UserAvatar image={AuthUser.image.webp} />
          <Textarea
            resize={"none"}
            display={"flex"}
            width={"100%"}
            flex={1}
            mx={4}
            color={"grayish_blue"}
            fontWeight={"medium"}
            onChange={(e) => setCommentText(e.target.value)}
            value={commentText}
          />
          <Button
            bg={"moderate_blue"}
            onClick={() => handleClick()}
            _hover={{
              opacity: 0.6,
            }}
          >
            <Text fontWeight={"black"} color={"white"}>
              {isUpdate ? "Update" : isNewComment ? "Send" : "Reply"}
            </Text>
          </Button>
        </Flex>
      </Box>
    </Box>
  );
}

export default CommentEditor;