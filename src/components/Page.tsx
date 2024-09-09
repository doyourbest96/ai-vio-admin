"use client"

import { useState } from "react";
import { useNoteStore } from "@/store/useNoteStore";
import useStore from "@/store/store";
import { Note } from "@/types/Note";
import { FaPlus } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { FaRegFileLines } from "react-icons/fa6";
import { FaFolderClosed } from "react-icons/fa6";
import { FaFolderOpen } from "react-icons/fa";

interface PageProps {
  page: Note;
  handleDragStart: (e: React.DragEvent<HTMLDivElement>, id: string) => void;
  handleDragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>, id: string) => void;
  handleAddPage: (id: string) => void;
}

const Page = ({ page, handleDragStart, handleDragEnd, handleDragOver, handleDrop, handleAddPage }: PageProps) => {
  const { liveblocks: { enterRoom }, } = useStore();
  const { notes } = useNoteStore();
  const [collapsed, setCollapsed] = useState(true);
  const children = notes.filter(note => note.parent_id === page.id);

  return (
    <div key={page.id}
      onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, page.id)}
    >
      <div draggable={children.length === 0}
        onDragStart={(e) => handleDragStart(e, page.id)} onDragEnd={handleDragEnd}
        className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example"
      >
        {children.length === 0 ? <FaRegFileLines /> : collapsed ? <FaFolderClosed /> : <FaFolderOpen />}
        <button onClick={() => enterRoom(page.id)} className="flex-1 mx-3 text-left rtl:text-right whitespace-nowrap">{page.title}</button>
        {children.length > 0 && <button onClick={() => setCollapsed(!collapsed)} className="p-1 rounded-md hover:bg-gray-300">
          <IoIosArrowDown />
        </button>}
        <button onClick={() => handleAddPage(page.id)}
          className="p-1 rounded-md hover:bg-gray-300"
        >
          <FaPlus />
        </button>
      </div>
      {children.length > 0 && <ul className={"flex flex-col" + (collapsed === true ? " hidden" : " ")}>
        {children.map(note =>
          <div draggable key={note.id} onClick={() => enterRoom(note.id)} onDragStart={(e) => handleDragStart(e, note.id)} onDragEnd={handleDragEnd}>
            <button className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">{note.title}</button>
          </div>
        )}
      </ul>}
    </div>
  );
}

export default Page;
