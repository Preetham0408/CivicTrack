
export default function Home({
  onGetStarted = () => {},
  onViewDashboard = () => {},
}) {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4 sm:px-10">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-700 font-bold text-white">
            CT
          </div>
          <span className="text-xl font-bold">CivicTrack</span>
        </div>

        <button
          type="button"
          onClick={onGetStarted}
          className="rounded-xl bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-800"
        >
          Get started
        </button>
      </header>

      <section className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-20 md:grid-cols-2 md:px-10">
        <div>
          <p className="text-sm font-bold tracking-widest text-teal-700">
            BETTER CITIES, TOGETHER
          </p>
          <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
            Your city. Your voice. Real change.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-slate-600">
            Report local civic issues, follow their progress, and help make
            your neighborhood a better place for everyone.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onGetStarted}
              className="rounded-xl bg-teal-700 px-5 py-3 font-semibold text-white hover:bg-teal-800"
            >
              Report an issue
            </button>
            <button
              type="button"
              onClick={onViewDashboard}
              className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold hover:bg-slate-100"
            >
              View dashboard
            </button>
          </div>
        </div>

        <div className="rounded-3xl bg-slate-900 p-8 text-white shadow-xl sm:p-10">
          <p className="text-sm font-semibold text-teal-300">
            HOW CIVICTRACK WORKS
          </p>
          <div className="mt-6 space-y-6">
            <div>
              <p className="font-bold">01. Report</p>
              <p className="mt-1 text-sm leading-6 text-slate-300">
                Share the issue, its location, and useful details.
              </p>
            </div>
            <div>
              <p className="font-bold">02. Track</p>
              <p className="mt-1 text-sm leading-6 text-slate-300">
                Follow the report as its status changes.
              </p>
            </div>
            <div>
              <p className="font-bold">03. Improve</p>
              <p className="mt-1 text-sm leading-6 text-slate-300">
                Help your community work toward safer, cleaner neighborhoods.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
