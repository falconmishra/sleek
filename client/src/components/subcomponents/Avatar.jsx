import React from "react";

export default function Avatar({ alpha }) {
  return (
    <div class="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
      <span class="font-medium uppercase text-gray-600 dark:text-gray-300 not-italic">
        {alpha}
      </span>
    </div>
  );
}
