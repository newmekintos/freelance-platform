import { cn } from '../../lib/utils';

const Input = ({ className, type = 'text', ...props }) => {
  return (
    <input
      type={type}
      className={cn(
        'flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm',
        'bg-white dark:bg-gray-800',
        'text-gray-900 dark:text-gray-100',
        'border-gray-300 dark:border-gray-600',
        'placeholder:text-gray-500 dark:placeholder:text-gray-400',
        'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'transition-colors duration-200',
        className
      )}
      {...props}
    />
  );
};

export default Input;
