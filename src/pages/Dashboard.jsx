
export default function Dashboard({
  reports = [],
  onCreateReport = () => {},
  onViewReport = () => {},
}) {
  const total = reports.length;
  const pending = reports.filter((report) => report.status === "Pending").length;
  const inProgress = reports.filter(
    (report) => report.status === "In Progress"
  ).length;
  const resolved = reports.filter((report) => report.status === "Resolved").length;

  const stats = [
    { label: "Total reports", value: total },
    { label: "Pending", value: pending },
    { label: "In progress", value: inProgress },
    { label: "Resolved", value: resolved },
  ];

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-teal-700">
            COMMUNITY OVERVIEW
          </p>
          <h2 className="mt-2 text-2xl font-bold">Your city, your voice.</h2>
          <p className="mt-2 text-sm text-slate-500">
            Monitor civic reports and neighborhood improvements.
          </p>
        </div>

        <button
          type="button"
          onClick={onCreateReport}
          className="rounded-xl bg-teal-700 px-5 py-3 text-sm font-semibold text-white hover:bg-teal-800"
        >
          Report an issue
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <article
            key={stat.label}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <p className="text-sm text-slate-500">{stat.label}</p>
            <p className="mt-3 text-3xl font-bold">{stat.value}</p>
          </article>
        ))}
      </div>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="border-b border-slate-100 p-5">
          <h3 className="font-bold">Recent reports</h3>
        </div>

        {reports.length === 0 ? (
          <p className="p-5 text-sm text-slate-500">
            No reports available yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="p-4">Report</th>
                  <th className="p-4">Location</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Details</th>
                </tr>
              </thead>
              <tbody>
                {reports.slice(0, 5).map((report) => (
                  <tr key={report.id} className="border-t border-slate-100">
                    <td className="p-4">
                      <p className="font-semibold">{report.title}</p>
                      <p className="mt-1 text-xs text-slate-500">
                        {report.id} · {report.category}
                      </p>
                    </td>
                    <td className="p-4">{report.location}</td>
                    <td className="p-4">{report.status}</td>
                    <td className="p-4">
                      <button
                        type="button"
                        onClick={() => onViewReport(report)}
                        className="font-semibold text-teal-700 hover:text-teal-900"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </section>
  );
}
