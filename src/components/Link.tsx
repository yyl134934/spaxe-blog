import NextLink from 'next/link';

type LinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: (e?: React.MouseEvent) => void;
};

function Link(props: LinkProps) {
  const { children, className = 'text-primary-500 hover:text-primary-600', ...rest } = props;
  return (
    <NextLink className={className} {...rest}>
      {children}
    </NextLink>
  );
}
export default Link;
