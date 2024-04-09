import { Fragment } from "react";
import styles from "./Pagination.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetch_filter_product } from "../../../ReduxTool/Filters/FilterSlice";
const Pagination = () => {
  const buttons = [];

  const FilterData = useSelector((state: any) => state.ProductFilter.filterProducts)
  const page = useSelector((state: any) => state.ProductFilter.page)

  const dispatch = useDispatch();
  const totalPages = FilterData.data.pages;
  const handlePageClick = (pageNumber: number) => {
    dispatch(fetch_filter_product({ filterType: 'pagination', filterValue: { page: pageNumber } }));
  };
  for (let i = 0; i < totalPages; i++) {
    if (i === 0 || i === totalPages - 1 || (i >= page - 2 && i <= page + 1)) {
      buttons.push(
        <button
          key={i}
          className={styles.pagination_btn}
          style={{
            backgroundColor: page === i + 1 ? "#23A6F0" : "#FFF",
            color: page === i + 1 ? "white" : "#23A6F0",
          }}
          onClick={() => handlePageClick(i + 1)}
        >
          {i + 1}
        </button>
      );
    } else if (
      buttons.length > 0 &&
      buttons[buttons.length - 1].key !== "ellipsis"
    ) {
      buttons.push(
        <button
          key="ellipsis"
          className={styles.pagination_btn}
          style={{
            backgroundColor: "#FFF",
            color: "#23A6F0",
            cursor: "default",
          }}
          disabled
        >
          ...
        </button>
      );
    }
  }
  return (
    <Fragment>
      <div className={styles.pagination}>
        <div className={styles.container}>
          <button
            className={styles.pagination_btn}
            onClick={() => handlePageClick(1)}
            disabled={page === 1}
            style={{ color: page === 1 ? "#CCC" : "#23A6F0" }}
          >
            First
          </button>
          {buttons}
          <button
            className={styles.pagination_btn}
            onClick={() => handlePageClick(page + 1)}
            disabled={page === totalPages}
            style={{ color: page === totalPages ? "#CCC" : "#23A6F0" }}
          >
            Next
          </button>
        </div>
      </div>
    </Fragment>
  );
};
export default Pagination;







