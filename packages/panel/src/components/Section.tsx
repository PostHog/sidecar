const Section: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <section className="mx-2 rounded-sm bg-white border border-solid border-border dark:border-border-dark bg-accent dark:bg-accent-dark">{children}</section>;
};

export default Section;
