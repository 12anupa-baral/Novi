import { motion, type MotionProps } from "motion/react";
import type { ReactNode } from "react";

interface FadeInProps extends MotionProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

const FadeIn = ({
  children,
  delay = 0,
  className,
  ...props
}: FadeInProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: 0.6,
        delay,
        ease: "easeOut",
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;