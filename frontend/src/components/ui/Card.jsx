import { motion } from 'framer-motion';

const Card = ({
  children,
  variant = 'default',
  padding = 'md',
  hover = false,
  className = '',
  onClick,
  ...props
}) => {
  const baseStyles = 'rounded-2xl transition-all duration-200';

  const variants = {
    default: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-soft',
    glass: 'bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl',
    gradient: 'bg-gradient-to-br from-primary-50 to-accent-50 dark:from-gray-800 dark:to-gray-900 border border-primary-100 dark:border-gray-700 shadow-lg',
    elevated: 'bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl',
    flat: 'bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800',
  };

  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10',
  };

  const hoverStyles = hover
    ? 'cursor-pointer hover:shadow-xl hover:-translate-y-1 hover:border-primary-300 dark:hover:border-primary-700'
    : '';

  const Component = hover || onClick ? motion.div : 'div';
  const motionProps = hover || onClick
    ? {
        whileHover: { y: -4 },
        transition: { duration: 0.2 },
      }
    : {};

  return (
    <Component
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${paddings[padding]} ${hoverStyles} ${className}`}
      {...motionProps}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Card;

