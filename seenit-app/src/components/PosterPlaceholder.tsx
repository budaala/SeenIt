const PosterPlaceholder = () => {
  return (
    <div className="w-full h-64 flex items-center justify-center bg-[#1a0b2e] text-gray-400 rounded">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-12 h-12 opacity-60"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3 5h18M3 19h18M3 5v14m18-14v14M8 11h.01M16 11h.01M12 15h.01"
        />
      </svg>
    </div>
  );
};

export default PosterPlaceholder;