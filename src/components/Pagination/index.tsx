import "./style.scss";

interface Props {
  currentPage: number;
  pageNumbers: number[];
  paginate: { (pageNumber: number): void };
}

const Pagination = ({ currentPage, pageNumbers, paginate }: Props) => {
  return (
    <nav className="page-container">
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => paginate(number)}
          className={`page-item${
            number === currentPage ? " page-item--active" : ""
          }`}
        >
          {number}
        </button>
      ))}
    </nav>
  );
};

export default Pagination;
