import React from "react";
import {
  Edit3,
  Trash2,
  Mail,
  Phone,
  BookOpen,
  Hash,
  MapPin,
} from "lucide-react";

const StudentCard = ({ student, onEdit, onDelete }) => {
  return (
    <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div>
        <div className="mb-4 flex items-start justify-between gap-3 border-b border-slate-200 pb-3">
          <div>
            <h4 className="text-lg font-bold text-slate-900">
              {student.fullName}
            </h4>
            <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-2.5 py-1 text-[11px] font-semibold text-indigo-700">
              <Hash className="h-3 w-3" />
              {student.enrollmentNumber}
            </span>
          </div>
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600">
            {student.gender}, {student.age} yrs
          </span>
        </div>

        <div className="space-y-2.5 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 shrink-0 text-slate-400" />
            <span className="font-medium text-slate-700">{student.course}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 shrink-0 text-slate-400" />
            <span className="truncate">{student.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 shrink-0 text-slate-400" />
            <span>{student.phone}</span>
          </div>
          <div className="flex items-start gap-2">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
            <span className="line-clamp-2">{student.address}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-end gap-2 border-t border-slate-200 pt-4">
        <button
          type="button"
          onClick={() => onEdit(student)}
          className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100"
        >
          <Edit3 className="h-3.5 w-3.5" />
          Edit
        </button>
        <button
          type="button"
          onClick={() => onDelete(student._id)}
          className="inline-flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-100"
        >
          <Trash2 className="h-3.5 w-3.5" />
          Delete
        </button>
      </div>
    </div>
  );
};

export default StudentCard;
