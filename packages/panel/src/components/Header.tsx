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
          className="inline-block -rotate-45 opacity-30 hover:opacity-70 px-1 py-0.5"
        >
          →
        </a>
      ) : null}
    </header>
  );
};

export default Header;
