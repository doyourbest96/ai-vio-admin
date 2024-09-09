import { createBrowserClient } from "@supabase/ssr";

interface SupabaseClient {
  token?: string | null;
}

export function createClerkSupabaseClient({ token }: SupabaseClient) {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        // Get the custom Supabase token from Clerk
        fetch: async (url, options = {}) => {
          // const clerkToken = await session?.getToken({
          //   template: "supabase",
          // });

          // Insert the Clerk Supabase token into the headers
          const headers = new Headers(options?.headers);
          headers.set("Authorization", `Bearer ${token}`);

          // Now call the default fetch
          return fetch(url, {
            ...options,
            headers,
          });
        },
      },
      // realtime: {
      //   fetch: async
      // }
    },
  );
}
