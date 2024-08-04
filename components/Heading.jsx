function Heading({ children }) {
  return (
    <div>
      <h1 className=" font-bold text-2xl  sm:text-3xl mt-10 text-black">
        {children}
      </h1>
    </div>
  );
}
export default Heading;
