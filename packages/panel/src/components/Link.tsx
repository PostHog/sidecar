import cntl from "cntl";

const baseLinkStyles = cntl`
  text-primary dark:text-primary-dark
`;

const rowLinkStyles = cntl`
  flex
  w-full
  px-1
  py-1
  group
  rounded-sm
  font-medium
  bg-accent dark:bg-accent-dark hover:bg-border/20 dark:hover:bg-[rgba(255,255,255,.1)]
  relative hover:scale-[1.005] active:top-[0px] active:scale-[1] 

  after:font-semibold
  after:text-sm
  after:ml-0.5
  after:text-primary/30
  after:dark:text-primary-dark/30
  after:hover:text-primary/60
  after:dark:hover:text-white/50
  after:rounded-sm
  after:content-["→"]
  after:-rotate-45
`;

type Props = {
  to: string;
  className?: string;
  title?: string;
  external?: boolean;
  children: React.ReactNode;
} & any;

const Link: React.FC<Props> = ({
  to,
  external,
  className,
  title,
  flag,
  recording,
  event,
  children,
}) => {
  return flag ? (
    <a
      href={to}
      target={external ? "_blank" : undefined}
      className={`${baseLinkStyles} ${rowLinkStyles} ${className}`}
      title={title}
    >
      {children}
    </a>
  ) : recording ? (
    <a
      href={to}
      target={external ? "_blank" : undefined}
      className={`${baseLinkStyles} ${rowLinkStyles} ${className}`}
      title={title}
    >
      {children}
    </a>
  ) : event ? (
    <a
      href={to}
      target={external ? "_blank" : undefined}
      className={`${baseLinkStyles} ${rowLinkStyles} ${className}`}
      title={title}
    >
      {children}
    </a>
  ) : (
    <a
      href={to}
      target={external ? "_blank" : undefined}
      className={`${rowLinkStyles} ${className}`}
      title={title}
    >
      {children}
    </a>
  );
};

export default Link;
