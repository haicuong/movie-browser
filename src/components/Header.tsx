export default function Header({ children }: { children: React.ReactNode }) {
  return (
    <header className="bg-gray-200 sticky top-0 z-10 dark:bg-[#232323] items-center justify-between md:px-4 px-4 flex">
      <div className="flex items-center justify-center">
        <img src="/logo.webp" alt="Logo" className="w-10 hidden md:block" />
        <span className="text-xl font-bold md:p-4 py-4">Movie Browser</span>
      </div>
      {children}
    </header>
  );
}
