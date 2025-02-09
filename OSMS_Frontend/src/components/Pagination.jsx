import React from "react";
import { Button } from "react-bootstrap";

const Pagination = ({ currentPage, totalPages, onPrevious, onNext }) => {
  return (
    <div className="d-flex justify-content-center align-items-center mx-auto">
      <Button
        style={{ marginTop: "8px" }}
        variant="secondary"
        onClick={onPrevious}
        disabled={currentPage === 1}
        className="mx-3"
      >
        ⪻
      </Button>
      <span>
        {currentPage} of {totalPages}
      </span>
      <Button
        style={{ marginTop: "8px" }}
        variant="secondary"
        onClick={onNext}
        disabled={currentPage === totalPages}
        className="mx-3"
      >
        ⪼
      </Button>
    </div>
  );
};

export default Pagination;
