import cntl from "cntl";

const baseStyles = cntl`
  text-sm
  py-[1px]
  border-t 
  border-solid 
  border-light-gray
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
    <li className={`${baseStyles} font-code border-t border-solid border-light-gray ${classes}`}>
      {children}
    </li>
  ) : (
    <li className={`${rowStyles} ${classes} text-red`}>{children}</li>
  );
};

export default ListItem;
