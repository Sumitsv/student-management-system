import React from "react";
import { GraduationCap, PlusCircle } from "lucide-react";

const Navbar = ({ onOpenAddModal }) => {
  return (
    <nav className="sticky top-0 z-20 border-b border-indigo-800/60 bg-indigo-700 text-white shadow-sm backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-18 items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="block text-lg font-bold tracking-tight sm:text-xl">
                EduPortal
              </span>
              <span className="hidden text-xs text-indigo-100 sm:block">
                Student Management System
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenAddModal}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2 focus:ring-offset-indigo-700"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Add Student</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
