export default function Label({ element, placeHolder }) {
  return (
    <label
      style={{
        fontFamily: "'EB Garamond', serif",
        fontFamily: "'Outfit', sans-serif",
      }}
      htmlFor={element}
      className=" font-semibold pl-[4px] text-sm"
    >
      {placeHolder}
    </label>
  );
}
