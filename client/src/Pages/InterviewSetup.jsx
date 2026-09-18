import Navbar from "../components/Navbar";
import InterviewBriefForm from "../components/InterviewBriefForm";
import InterviewProgress from "../components/InterviewProgress";

const InterviewSetup = () => (
  <div className="min-h-screen bg-linear-to-br from-gray-50 via-gray-100 to-gray-200 text-gray-900 font-sans selection:bg-emerald-200 selection:text-emerald-900">
    <Navbar />
    <main className="mx-auto max-w-7xl px-6 py-12 sm:px-10 lg:py-20">
      <div className="mb-12">
        <div className="inline-flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white shadow-md shadow-emerald-600/20">
            1
          </span>
          <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
            Resume Analysis Setup
          </p>
        </div>
      </div>
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start xl:gap-12">
        <div className="sticky top-24">
          <InterviewProgress />
        </div>
        <div className="w-full">
          <InterviewBriefForm />
        </div>
      </div>
    </main>
  </div>
);

export default InterviewSetup;