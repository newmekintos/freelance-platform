import { cn } from '../../lib/utils';

const Textarea = ({ className, ...props }) => {
  return (
    <textarea
      className={cn(
        'flex min-h-[80px] w-full rounded-md border px-3 py-2 text-sm',
        'bg-white dark:bg-gray-800',
        'text-gray-900 dark:text-gray-100',
        'border-gray-300 dark:border-gray-600',
        'placeholder:text-gray-500 dark:placeholder:text-gray-400',
        'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'transition-colors duration-200',
        'resize-vertical',
        className
      )}
      {...props}
    />
  );
};

export default Textarea;
