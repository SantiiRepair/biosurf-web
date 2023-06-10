import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function useProtectedRouting() {
  function SocialAuth() {
    const { data: session } = useSession();
    const router = useRouter();
    if (!session) {
      router.push("/login");
    }
  }

  function ServerAuth() {
    const { data: session } = useSession();
    const router = useRouter();
    if (!session) {
      router.push("/login");
    }
  }

  return { SocialAuth, ServerAuth };
}
