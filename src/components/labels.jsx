export default function Label({ element, placeHolder }) {
  return (
    <label htmlFor={element} className=" font-semibold pl-[4px] text-sm">
      {placeHolder}
    </label>
  );
}
