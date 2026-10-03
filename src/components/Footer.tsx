export default function Footer() {
  return (
    <footer className="bg-secondary flex flex-col gap-8 p-8">
      <span className="font-bold text-xl">Credits</span>
      <div className="flex flex-row gap-4">
        <img src="/credits/TMDB.svg" alt="TMDB logo" className="h-6" />
        <p className="text-sm md:text-base">
          This product uses the TMDB API but is not endorsed or certified by
          TMDB.
        </p>
      </div>
      <a
        href="https://www.flaticon.com/free-icons/business-and-finance"
        title="business and finance icons"
        target="_blank"
        rel="noopener noreferrer"
      >
        Business and finance icons created by monkik - Flaticon
      </a>
    </footer>
  );
}
