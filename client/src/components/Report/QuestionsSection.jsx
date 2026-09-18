import { motion } from "framer-motion";
import QuestionCard from "./QuestionCard";

const QuestionsSection = ({
  title,
  subtitle,
  icon: Icon,
  iconBgClass = "bg-purple-100 text-purple-600",
  questions = [],
  color = "purple",
  delay = 0,
}) => {
  if (!questions || questions.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, x: 15 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl shadow-xs ${iconBgClass}`}
        >
          {Icon && <Icon className="h-5 w-5" />}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
        </div>
      </div>

      <div className="grid gap-4">
        {questions.map((q, idx) => (
          <QuestionCard key={idx} question={q} idx={idx} color={color} />
        ))}
      </div>
    </motion.section>
  );
};

export default QuestionsSection;
