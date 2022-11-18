import { FC, useState } from "react";
import { debounce } from "lodash";
import { useAppDispatch, useAppSelector } from "hook";
import { searchProducts } from "store/searchSlice";
import "./style.scss";

const Search: FC = () => {
  const [searchActive, setSearchActive] = useState(false);
  const dispatch = useAppDispatch();
  const searchResult = useAppSelector((state) => state.search.searchResult);
  const getProducts = debounce((value) => dispatch(searchProducts(value)), 250);

  const handleAction = (value: string) => {
    if (value.length > 2) {
      setSearchActive(true);
      getProducts(value);
    } else {
      setSearchActive(false);
    }
  };

  return (
    <div className="search-block">
      <input
        type="search"
        className="search-block__input"
        placeholder="Search"
        onChange={(event) =>
          handleAction((event.target as HTMLInputElement).value)
        }
      />
      <aside
        className={
          searchActive
            ? "search__dropdown search__dropdown_active"
            : "search__dropdown"
        }
      >
        <section className="search__section">
          {searchResult.length === 0 ? (
            <p>No products matching the request</p>
          ) : (
            searchResult.length &&
            searchResult.map((card) => (
              <a className="search__card" href="/#" key={card.id}>
                {card.name}
              </a>
            ))
          )}
        </section>
      </aside>
    </div>
  );
};

export default Search;
