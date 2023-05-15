import styles from "./SearchBar.module.css";

function SearchBar() {
  return (
    <div className={styles["search-container"]}>
      <input
        className={styles["search-bar"]}
        type="text"
        name="search"
        placeholder="Search..."
      />
    </div>
  );
}

export default SearchBar;
