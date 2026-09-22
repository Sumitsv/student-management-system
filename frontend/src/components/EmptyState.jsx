import React from "react";
import { UserX, PlusCircle } from "lucide-react";

const EmptyState = ({ message, subtitle, onAction }) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center shadow-sm sm:px-10">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
        <UserX className="h-8 w-8" />
      </div>
      <h3 className="text-xl font-bold text-slate-900">
        {message || "No Students Found"}
      </h3>
      <p className="mt-2 max-w-md text-sm text-slate-500">
        {subtitle ||
          "Get started by adding your first student record to the portal."}
      </p>
      {onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200"
        >
          <PlusCircle className="h-4 w-4" />
          <span>Add New Student</span>
        </button>
      )}
    </div>
  );
};

export default EmptyState;
