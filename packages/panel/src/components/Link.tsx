import cntl from "cntl";

const baseLinkStyles = cntl`
  text-primary dark:text-primary-dark
`;

const rowLinkStyles = cntl`
  flex
  w-full
  px-1
  py-2
  group
  rounded-sm
  bg-accent dark:bg-accent-dark
  relative hover:scale-[1.005] active:top-[0.25px] active:scale-[1] transition-all
`;

type Props = {
  to: string;
  className?: string;
  external?: boolean;
  children: React.ReactNode;
} & any;

const Link: React.FC<Props> = ({
  to,
  external,
  classes,
  flag,
  recording,
  event,
  children,
}) => {
  return flag ? (
    <a
      href={to}
      target={external ? "_blank" : undefined}
      className={`${baseLinkStyles} ${rowLinkStyles} ${classes}`}
    >
      {children}
    </a>
  ) : recording ? (
    <a
      href={to}
      target={external ? "_blank" : undefined}
      className={`${baseLinkStyles} ${rowLinkStyles} ${classes}`}
    >
      {children}
    </a>
  ) : event ? (
    <a
      href={to}
      target={external ? "_blank" : undefined}
      className={`${baseLinkStyles} ${rowLinkStyles} ${classes}`}
    >
      {children}
    </a>
  ) : (
    <a
      href={to}
      target={external ? "_blank" : undefined}
      className={`${baseLinkStyles} ${classes}`}
    >
      {children}
    </a>
  );
};

export default Link;
