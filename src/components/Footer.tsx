export default function Footer() {
  return (
    <footer className="bg-secondary flex flex-col gap-8 p-8">
      <div className="flex flex-col gap-3">
        <h2 className="font-bold text-xl">Author</h2>
        <address className="flex flex-col">
          <span className="font-bold">Nguyen Hai Cuong</span>
          <span>
            Github:
            <a
              className="text-blue-500"
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/haicuong"
            >
              @haicuong
            </a>
          </span>
          <br />
          <span>Contact for work</span>
          <span>
            Email:
            <a className="text-blue-500" href="mailto:haicuong.work@gmail.com">
              haicuong.work@gmail.com
            </a>
          </span>
        </address>
      </div>
      <div className="flex flex-col gap-3">
        <h2 className="font-bold text-xl">Credits</h2>
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
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="font-bold text-xl">Disclaimer</h2>
        <p className="text-sm md:text-base">
          This is a personal project and not affiliated with any official
          organization.
        </p>
      </div>
    </footer>
  );
}
