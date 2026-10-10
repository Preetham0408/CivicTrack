
export default function ReportDetails({
  report = null,
  onBack = () => {},
  onUpdateStatus = () => {},
}) {
  if (!report) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
        <h2 className="text-xl font-bold text-slate-900">
          No report selected
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Choose a report from the dashboard to view its details.
        </p>
        <button
          type="button"
          onClick={onBack}
          className="mt-5 rounded-xl bg-teal-700 px-5 py-3 text-sm font-semibold text-white hover:bg-teal-800"
        >
          Back to dashboard
        </button>
      </section>
    );
  }

  const status = report.status || "Pending";
  const statusStyles = {
    Pending: "bg-amber-100 text-amber-800",
    "In Progress": "bg-blue-100 text-blue-800",
    Resolved: "bg-emerald-100 text-emerald-800",
  };

  return (
    <section className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <button
        type="button"
        onClick={onBack}
        className="text-sm font-semibold text-teal-700 hover:text-teal-900"
      >
        ← Back to dashboard
      </button>

      <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-teal-700">
            REPORT DETAILS
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            {report.title || "Untitled report"}
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Report ID: {report.id ?? "Not assigned"}
          </p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            statusStyles[status] || "bg-slate-100 text-slate-700"
          }`}
        >
          {status}
        </span>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Category
          </p>
          <p className="mt-2 font-semibold text-slate-900">
            {report.category || "Not specified"}
          </p>
        </div>

        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Location
          </p>
          <p className="mt-2 font-semibold text-slate-900">
            {report.location || "Not specified"}
          </p>
        </div>
      </div>

      <div className="mt-5">
        <h3 className="font-semibold text-slate-900">Description</h3>
        <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-slate-600">
          {report.description || "No description provided."}
        </p>
      </div>

      <div className="mt-8 border-t border-slate-100 pt-6">
        <label
          htmlFor="report-status"
          className="mb-2 block text-sm font-semibold text-slate-900"
        >
          Update report status
        </label>
        <div className="flex flex-col gap-3 sm:flex-row">
          <select
            id="report-status"
            value={status}
            onChange={(event) =>
              onUpdateStatus(report.id, event.target.value)
            }
            className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-teal-600"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
          <button
            type="button"
            onClick={onBack}
            className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold hover:bg-slate-50"
          >
            Done
          </button>
        </div>
        <p className="mt-2 text-xs text-slate-500">
          Status changes are passed to the parent component. Backend saving
          will be connected during integration.
        </p>
      </div>
    </section>
  );
}
