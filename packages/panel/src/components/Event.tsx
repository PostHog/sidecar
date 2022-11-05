import cntl from "cntl";

const baseStyles = cntl`
  flex
  w-full
  p-1
  rounded-sm
  text-xs
`;

type Props = {
  exception: boolean;
  className?: string;
  children: React.ReactNode;
} & any;

const Event: React.FC<Props> = ({
  exception,
  classes,
  children,
}) => {
  return exception ? (
    <span>blah</span>
  ) : (
    <span
      className={`${baseStyles} ${classes}`}
    >
      {children}
    </span>
  );
};

export default Event;
