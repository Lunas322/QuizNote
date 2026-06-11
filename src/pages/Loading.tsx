function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500"></div>

        <p className="text-lg font-medium text-gray-600">
          로딩 중...
        </p>
      </div>
    </div>
  );
}

export default Loading