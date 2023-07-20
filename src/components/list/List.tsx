const List = ({ isHome, children }: { isHome?: boolean; children: React.ReactNode }) => {
  return (
    <div
      className={
        (isHome ? 'divide-y divide-gray-200' : '') +
        ' dark:divide-gray-700 border-t border-gray-200 dark:border-gray-700'
      }
    >
      {children}
    </div>
  );
};

export default List;
