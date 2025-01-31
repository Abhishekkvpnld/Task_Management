const BoardCard = () => {
  return (
    <div className="w-full rounded-lg h-28 bg-white mt-4 flex flex-col justify-between p-3">
      <div className="flex items-center justify-between">
        <div>title</div>
        <div className="text-xs">icon</div>
      </div>
      <div className="flex items-center justify-between text-slate-500">
        <div className="text-xs">work</div>
        <div className="text-xs">31 jan 2025</div>
      </div>
    </div>
  );
};

export default BoardCard;
