"use client";

import { CollaborativeEditor } from "@/components/CollaborativeEditor";
import { Loading } from "@/components/Loading";
import useStore from "@/store/store";

export function Room() {
  const {
    liveblocks: { isStorageLoading },
  } = useStore();

  if (isStorageLoading) {
    return <Loading />;
  }

  return <CollaborativeEditor />;
}
