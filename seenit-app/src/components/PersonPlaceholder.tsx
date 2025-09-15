const PersonPlaceholder = () => {
  return (
    <div className="w-20 h-30 rounded-lg shadow-lg object-cover flex items-center justify-center bg-[#1a0b2e] text-gray-400">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-16 h-16 opacity-60"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
      </svg>
    </div>
  );
};

export default PersonPlaceholder;
