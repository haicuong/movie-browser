export default function Footer() {
  return (
    <footer className="bg-secondary flex flex-col gap-8 p-8">
      <div className="flex flex-col gap-3">
        <h2 className="font-bold text-xl">Credits</h2>
        <div className="flex flex-row gap-4">
          <img src="/credits/TMDB.svg" alt="TMDB logo" className="h-6" />
          <p className="text-base">
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
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="font-bold text-xl">Disclaimer</h2>
        <p className="text-base">
          This is a personal project and not affiliated with any official
          organization.
        </p>
      </div>
    </footer>
  );
}
