import React from "react";
import { Users, BookOpen, UserCheck } from "lucide-react";

const Dashboard = ({ totalStudents, filteredCount, isSearching }) => {
  return (
    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Total Enrolled
          </p>
          <h3 className="mt-2 text-3xl font-bold text-slate-900">
            {totalStudents}
          </h3>
          <p className="mt-1 text-xs text-slate-500">Active student records</p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
          <Users className="h-6 w-6" />
        </div>
      </div>

      <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            {isSearching ? "Search Results" : "System Status"}
          </p>
          <h3 className="mt-2 text-3xl font-bold text-slate-900">
            {isSearching ? filteredCount : "Active"}
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            {isSearching
              ? "Students matched query"
              : "Database fully synchronized"}
          </p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
          <UserCheck className="h-6 w-6" />
        </div>
      </div>

      <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md sm:col-span-2 lg:col-span-1">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Course Directory
          </p>
          <h3 className="mt-2 text-xl font-bold text-slate-900">
            Multi-Domain
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            CS, IT, Business, Arts, Medical
          </p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
          <BookOpen className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
