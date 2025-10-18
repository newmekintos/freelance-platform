import { cn } from '../../lib/utils';

export const Card = ({ className, ...props }) => (
  <div
    className={cn(
      'rounded-lg border shadow-sm',
      'bg-white dark:bg-gray-800',
      'border-gray-200 dark:border-gray-700',
      'text-gray-900 dark:text-gray-100',
      className
    )}
    {...props}
  />
);

export const CardHeader = ({ className, ...props }) => (
  <div
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
);

export const CardTitle = ({ className, ...props }) => (
  <h3
    className={cn(
      'text-2xl font-semibold leading-none tracking-tight',
      'text-gray-900 dark:text-gray-100',
      className
    )}
    {...props}
  />
);

export const CardDescription = ({ className, ...props }) => (
  <p
    className={cn(
      'text-sm',
      'text-gray-600 dark:text-gray-400',
      className
    )}
    {...props}
  />
);

export const CardContent = ({ className, ...props }) => (
  <div className={cn('p-6 pt-0', className)} {...props} />
);

export const CardFooter = ({ className, ...props }) => (
  <div
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
);
