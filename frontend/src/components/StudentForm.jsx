import React, { useState, useEffect } from "react";
import {
  X,
  Save,
  AlertCircle,
  UserRound,
  Mail,
  Phone,
  Hash,
  BookOpen,
  MapPin,
  GraduationCap,
} from "lucide-react";

const StudentForm = ({ isOpen, onClose, onSubmit, initialData }) => {
  const defaultFormState = {
    fullName: "",
    email: "",
    phone: "",
    age: "",
    course: "",
    gender: "",
    enrollmentNumber: "",
    address: "",
  };

  const [formData, setFormData] = useState(defaultFormState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setFormData(defaultFormState);
      setErrors({});
      return;
    }

    if (initialData) {
      setFormData({
        fullName: initialData.fullName || "",
        email: initialData.email || "",
        phone: initialData.phone || "",
        age: initialData.age || "",
        course: initialData.course || "",
        gender: initialData.gender || "",
        enrollmentNumber: initialData.enrollmentNumber || "",
        address: initialData.address || "",
      });
    } else {
      setFormData(defaultFormState);
    }
    setErrors({});
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (
      !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)
    ) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^[0-9+\-\s()]{7,15}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number.";
    }

    if (!formData.age) {
      newErrors.age = "Age is required.";
    } else if (Number(formData.age) < 5 || Number(formData.age) > 100) {
      newErrors.age = "Age must be between 5 and 100.";
    }

    if (!formData.course.trim()) {
      newErrors.course = "Course selection is required.";
    }

    if (!formData.gender) {
      newErrors.gender = "Gender selection is required.";
    }

    if (!formData.enrollmentNumber.trim()) {
      newErrors.enrollmentNumber = "Enrollment number is required.";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error dynamically
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      // Server error handling can set general form error
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrors((prev) => ({ ...prev, server: error.response.data.message }));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-3xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                {initialData ? "Update" : "New student"}
              </p>
              <h3 className="text-lg font-bold text-slate-900">
                {initialData ? "Edit Student Record" : "Register New Student"}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setErrors({});
              setFormData(defaultFormState);
              onClose();
            }}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-200 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            aria-label="Close form"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-5 sm:p-6">
          {errors.server && (
            <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{errors.server}</span>
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
                Full Name *
              </label>
              <div className="relative">
                <UserRound className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={`w-full rounded-xl border bg-slate-50 py-2.5 pl-10 pr-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-4 ${
                    errors.fullName
                      ? "border-red-300 bg-red-50 focus:ring-red-100"
                      : "border-slate-200 focus:border-indigo-400 focus:ring-indigo-100"
                  }`}
                />
              </div>
              {errors.fullName && (
                <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john.doe@example.com"
                  className={`w-full rounded-xl border bg-slate-50 py-2.5 pl-10 pr-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-4 ${
                    errors.email
                      ? "border-red-300 bg-red-50 focus:ring-red-100"
                      : "border-slate-200 focus:border-indigo-400 focus:ring-indigo-100"
                  }`}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
                Enrollment Number *
              </label>
              <div className="relative">
                <Hash className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  name="enrollmentNumber"
                  value={formData.enrollmentNumber}
                  onChange={handleChange}
                  placeholder="EN20249988"
                  className={`w-full rounded-xl border bg-slate-50 py-2.5 pl-10 pr-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-4 ${
                    errors.enrollmentNumber
                      ? "border-red-300 bg-red-50 focus:ring-red-100"
                      : "border-slate-200 focus:border-indigo-400 focus:ring-indigo-100"
                  }`}
                />
              </div>
              {errors.enrollmentNumber && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.enrollmentNumber}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
                Phone Number *
              </label>
              <div className="relative">
                <Phone className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 987 654 3210"
                  className={`w-full rounded-xl border bg-slate-50 py-2.5 pl-10 pr-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-4 ${
                    errors.phone
                      ? "border-red-300 bg-red-50 focus:ring-red-100"
                      : "border-slate-200 focus:border-indigo-400 focus:ring-indigo-100"
                  }`}
                />
              </div>
              {errors.phone && (
                <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
                Age *
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="21"
                min="5"
                max="100"
                className={`w-full rounded-xl border bg-slate-50 px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-4 ${
                  errors.age
                    ? "border-red-300 bg-red-50 focus:ring-red-100"
                    : "border-slate-200 focus:border-indigo-400 focus:ring-indigo-100"
                }`}
              />
              {errors.age && (
                <p className="mt-1 text-xs text-red-500">{errors.age}</p>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
                Gender *
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className={`w-full rounded-xl border bg-slate-50 px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-4 ${
                  errors.gender
                    ? "border-red-300 bg-red-50 focus:ring-red-100"
                    : "border-slate-200 focus:border-indigo-400 focus:ring-indigo-100"
                }`}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && (
                <p className="mt-1 text-xs text-red-500">{errors.gender}</p>
              )}
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
              Course / Program *
            </label>
            <div className="relative">
              <BookOpen className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <input
                type="text"
                name="course"
                value={formData.course}
                onChange={handleChange}
                placeholder="Computer Science & Engineering"
                className={`w-full rounded-xl border bg-slate-50 py-2.5 pl-10 pr-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-4 ${
                  errors.course
                    ? "border-red-300 bg-red-50 focus:ring-red-100"
                    : "border-slate-200 focus:border-indigo-400 focus:ring-indigo-100"
                }`}
              />
            </div>
            {errors.course && (
              <p className="mt-1 text-xs text-red-500">{errors.course}</p>
            )}
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
              Address *
            </label>
            <div className="relative">
              <MapPin className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <textarea
                name="address"
                rows="3"
                value={formData.address}
                onChange={handleChange}
                placeholder="123 Academic Way, Suite 4B..."
                className={`w-full rounded-xl border bg-slate-50 py-2.5 pl-10 pr-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-4 ${
                  errors.address
                    ? "border-red-300 bg-red-50 focus:ring-red-100"
                    : "border-slate-200 focus:border-indigo-400 focus:ring-indigo-100"
                }`}
              ></textarea>
            </div>
            {errors.address && (
              <p className="mt-1 text-xs text-red-500">{errors.address}</p>
            )}
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-4 sm:flex-row sm:items-center sm:justify-end">
            <button
              type="button"
              onClick={() => {
                setErrors({});
                setFormData(defaultFormState);
                onClose();
              }}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Save className="h-4 w-4" />
              <span>
                {isSubmitting
                  ? "Saving..."
                  : initialData
                    ? "Update Student"
                    : "Save Student"}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentForm;
