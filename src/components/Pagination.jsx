import ReactPaginate from "react-paginate";
import { PaginationWrapper } from "../assets/app.style";
import { MdArrowBackIos } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import PropTypes from "prop-types";

const Pagination = ({ pageCount, currentPage, action }) => {
  return (
    <PaginationWrapper>
      <ReactPaginate
        initialPage={currentPage - 1}
        pageCount={pageCount}
        nextLinkClassName="next-page"
        previousLinkClassName="previous-page"
        breakLabel="..."
        pageRangeDisplayed={1}
        className="pagination"
        pageClassName="page-link"
        activeClassName="active-page-link"
        nextLabel={<MdArrowForwardIos />}
        previousLabel={<MdArrowBackIos />}
        onClick={(e) => {
          console.log(e);

          if (
            (!e.isActive && e?.nextSelectedPage) ||
            (!e.isActive && e?.nextSelectedPage === 0)
          ) {
            console.log(e.nextSelectedPage);
            console.log("inside");
            action(e.nextSelectedPage + 1);

            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        }}
      />
    </PaginationWrapper>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number,
  pageCount: PropTypes.number,
  action: PropTypes.func,
};

export default Pagination;
