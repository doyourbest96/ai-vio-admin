export default function CheckBox({
  id,
  content,
  value,
  checked = false,
  onChange: handleClick,
}: {
  id: string;
  content: string;
  value?: string;
  checked?: boolean;
  onChange?: (value: string | undefined, checked: boolean) => void;
}) {
  return (
    <div className="flex items-center">
      <div className="cntr">
        <input
          type="checkbox"
          id={id}
          className="text-blue-500 focus:ring-0"
          checked={checked}
          onChange={(e) => {
            if (handleClick) {
              if (value) {
                handleClick(value, e.target.checked);
              } else {
                handleClick(undefined, e.target.checked);
              }
            }
          }}
        />
      </div>
      <label htmlFor={id} className="label-cbx mx-2 cursor-pointer">
        {content}
      </label>
    </div>
  );
}
