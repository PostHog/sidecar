const Header: React.FC<{ link?: string; children: React.ReactNode }> = ({
  link,
  children,
}) => {
  return (
    <header className="bg-background dark:bg-accent-dark flex items-center justify-between px-2">
      <h3 className="rounded-sm text-xs py-2 font-medium">{children}</h3>
      {link ? (
        <a
          href={link}
          target="_blank"
          className="inline-block select-none font-semibold text-sm 
          text-primary/30 
          dark:text-primary-dark/30 
          hover:text-primary/60 
          dark:hover:text-white/50 
          hover:bg-primary/5
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
