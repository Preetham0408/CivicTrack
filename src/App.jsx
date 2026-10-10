
import { useState } from "react";
import Login from "./pages/Login";
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  MapPin,
  Bell,
  Search,
  Menu,
  Clock3,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
} from "lucide-react";

const initialReports = [
  {
    id: "CT-1024",
    title: "Broken streetlight",
    category: "Electricity",
    location: "Anna Nagar",
    status: "In Progress",
    date: "Oct 10, 2026",
  },
  {
    id: "CT-1023",
    title: "Road damage near junction",
    category: "Roads",
    location: "T. Nagar",
    status: "Pending",
    date: "Oct 9, 2026",
  },
  {
    id: "CT-1022",
    title: "Garbage collection missed",
    category: "Sanitation",
    location: "Velachery",
    status: "Resolved",
    date: "Oct 8, 2026",
  },
  {
    id: "CT-1021",
    title: "Water leakage",
    category: "Water Supply",
    location: "Adyar",
    status: "In Progress",
    date: "Oct 7, 2026",
  },
];

const stats = [
  {
    label: "Total reports",
    value: "128",
    note: "All submitted reports",
    icon: FileText,
    color: "bg-blue-50 text-blue-700",
  },
  {
    label: "Pending",
    value: "24",
    note: "Awaiting action",
    icon: Clock3,
    color: "bg-amber-50 text-amber-700",
  },
  {
    label: "In progress",
    value: "36",
    note: "Being addressed",
    icon: AlertCircle,
    color: "bg-teal-50 text-teal-700",
  },
  {
    label: "Resolved",
    value: "68",
    note: "Successfully completed",
    icon: CheckCircle2,
    color: "bg-emerald-50 text-emerald-700",
  },
];

