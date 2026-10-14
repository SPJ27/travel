import { createAuthClient } from "better-auth/react"
import { organizationClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
    plugins: [
        organizationClient() 
    ]
})

const signIn = async () => {
  const data = await authClient.signIn.social({
    provider: "google",
  });
};