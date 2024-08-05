export const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute  right-5 top-1/2 transform -translate-y-1/2 z-10 bg-white text-black h-8 w-8 sm:h-10 sm:w-10 text-xl rounded-full hover:bg-slate-200 focus:outline-none"
    >
      &#8594;
    </button>
  );
};