function App() {
  const [activePage, setActivePage] = useState("Dashboard");
const [showLogin, setShowLogin] = useState(true);
  const [search, setSearch] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [reports, setReports] = useState(initialReports);

  const navigation = [
    { label: "Dashboard", icon: LayoutDashboard },
    { label: "All Reports", icon: FileText },
    { label: "Report an Issue", icon: PlusCircle },
  ];

  const filteredReports = reports.filter((report) =>
    `${report.title} ${report.category} ${report.location} ${report.id}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  function openPage(page) {
    setActivePage(page);
    setMobileMenu(false);
  }

  if (showLogin) {
  return <Login />;
}

return (
  <div className="min-h-screen bg-slate-50 text-slate-900">
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-slate-950 text-white transition-transform md:translate-x-0 ${
          mobileMenu ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-20 items-center gap-3 border-b border-white/10 px-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-400 text-slate-950">
            <MapPin size={23} />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">CivicTrack</h1>
            <p className="text-xs text-slate-400">Better cities, together.</p>
          </div>
        </div>

        <div className="px-4 pt-7">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
            Workspace
          </p>
          <nav className="space-y-1">
            {navigation.map(({ label, icon: Icon }) => (
              <button
                key={label}
                onClick={() => openPage(label)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition ${
                  activePage === label
                    ? "bg-teal-400 text-slate-950"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon size={19} />
                {label}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto border-t border-white/10 p-5">
          <div className="rounded-xl bg-white/5 p-4">
            <p className="text-sm font-semibold">Have an issue?</p>
            <p className="mt-1 text-xs leading-5 text-slate-400">
              Help improve your neighborhood by reporting civic problems.
            </p>
            <button
              onClick={() => openPage("Report an Issue")}
              className="mt-3 w-full rounded-lg bg-teal-400 px-3 py-2 text-sm font-semibold text-slate-950 hover:bg-teal-300"
            >
              Create report
            </button>
          </div>
        </div>
      </aside>

      {mobileMenu && (
        <button
          aria-label="Close navigation"
          onClick={() => setMobileMenu(false)}
          className="fixed inset-0 z-30 bg-slate-950/40 md:hidden"
        />
      )}

      <div className="min-h-screen md:ml-64">
        <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              aria-label="Toggle navigation"
              className="rounded-lg p-2 hover:bg-slate-100 md:hidden"
            >
              <Menu size={22} />
            </button>
            <div>
              <p className="text-xs font-medium text-slate-500">
                CivicTrack / Workspace
              </p>
              <h2 className="text-lg font-bold sm:text-xl">{activePage}</h2>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-slate-500 sm:block">
              Citizen portal
            </span>
            <button
              aria-label="Notifications"
              className="relative rounded-xl border border-slate-200 p-2.5 hover:bg-slate-50"
            >
              <Bell size={19} />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-teal-500" />
            </button>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 text-sm font-bold text-teal-800">
              CT
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-7xl p-4 sm:p-8">
          {activePage === "Dashboard" && (
            <>
              <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                  <p className="text-sm font-medium text-teal-700">
                    COMMUNITY OVERVIEW
                  </p>
                  <h3 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                    Your city, your voice.
                  </h3>
                  <p className="mt-2 text-sm text-slate-500 sm:text-base">
                    Monitor civic reports and track neighborhood improvements.
                  </p>
                </div>
                <button
                  onClick={() => openPage("Report an Issue")}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-700 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-teal-800"
                >
                  <PlusCircle size={18} />
                  Report an issue
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map(({ label, value, note, icon: Icon, color }) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <div className="flex items-start justify-between">
                      <p className="text-sm font-medium text-slate-500">
                        {label}
                      </p>
                      <div className={`rounded-xl p-2.5 ${color}`}>
                        <Icon size={20} />
                      </div>
                    </div>
                    <p className="mt-4 text-3xl font-bold tracking-tight">
                      {value}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">{note}</p>
                  </div>
                ))}
              </div>

              <section className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="flex flex-col justify-between gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:p-6">
                  <div>
                    <h4 className="text-lg font-bold">Recent reports</h4>
                    <p className="mt-1 text-sm text-slate-500">
                      Track the latest community submissions.
                    </p>
                  </div>
                  <label className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 sm:w-72">
                    <Search size={18} className="shrink-0 text-slate-400" />
                    <input
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                      placeholder="Search reports..."
                      className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                    />
                  </label>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[700px] text-left text-sm">
                    <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                      <tr>
                        <th className="px-6 py-4 font-semibold">Report</th>
                        <th className="px-6 py-4 font-semibold">Location</th>
                        <th className="px-6 py-4 font-semibold">Date</th>
                        <th className="px-6 py-4 font-semibold">Status</th>
                        <th className="px-6 py-4 font-semibold">Details</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredReports.map((report) => (
                        <tr key={report.id} className="hover:bg-slate-50">
                          <td className="px-6 py-4">
                            <p className="font-semibold text-slate-800">
                              {report.title}
                            </p>
                            <p className="mt-1 text-xs text-slate-500">
                              {report.id} · {report.category}
                            </p>
                          </td>
                          <td className="px-6 py-4 text-slate-600">
                            {report.location}
                          </td>
                          <td className="px-6 py-4 text-slate-600">
                            {report.date}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                                report.status === "Resolved"
                                  ? "bg-emerald-50 text-emerald-700"
                                  : report.status === "Pending"
                                    ? "bg-amber-50 text-amber-700"
                                    : "bg-blue-50 text-blue-700"
                              }`}
                            >
                              {report.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => openPage("Report Details")}
                              className="inline-flex items-center gap-1 font-semibold text-teal-700 hover:text-teal-900"
                            >
                              View <ArrowUpRight size={15} />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {filteredReports.length === 0 && (
                        <tr>
                          <td
                            colSpan={5}
                            className="px-6 py-10 text-center text-slate-500"
                          >
                            No reports match your search.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="border-t border-slate-100 px-6 py-4 text-xs text-slate-500">
                  Demonstration data · Connect the backend before presenting
                    these as live statistics.
                </div>
              </section>
            </>
          )}

          {activePage === "Report an Issue" && (
            <section className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <p className="text-sm font-semibold text-teal-700">
                COMMUNITY REPORTING
              </p>
              <h3 className="mt-2 text-2xl font-bold">Report a civic issue</h3>
              <p className="mt-2 text-sm text-slate-500">
                Share the details so the responsible team can investigate.
              </p>

              <form
                className="mt-8 space-y-5"
                onSubmit={(event) => {
  event.preventDefault();

  const form = event.currentTarget;
  const formData = new FormData(form);

  const newReport = {
    id: `CT-${1021 + reports.length}`,
    title: formData.get("title").trim(),
    category: formData.get("category"),
    location: formData.get("location").trim(),
    description: formData.get("description").trim(),
    status: "Pending",
    date: new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
  };

  setReports((currentReports) => [
    newReport,
    ...currentReports,
  ]);

  form.reset();
  alert("Report submitted successfully!");
  openPage("Dashboard");
}}
              >
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Issue title *
                  </label>
                  <input
                    name="title"
                    required
                    placeholder="e.g. Broken streetlight near the park"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold">
                      Category *
                    </label>
                    <select
                      name="category"
                      required
                      defaultValue=""
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-teal-600"
                    >
                      <option value="" disabled>
                        Select category
                      </option>
                      <option>Roads</option>
                      <option>Electricity</option>
                      <option>Water Supply</option>
                      <option>Sanitation</option>
                      <option>Drainage</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold">
                      Location *
                    </label>
                    <input
                      name="location"
                      required
                      placeholder="Area or street"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    required
                    rows={5}
                    placeholder="Describe the issue and where it occurs..."
                    className="w-full resize-y rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                  />
                </div>

                <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={() => openPage("Dashboard")}
                    className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-teal-700 px-5 py-3 text-sm font-semibold text-white hover:bg-teal-800"
                  >
                    Submit report
                  </button>
                </div>
              </form>
            </section>
          )}

          {activePage === "All Reports" && (
            <section className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="text-xl font-bold">All reports</h3>
              <p className="mt-2 text-sm text-slate-500">
                {filteredReports.length} demonstration reports available.
              </p>
              <div className="mt-5 space-y-3">
                {filteredReports.map((report) => (
                  <div
                    key={report.id}
                    className="flex flex-col justify-between gap-3 rounded-xl border border-slate-200 p-4 sm:flex-row sm:items-center"
                  >
                    <div>
                      <p className="font-semibold">{report.title}</p>
                      <p className="mt-1 text-sm text-slate-500">
                        {report.id} · {report.location} · {report.category}
                      </p>
                    </div>
                    <span className="text-sm font-medium">{report.status}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {activePage === "Report Details" && (
            <section className="max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
              <button
                onClick={() => openPage("Dashboard")}
                className="text-sm font-semibold text-teal-700"
              >
                ← Back to dashboard
              </button>
              <h3 className="mt-6 text-2xl font-bold">Report details</h3>
              <p className="mt-2 text-sm text-slate-500">
                Select a report from the dashboard once report-specific
                navigation is connected.
              </p>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
