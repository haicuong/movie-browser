import Header from "@/components/Header";
import { Outlet } from "react-router";
import SearchBar from "@/components/SearchBar";
import Footer from "@/components/Footer";
import useSearchQuery from "@/hooks/useSearchQuery";
import SearchResults from "@/components/SearchResults";
import HomeMovies from "@/components/HomeMovies";

export default function App() {
  const { searchState, setSearchState, searchQuery, urlQuery } =
    useSearchQuery();

  const hasSearchQuery = searchState.trim().length > 0;

  return (
    <>
      <Header>
        <SearchBar searchQuery={searchState} onSearch={setSearchState} />
      </Header>
      <main className="flex flex-col h-full py-4 pb-8 overflow-x-hidden bg-background px-4 md:px-6 justify-center flex-1">
        <div className="relative flex-1 p-4">
          {hasSearchQuery ? (
            <SearchResults
              searchState={searchState}
              searchQuery={searchQuery}
              urlQuery={urlQuery}
            />
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
