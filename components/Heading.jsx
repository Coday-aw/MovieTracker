function Heading({ children }) {
  return (
    <div>
      <h1 className=" font-bold text-2xl text-center sm:text-3xl mt-10 text-green-600">
        {children}
      </h1>
    </div>
  );
}
export default Heading;
