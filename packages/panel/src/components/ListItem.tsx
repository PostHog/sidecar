import cntl from "cntl";

const baseStyles = cntl`
  text-sm
  border-t 
  border-solid 
  border-border
  border-border-dark
  first:border-t-0
  mt-[1px]
  first:mt-0
`

const rowStyles = cntl`
  flex 
  items-center 
  justify-between 
`;
const ListItem: React.FC<any> = ({
  children,
  classes,
  property,
  flag,
  recording,
  event,
}) => {
  return property ? (
    <li className={`${baseStyles} ${rowStyles} ${classes}`}>{children}</li>
  ) : flag ? (
    <li className={`${baseStyles} ${classes}`}>{children}</li>
  ) : recording ? (
    <li className={`${baseStyles} ${classes}`}>{children}</li>
  ) : event ? (
    <li className={`${baseStyles} border-t border-solid border-border dark:border-border-accent-dark py-1 ${classes}`}>
      {children}
    </li>
  ) : (
    <li className={`${rowStyles} ${classes}`}>{children}</li>
  );
};

export default ListItem;
