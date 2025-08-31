export default function LoaderMessage() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh]">
      <div className="animate-spin rounded-full border-4 border-yellow-400 border-t-transparent w-12 h-12 mb-4"></div>
      <p className="text-lg text-orange-600 font-semibold text-center px-4">
        Waking up our servers… If this page takes a moment, it's because we're on a free hosting plan.
      </p>
    </div>
  );
}
