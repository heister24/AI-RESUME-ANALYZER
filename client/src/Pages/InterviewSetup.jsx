import Navbar from "../components/Navbar";
import InterviewBriefForm from "../components/InterviewBriefForm";

const InterviewSetup = () => (
  <div className="min-h-screen bg-[#EDE8F5] text-[#18203D] font-sans selection:bg-[#3D52A0] selection:text-white">
    <Navbar />

    <div className="relative overflow-hidden bg-grid-pattern">
      {/* Soft ambient atmospheric lighting in Foundations palette */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-[#7091E6]/15 blur-[150px]" />
      <div className="pointer-events-none absolute top-96 -right-20 h-[400px] w-[400px] rounded-full bg-[#ADBBDA]/25 blur-[140px]" />

      <main className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <InterviewBriefForm />
      </main>
    </div>
  </div>
);

export default InterviewSetup;