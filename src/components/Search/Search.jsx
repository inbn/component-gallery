import { h } from "preact";
import { useState, useRef, useEffect } from "preact/hooks";
import "./Search.css";

const Search = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [pagefind, setPagefind] = useState(null);
  const [selectedItemIndex, setSelectedItemIndex] = useState(-1);
  const [isArrowKeyNavigation, setIsArrowKeyNavigation] = useState(false);
  const buttonRef = useRef(null);
  const searchInputRef = useRef(null);
  const dialogRef = useRef(null);
  const selectedItemRef = useRef(null);
  const modifierKey =
    typeof navigator !== "undefined" &&
    /Mac|iPod|iPhone|iPad/.test(navigator.platform)
      ? "command"
      : "control";

  const handleFocus = async () => {
    if (!pagefind) {
      const pf = await import("/pagefind/pagefind.js");
      pf.init();
      setPagefind(pf);
    }
  };

  const handleSearch = async (event) => {
    const query = event.target.value.trim();
    if (!pagefind || !query) {
      setSearchResults([]);
      return;
    }

    const searchResponse = await pagefind.debouncedSearch(query, {}, 300);
    if (searchResponse?.results && searchInputRef.current.value.trim() !== "") {
      const data = await Promise.all(
        searchResponse.results.map((result) => result.data()),
      );
      setSearchResults(data);
      setSelectedItemIndex(0);
    } else {
      setSearchResults([]);
    }
  };

  const handleKeyDown = (event) => {
    if (event.target.id !== "search-input") {
      return;
    }

    switch (event.code) {
      case "ArrowUp":
        event.preventDefault();
        setIsArrowKeyNavigation(true);
        setSelectedItemIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : searchResults.length - 1,
        );
        break;

      case "ArrowDown":
        event.preventDefault();
        setIsArrowKeyNavigation(true);
        setSelectedItemIndex((prevIndex) =>
          prevIndex < searchResults.length - 1 ? prevIndex + 1 : 0,
        );
        break;

      case "Enter":
        if (searchResults.length) {
          const selectedResult = searchResults[selectedItemIndex];
          if (selectedResult) {
            window.location.href = selectedResult.url;
          }
        }
        break;

      case "Escape":
        dialogRef.current.close();
        setSelectedItemIndex(-1);
        break;

      // case "Tab":
      //   dialogRef.current.close();
      //   break;

      default:
    }
  };

  const handleGlobalKeyDown = (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === "k") {
      event.preventDefault();
      if (dialogRef.current.open) {
        dialogRef.current.close();
      } else {
        dialogRef.current.showModal();
      }
    }
  };

  const handleClose = () => {
    searchInputRef.current.value = "";
    buttonRef.current.focus();
    setSearchResults([]);
  };

  // Only scroll into view if navigating with arrow keys
  useEffect(() => {
    if (isArrowKeyNavigation && selectedItemRef.current) {
      selectedItemRef.current.scrollIntoView({
        block: "nearest",
        inline: "nearest",
      });
      setIsArrowKeyNavigation(false);
    }
  }, [selectedItemIndex]);

  useEffect(() => {
    document.addEventListener("keydown", handleGlobalKeyDown);
    return () => {
      document.removeEventListener("keydown", handleGlobalKeyDown);
    };
  }, []);

  return (
    <>
      {/* Search toggle */}
      <button
        type="button"
        class="search-button uppercase tracking-wide variable-font-wdth-83 text-base flex items-center gap-2 bg-transparent hover:bg-background-secondary duration-200 rounded-lg p-3 sm:p-2 relative"
        onClick={() => dialogRef.current.showModal()}
        ref={buttonRef}
      >
        <span class="sr-only sm:not-sr-only leading-6">Search</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          class="size-4"
        >
          <path
            fill-rule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clip-rule="evenodd"
          />
        </svg>

        <span class="gap-0.5 hidden md:flex">
          <kbd aria-label={modifierKey} class="min-w-4 font-sans">
            <span className="control">^</span>
            <span className="command">⌘</span>
          </kbd>
          <kbd class="min-w-4 font-sans">K</kbd>
        </span>
      </button>

      {/* Search dialog */}
      <dialog
        ref={dialogRef}
        class="search-dialog"
        onClose={handleClose}
        onClick={(e) => {
          console.log(e.target);
          // Close dialog when clicking outside of it
          if (dialogRef.current && e.target === dialogRef.current) {
            dialogRef.current.close();
          }
        }}
      >
        <div class="search-container">
          {/* Input */}
          <div
            role="combobox"
            aria-expanded={!!searchResults.length}
            aria-owns="search-results-listbox"
            aria-haspopup="listbox"
            class="search-combobox"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="search-icon"
              aria-hidden="true"
            >
              <circle
                cx="11.5"
                cy="11.5"
                r="3.75"
                stroke="currentColor"
                stroke-width="1.5"
              />
              <path
                d="M16.1603 18.4634C16.4162 18.7891 16.8877 18.8456 17.2134 18.5897C17.5391 18.3338 17.5956 17.8623 17.3397 17.5366L16.1603 18.4634ZM17.3397 17.5366L14.5897 14.0366L13.4103 14.9634L16.1603 18.4634L17.3397 17.5366Z"
                fill="currentColor"
              />
            </svg>
            <input
              id="search-input"
              type="text"
              placeholder="Search components and design systems…"
              onFocus={handleFocus}
              onInput={handleSearch}
              onKeyDown={handleKeyDown}
              class="search-input variable-font-wdth-90 text-base"
              ref={searchInputRef}
              aria-autocomplete="list"
              aria-controls="search-results-listbox"
              aria-activedescendant={
                !!searchResults.length ? `result-item-${selectedItemIndex}` : ""
              }
            />
            <button
              type="button"
              class="search-close"
              onClick={() => {
                dialogRef.current.close();
                handleClose();
              }}
            >
              <kbd>Esc</kbd>
            </button>
          </div>
          {/* Results */}
          <ol
            id="search-results-listbox"
            class="search-results variable-font-wdth-90"
            role="listbox"
            hidden={!searchResults.length}
          >
            {searchResults.map((result, i) => (
              <li
                key={result.url}
                id={`result-item-${i}`}
                role="option"
                aria-selected={i === selectedItemIndex}
                ref={i === selectedItemIndex ? selectedItemRef : null}
                class="search-result"
                onClick={() => (window.location.href = result.url)}
                onMouseOver={() => setSelectedItemIndex(i)}
              >
                <p
                  dangerouslySetInnerHTML={{ __html: result.excerpt }}
                  class="mt-2"
                ></p>
                <div className="flex justify-between items-baseline gap-2">
                  <p class="text-lg font-serif leading-tight">
                    {result.meta.title}
                  </p>
                  <span class="px-1.5 py-1 text-sm variable-font-wdth-90 leading-none border border-dotted rounded shrink-0 relative -right-2">
                    {result.url.startsWith("/components/")
                      ? "Component"
                      : result.url.startsWith("/design-systems/")
                        ? "Design system"
                        : ""}
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </dialog>
    </>
  );
};

export default Search;
