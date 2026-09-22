import React from "react";
import { Loader2 } from "lucide-react";

const Loading = ({ message = "Loading students..." }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-12 shadow-sm">
      <div className="flex flex-col items-center justify-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
        <p className="text-sm font-medium text-slate-600">{message}</p>
      </div>
    </div>
  );
};

export default Loading;
