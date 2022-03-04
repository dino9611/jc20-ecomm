export const Container = ({ className, children }) => {
  return <div className={"md:px-32 px-10  " + className}>{children}</div>;
};
