export const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute  left-5 top-1/2 transform -translate-y-1/2 z-10 bg-white text-black h-14 w-14 text-xl rounded-full hover:bg-slate-300 focus:outline-none"
    >
      &#8592;
    </button>
  );
};
