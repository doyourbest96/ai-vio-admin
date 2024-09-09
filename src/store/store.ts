import create from "zustand";
import { createClient } from "@liveblocks/client";
import { liveblocks } from "@liveblocks/zustand";
import type { WithLiveblocks } from "@liveblocks/zustand";

declare global {
  interface Liveblocks {
    // Custom user info set when authenticating with a secret key
    UserMeta: {
      id: string; // Accessible through `user.id`
      info: {
        name: string;
        color: string;
        picture: string;
      }; // Accessible through `user.info`
    };
  }
}

const client = createClient({
  authEndpoint: "/api/liveblocks-auth",
});

type State = {};

const useStore = create<WithLiveblocks<State>>()(
  liveblocks(
    (set) => ({}),
    {
      client,
    }
  )
);
export default useStore;

