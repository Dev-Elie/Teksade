// CategoryIcon.tsx
import React from "react";

interface CategoryIconProps {
  className?: string;
  width?: number;
  height?: number;
  fill?: string;
}

const CategoryIcon: React.FC<CategoryIconProps> = ({
  className = "",
  width = 24,
  height = 24,
  fill = "none",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      className="-ml-1 mr-1 text-slate-400 dark:text-slate-500"
      stroke="currentColor"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path d="M4 11h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1zm10 0h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1zM4 21h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1zm13 0c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4z"></path>
    </svg>
  );
};

export default CategoryIcon;
