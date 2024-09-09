import React, { useState } from "react";

const CreatePageForm = ({ onCreate, onClose }: { onCreate: (title: string) => void, onClose: () => void }) => {
  const [title, setTitle] = useState("");

  return (
    <div className="absolute flex left-0 top-0 right-0 bottom-0 justify-center items-center z-[9999] bg-[#00000099]">
      <div className="flex px-10 py-5 flex-col justify-center rounded-lg bg-white">
        <div className="md:mx-auto md:w-full md:max-w-md">
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Create New Page</h2>
        </div>

        <div className="mt-5 md:mx-auto md:w-full md:max-w-md">
          <div className="space-y-5">
            <div>
              <label htmlFor="title" className="block text-md font-medium leading-6 text-gray-900">Page Title</label>
              <div className="mt-2">
                <input id="title" name="title" type="text" autoComplete="title" value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="block w-full rounded-md border-0 p-1.5 text-md font-medium leading-6 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 md:text-md md:leading-6"></input>
              </div>
            </div>

            <div className="flex flex-row gap-2">
              <button
                onClick={() => onCreate(title)} disabled={title.trim() === ""}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-md font-semibold leading-6 text-white shadow-md hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Create</button>
              <button
                onClick={() => onClose()}
                className="flex w-full justify-center rounded-md bg-slate-600 px-3 py-1.5 text-md font-semibold leading-6 text-white shadow-md hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePageForm;