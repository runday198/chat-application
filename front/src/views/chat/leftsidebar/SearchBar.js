import styles from "./SearchBar.module.css";

function SearchBar(props) {
  return (
    <div className={styles["search-container"]}>
      <input
        className={styles["search-bar"]}
        type="text"
        name="search"
        placeholder="Search..."
        onChange={(event) => props.setSearchTerm(event.target.value)}
      />
    </div>
  );
}

export default SearchBar;
