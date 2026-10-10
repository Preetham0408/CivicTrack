
export default function CreateReport({
  onSubmit = () => {},
  onCancel = () => {},
  submitting = false,
}) {
  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    onSubmit({
      title: formData.get("title").trim(),
      category: formData.get("category"),
      location: formData.get("location").trim(),
      description: formData.get("description").trim(),
    });
  }

  return (
    <section className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <p className="text-sm font-semibold text-teal-700">
        COMMUNITY REPORTING
      </p>
      <h2 className="mt-2 text-2xl font-bold">Report a civic issue</h2>
      <p className="mt-2 text-sm text-slate-500">
        Share the details so the responsible team can investigate.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div>
          <label htmlFor="report-title" className="mb-2 block text-sm font-semibold">
            Issue title *
          </label>
          <input
            id="report-title"
            name="title"
            required
            maxLength={120}
            placeholder="e.g. Broken streetlight near the park"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="report-category" className="mb-2 block text-sm font-semibold">
              Category *
            </label>
            <select
              id="report-category"
              name="category"
              required
              defaultValue=""
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-teal-600"
            >
              <option value="" disabled>Select category</option>
              <option value="Roads">Roads</option>
              <option value="Electricity">Electricity</option>
              <option value="Water Supply">Water Supply</option>
              <option value="Sanitation">Sanitation</option>
              <option value="Drainage">Drainage</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="report-location" className="mb-2 block text-sm font-semibold">
              Location *
            </label>
            <input
              id="report-location"
              name="location"
              required
              maxLength={200}
              placeholder="Area or street"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-600"
            />
          </div>
        </div>

        <div>
          <label htmlFor="report-description" className="mb-2 block text-sm font-semibold">
            Description *
          </label>
          <textarea
            id="report-description"
            name="description"
            required
            maxLength={3000}
            minLength={10}
            rows={5}
            placeholder="Describe the issue and where it occurs..."
            className="w-full resize-y rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
          />
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            disabled={submitting}
            className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold hover:bg-slate-50 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="rounded-xl bg-teal-700 px-5 py-3 text-sm font-semibold text-white hover:bg-teal-800 disabled:opacity-50"
          >
            {submitting ? "Submitting..." : "Submit report"}
          </button>
        </div>
      </form>
    </section>
  );
}

