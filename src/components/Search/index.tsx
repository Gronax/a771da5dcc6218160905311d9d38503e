import "./style.scss";

interface Props {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search = ({ value, onChange }: Props) => {
  return (
    <div className="search-container">
      <input
        type="search"
        placeholder="Search..."
        value={value}
        onChange={onChange}
        className="search"
      />
    </div>
  );
};

export default Search;
