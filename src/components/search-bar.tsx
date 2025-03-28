import { FilterDropdown } from "./filter-dropdown";
import { ListViewToggle } from "./list-view-toggle";
import { SearchInput } from "./search-input";

export const SearchBar = () => {
  return (
    <div className="flex gap-2">
      <SearchInput />
      <FilterDropdown />
      <ListViewToggle />
    </div>
  );
};
