const Section: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <section className="mx-2 rounded-sm bg-white border border-solid border-accent">{children}</section>;
};

export default Section;
