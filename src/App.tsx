import Header from "@/components/Header";
import { Outlet } from "react-router";
import SearchBar from "@/components/SearchBar";
import Footer from "@/components/Footer";
import useSearchQuery from "@/hooks/useSearchQuery";
import SearchResults from "@/components/SearchResults";
import HomeMovies from "@/components/HomeMovies";
import RouteNotFound from "./components/RouteNotFound";

export default function App({ notFound }: { notFound?: boolean }) {
  const { searchState, setSearchState, searchQuery, urlQuery } =
    useSearchQuery();

  const hasSearchQuery = searchState.trim().length > 0;

  return (
    <>
      <Header>
        <SearchBar searchQuery={searchState} onSearch={setSearchState} />
      </Header>
      <main className="flex min-h-0 flex-1 flex-col py-4 pb-8 overflow-x-hidden bg-background px-4 sm:px-6 justify-center">
        <div className="relative min-h-0 justify-center flex-1 p-4">
          {hasSearchQuery ? (
            <SearchResults
              searchState={searchState}
              searchQuery={searchQuery}
              urlQuery={urlQuery}
            />
          ) : notFound ? (
            <RouteNotFound />
          ) : (
            <HomeMovies />
          )}
        </div>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
