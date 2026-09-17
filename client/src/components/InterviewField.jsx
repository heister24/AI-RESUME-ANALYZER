const InterviewField = ({ label, hint, value, onChange, placeholder, rows = 5 }) => (
  <label className="block text-sm font-medium text-[#18201d]">
    <span className="flex items-center justify-between gap-4">
      <span>{label}</span>
      <span className="font-normal text-[#8a968e]">{hint}</span>
    </span>
    <textarea
      className="mt-2 min-h-36 w-full resize-y rounded-xl border border-[#d9e0d9] bg-white px-4 py-3.5 leading-7 outline-none transition placeholder:text-[#a1aca5] focus:border-[#4d806c] focus:ring-4 focus:ring-[#d9edcf]"
      rows={rows}
      placeholder={placeholder}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      required
    />
    <span className="mt-2 block text-xs font-normal text-[#8a968e]">
      {value.trim().length} characters
    </span>
  </label>
);

export default InterviewField;