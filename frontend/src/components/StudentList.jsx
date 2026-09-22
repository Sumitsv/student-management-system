import React from "react";
import StudentCard from "./StudentCard";
import { Edit3, Trash2, Mail, Phone, BookOpen, Hash } from "lucide-react";

const StudentList = ({ students, onEdit, onDelete }) => {
  return (
    <>
      <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:block">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                <th className="px-5 py-4">Student</th>
                <th className="px-5 py-4">Enrollment No</th>
                <th className="px-5 py-4">Course</th>
                <th className="px-5 py-4">Contact</th>
                <th className="px-5 py-4">Age / Gender</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm text-slate-700">
              {students.map((student) => (
                <tr
                  key={student._id}
                  className="transition hover:bg-slate-50/80"
                >
                  <td className="px-5 py-4 align-top">
                    <div className="font-semibold text-slate-900">
                      {student.fullName}
                    </div>
                    <div className="mt-1 max-w-xs text-xs text-slate-500">
                      {student.address}
                    </div>
                  </td>
                  <td className="px-5 py-4 align-top">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700">
                      <Hash className="h-3 w-3" />
                      {student.enrollmentNumber}
                    </span>
                  </td>
                  <td className="px-5 py-4 align-top">
                    <div className="flex items-center gap-1.5 font-medium text-slate-700">
                      <BookOpen className="h-3.5 w-3.5 text-slate-400" />
                      {student.course}
                    </div>
                  </td>
                  <td className="px-5 py-4 align-top text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <Mail className="h-3.5 w-3.5 text-slate-400" />
                      {student.email}
                    </div>
                    <div className="mt-1.5 flex items-center gap-2">
                      <Phone className="h-3.5 w-3.5 text-slate-400" />
                      {student.phone}
                    </div>
                  </td>
                  <td className="px-5 py-4 align-top text-sm text-slate-600">
                    <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-1 font-medium text-slate-700">
                      {student.age} yrs • {student.gender}
                    </span>
                  </td>
                  <td className="px-5 py-4 align-top">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => onEdit(student)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-indigo-200 bg-indigo-50 text-indigo-600 transition hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                        title="Edit Student"
                        aria-label="Edit student"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(student._id)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-red-200 bg-red-50 text-red-600 transition hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-200"
                        title="Delete Student"
                        aria-label="Delete student"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:hidden">
        {students.map((student) => (
          <StudentCard
            key={student._id}
            student={student}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </>
  );
};

export default StudentList;
