"use client"

import { useEffect, useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid"
import { UserButton, OrganizationSwitcher } from "@clerk/nextjs";
import { useNoteStore } from "@/store/useNoteStore"
import { createClerkSupabaseClient } from "@/utils/clerk";
import { toast } from "sonner";
import { Note } from "@/types/Note";
import CreatePageForm from "@/components/CreatePageForm";
import Page from "@/components/Page";
import useStore from "@/store/store";
import { RiDashboardFill } from "react-icons/ri";
import { MdCreateNewFolder } from "react-icons/md";

const Sidebar = ({ token }: { token: string | null }) => {
  const { notes, setNotes } = useNoteStore();
  const [create, setCreate] = useState(false);
  const [parent, setParent] = useState("");
  const {
    liveblocks: { enterRoom },
  } = useStore();

  const supabase = createClerkSupabaseClient({ token });
  supabase.realtime.accessToken = token;

  const getData = useCallback(async () => {
    const noteData = await supabase.from("notes").select().order('title', { ascending: true });
    noteData.data !== null && setNotes(noteData.data);
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    const channel = supabase
      .channel("notes")
      .on("postgres_changes", { event: "*", schema: "public", table: "notes", },
        (payload) => {
          switch (payload.eventType) {
            case 'INSERT':
              console.log('New message:', payload.new);
              const newNote = {
                id: payload.new.id,
                title: payload.new.title,
                parent_id: payload.new.parent_id,
                content: payload.new.content,
                type: payload.new.type,
              } as Note;
              setNotes([...notes, newNote]);
              break;
            case 'UPDATE':
              console.log('Message updated:', payload.new);
              setNotes(notes.map((note) => {
                if (note.id === payload.new.id) {
                  return {
                    id: payload.new.id,
                    title: payload.new.title,
                    parent_id: payload.new.parent_id,
                    content: payload.new.content,
                    type: payload.new.type,
                  } as Note;
                }
                return note;
              }));
              break;
            case 'DELETE':
              console.log('Message deleted:', payload.old);
              setNotes(notes.filter(note => note.id !== payload.old.id))
              break;
          }
        },
      )
      .subscribe();

    return () => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      supabase.removeChannel(channel);
    };
  }, [notes]);

  const handleCreateNewPage = async (title: string) => {
    setCreate(false);
    if (title.trim() === "") return;
    const tempId = uuidv4();

    const newNote = {
      id: tempId,
      title: title,
      type: "shared",
      parent_id: parent !== "" ? parent : null,
      content: "",
    } as Note;
    setParent("");
    toast.success("New note created!");
    enterRoom(tempId);
    await supabase.from("notes").insert(newNote).select().single();
  };

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    noteId: string,
  ) => {
    e.dataTransfer.setData("text/plain", noteId);
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.clearData();
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = async (
    e: React.DragEvent<HTMLDivElement>,
    parent_id: string | null,
  ) => {
    e.preventDefault();
    const noteId = e.dataTransfer.getData("text/plain");
    // const droppedIndex = parseInt(e.dataTransfer.getData("index"));

    const droppedNote = notes.find((note) => note.id === noteId);

    // Move the note across sections
    if (!droppedNote || droppedNote !== undefined) {
      setNotes(notes.map((note) => {
        if (note.id === noteId) {
          return { ...note, parent_id };
        }
        return note;
      }));

      await supabase
        .from("notes")
        .update({ parent_id: parent_id })
        .eq("id", noteId);
    }

    // Move the note within its section
    // const updatedNotes = [...notes];
    // const currentIndex = updatedNotes.findIndex((note) => note.id === notesId);
    // updatedNotes.splice(currentIndex, 1);
    // updatedNotes.splice(droppedIndex, 0, droppedNote);

    // setNotes(updatedNotes);
  };


  return (
    <div className="flex flex-col">
      {create && <CreatePageForm onCreate={handleCreateNewPage} onClose={() => { setParent(""); setCreate(false) }} />}

      <div className="h-screen overflow-y-auto dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          <div className="flex items-center justify-between p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <OrganizationSwitcher />
            <UserButton />
          </div>

          <li>
            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <RiDashboardFill />
              <span className="ms-3">Dashboard</span>
            </a>
          </li>

          <li className="border-y border-gray-200 dark:border-gray-700">
            <a onClick={() => setCreate(true)}
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group cursor-pointer">
              <MdCreateNewFolder />
              <span className="flex-1 ms-3 whitespace-nowrap">Create Page</span>
              <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">{notes.length}</span>
            </a>
          </li>
          {notes
            .filter(note => note.parent_id === null)
            .map(note =>
              <Page key={note.id} page={note}
                handleDragStart={(e, id) => handleDragStart(e, id)} handleDragEnd={(e) => handleDragEnd(e)}
                handleDragOver={(e) => handleDragOver(e)} handleDrop={(e, id) => handleDrop(e, id)}
                handleAddPage={(id) => { setParent(id); setCreate(true) }}
              />
            )
          }
          <div className="h-56"
            onDragOver={(e) => handleDragOver(e)} onDrop={(e) => handleDrop(e, null)}
          >
          </div>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;