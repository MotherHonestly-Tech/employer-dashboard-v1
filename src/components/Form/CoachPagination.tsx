import React, { Fragment } from "react";

type PaginationProps = {
  totalPosts: number;
  postsPerPage: number;
  currentPage: number;
  pages?: number;
  onClick?: (e: React.MouseEvent) => void;
  onClicks?: (e: React.MouseEvent) => void;
  onClicked?: (e: React.MouseEvent) => void;
};

const CoachPagination = (props: PaginationProps) => {
  let pages = [];
  for (let i = 1; i <= Math.ceil(props.totalPosts / props.postsPerPage); i++) {
    pages.push(i);
  }

  let divider = props.totalPosts / props.postsPerPage;

  return (
    <Fragment>
      <div className="flex mx-auto place-content-center !h-auto py-4 float-right">
        <div className="my-5  px-2 text-[12px] font-areaSemi">Page</div>

        {props.currentPage === 1 ? (
          <div className=" my-4 ">
            <a
              aria-disabled="true"
              className="  hover:text-gray-300 hover:no-underline text-gray-300 text-base"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                />
              </svg>
            </a>
          </div>
        ) : (
          <div className=" my-4 ">
            <a
              className="text-gray-700  text-base hover:no-underline cursor-pointer"
              onClick={props.onClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                />
              </svg>
            </a>
          </div>
        )}
        <div className=" my-5 ring-1 ring-ash-100 mx-2 px-2 text-[12px] font-areaSemi">
          {props.currentPage}
        </div>

        {props.currentPage >= divider ? (
          <div className="my-4 ">
            <a
              aria-disabled="true"
              className="  hover:text-gray-300 hover:no-underline text-gray-300 text-base"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </a>
          </div>
        ) : (
          <div className="my-4 ">
            <a
              className="text-gray-700  hover:no-underline text-base cursor-pointer"
              onClick={props.onClicked}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </a>
          </div>
        )}

        <div className="my-5  px-2 text-[12px] font-areaSemi">
          of {pages.length}
        </div>
      </div>
    </Fragment>
  );
};

export default CoachPagination;
