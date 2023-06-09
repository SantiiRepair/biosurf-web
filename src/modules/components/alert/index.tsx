import {
  Alert,
  AlertIcon,
} from "@chakra-ui/react";

export default function CompositeAlert() {
  return (
   <Alert status='error'>
    <AlertIcon />
    There was an error processing your request
  </Alert>
  );
}
