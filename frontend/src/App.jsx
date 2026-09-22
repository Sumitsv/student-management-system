import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import SearchBar from "./components/SearchBar";
import StudentList from "./components/StudentList";
import StudentForm from "./components/StudentForm";
import ConfirmDialog from "./components/ConfirmDialog";
import Loading from "./components/Loading";
import EmptyState from "./components/EmptyState";
import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from "./services/studentService";
import { CheckCircle2, AlertCircle, ClipboardList, Users } from "lucide-react";

const App = () => {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [notification, setNotification] = useState(null);

  // Modal States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  // Confirmation Dialog States
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const closeStudentForm = () => {
    setIsFormOpen(false);
    setEditingStudent(null);
  };

  // Toast notification helper
  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // Fetch students from API and keep the UI state in sync with the backend result.
  const fetchStudents = async (query = "") => {
    setIsLoading(true);
    try {
      const result = await getStudents(query);
      setStudents(Array.isArray(result) ? result : []);
    } catch (error) {
      setStudents([]);
      showNotification(
        "error",
        "Unable to connect to server. Please check your backend.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Load students on mount and on search term change
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchStudents(searchTerm);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  // Handle Create / Update Submit
  const handleFormSubmit = async (formData) => {
    try {
      if (editingStudent) {
        await updateStudent(editingStudent._id, formData);
        showNotification("success", "Student record updated successfully.");
      } else {
        await createStudent(formData);
        showNotification("success", "Student added successfully.");
      }

      await fetchStudents(searchTerm);
      closeStudentForm();
    } catch (error) {
      const msg =
        error.response?.data?.message || "Failed to save student record.";
      showNotification("error", msg);
      throw error; // Re-throw for form component error capturing
    }
  };

  // Open Form Modal for Create
  const handleOpenAddModal = () => {
    setEditingStudent(null);
    setIsFormOpen(true);
  };

  // Open Form Modal for Edit
  const handleOpenEditModal = (student) => {
    setEditingStudent(student);
    setIsFormOpen(true);
  };

  // Handle Delete Confirmation
  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      await deleteStudent(deleteId);
      showNotification("success", "Student record deleted successfully.");
      setDeleteId(null);
      await fetchStudents(searchTerm);
    } catch (error) {
      showNotification("error", "Failed to delete student record.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar onOpenAddModal={handleOpenAddModal} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {/* Notification Alert */}
        {notification && (
          <div
            className={`mb-6 rounded-2xl border px-4 py-3 shadow-sm transition-all ${
              notification.type === "success"
                ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                : "border-red-200 bg-red-50 text-red-800"
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                {notification.type === "success" ? (
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  </div>
                ) : (
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-100">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                  </div>
                )}
                <span className="text-sm font-medium">
                  {notification.message}
                </span>
              </div>
              <button
                onClick={() => setNotification(null)}
                className="text-xs font-semibold text-current opacity-75 transition hover:opacity-100"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
              <ClipboardList className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Student Management
              </p>
              <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Student Directory
              </h1>
            </div>
          </div>
          <p className="text-sm text-slate-600 sm:text-base">
            Track admissions, update records, and manage student information
            from a single dashboard.
          </p>
        </div>

        {/* Analytics Dashboard */}
        <Dashboard
          totalStudents={students.length}
          filteredCount={students.length}
          isSearching={searchTerm.trim() !== ""}
        />

        {/* Search Bar */}
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onClear={() => setSearchTerm("")}
        />

        {/* Student Records Section */}
        {isLoading ? (
          <Loading />
        ) : students.length > 0 ? (
          <StudentList
            students={students}
            onEdit={handleOpenEditModal}
            onDelete={(id) => setDeleteId(id)}
          />
        ) : (
          <EmptyState
            message={
              searchTerm ? "No Matching Students Found" : "No Students Found"
            }
            subtitle={
              searchTerm
                ? `We couldn't find any results matching "${searchTerm}".`
                : "Your database is currently empty."
            }
            onAction={searchTerm ? null : handleOpenAddModal}
          />
        )}
      </main>

      {/* Modals */}
      <StudentForm
        isOpen={isFormOpen}
        onClose={closeStudentForm}
        onSubmit={handleFormSubmit}
        initialData={editingStudent}
      />

      <ConfirmDialog
        isOpen={Boolean(deleteId)}
        title="Delete Student Record"
        message="Are you sure you want to permanently delete this student record? This action cannot be undone."
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteId(null)}
        isLoading={isDeleting}
      />

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white/80 py-4 text-center text-xs text-slate-500 backdrop-blur-sm">
        Student Management System &copy; {new Date().getFullYear()} • MERN Stack
        Assignment
      </footer>
    </div>
  );
};

export default App;
