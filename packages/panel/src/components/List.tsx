type ListProps = {
  className?: string;
  children: React.ReactNode;
  loading?: boolean;
};

const List: React.FC<ListProps> = ({ className = "", children, loading }) => {
  return loading ? (
    <ul className="space-y-2 m-2">
      {new Array(3).fill(1).map((_, i) => {
        return <li key={i} className="py-2 w-full bg-gray-200 dark:bg-[rgba(255,255,255,.1)] animate-pulse rounded" />;
      })}
    </ul>
  ) : (
    <ul className={`mx-1 py-0.5 ${className}`}>{children}</ul>
  );
};

export default List;
