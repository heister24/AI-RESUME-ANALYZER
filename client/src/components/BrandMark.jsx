import { FileSearch } from "lucide-react";
import { Link } from "react-router-dom";

const BrandMark = () => (
  <Link to="/" className="group flex cursor-pointer items-center gap-3 text-xl font-bold tracking-tight text-gray-900 transition-opacity hover:opacity-90">
    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 shadow-sm transition-transform group-hover:scale-105">
      <FileSearch className="h-5 w-5" />
    </div>
    <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
      ResumeLens
    </span>
  </Link>
);

export default BrandMark;