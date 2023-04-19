const Header: React.FC<{ link?: string; children: React.ReactNode }> = ({
  link,
  children,
}) => {
  return (
    <header className="border-b border-solid border-border dark:border-border-dark bg-accent dark:bg-accent-dark flex items-center justify-between px-2">
      <h3 className="rounded-sm text-sm py-1 font-medium">{children}</h3>
      {link ? (
        <a
          href={link}
          target="_blank"
          className="inline-block select-none font-semibold text-sm 
          text-primary/30 
          dark:text-primary-dark/30 
          hover:text-primary/60 
          dark:hover:text-white/50 
          hover:bg-accent/20 
          dark:hover:bg-white/20 
          px-1.5 py-0.5 rounded-sm"
        >
          <span className="inline-block -rotate-45">
            →
          </span>
        </a>
      ) : null}
    </header>
  );
};

export default Header;
