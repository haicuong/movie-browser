import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "@/components/ui/input-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip.tsx";
import { Button } from "@/components/ui/button";
import { Search, XIcon } from "lucide-react";

export default function SearchBar({
  searchQuery,
  onSearch,
}: {
  searchQuery: string;
  onSearch: (query: string) => void;
}) {
  return (
    <InputGroup className="h-full py-1 bg-gray-300 transition-none">
      <InputGroupAddon>
        <Search className="size-4" />
      </InputGroupAddon>
      <InputGroupInput
        onChange={(e) => onSearch(e.target.value)}
        value={searchQuery}
        type="text"
        placeholder="Search movies..."
      />
      <InputGroupAddon className="min-w-7" align="inline-end">
        {searchQuery && (
          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  onClick={() => onSearch("")}
                  variant="ghost"
                  className="h-fit px-1 hover:cursor-pointer"
                >
                  <XIcon className="size-4" />
                </Button>
              }
            />
            <TooltipContent>
              <p>Clear Search</p>
            </TooltipContent>
          </Tooltip>
        )}
      </InputGroupAddon>
    </InputGroup>
  );
}
