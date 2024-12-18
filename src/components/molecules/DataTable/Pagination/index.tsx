import React, {useMemo} from 'react';
import {MdArrowBack, MdArrowForward} from 'react-icons/md';
import ReactPaginate from 'react-paginate';

type PaginationProps = {
  page: number;
  setPage: (num: number) => void;
  pageSize: number;
  totalCount: number;
}

export function Pagination(props: PaginationProps) {
  const {page, pageSize, setPage, totalCount} = props;

  const pageCount = useMemo(() => Math.ceil(totalCount / pageSize), [pageSize, totalCount]);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="text-sm font-normal mb-1">
        {totalCount} sonuçtan {pageSize * (page - 1) + 1}-{pageSize * page} arasını görüntülüyorsunuz
      </div>
      <ReactPaginate
        className="flex flex-row items-center justify-center gap-x-5 w-full pt-5"
        breakLabel="..."
        onPageChange={(x) => setPage(x.selected + 1)}
        pageRangeDisplayed={3}
        forcePage={page - 1}
        marginPagesDisplayed={3}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
        pageLinkClassName="w-full h-full flex items-center justify-center"
        activeClassName="bg-gray-50 text-blue-900 cursor-default shadow-xl"
        pageClassName="h-10 w-10 flex items-center justify-center transition-all duration-200 cursor-pointer rounded-lg text-lg font-medium select-none"
        breakClassName="h-10 w-10 flex items-center justify-center transition-all duration-200 cursor-pointer rounded-lg text-lg font-medium select-none"
        previousLabel={
          <div className={`${page === 1 ? "cursor-default text-gray-500" : "cursor-pointer hover:bg-gray-200 group"} flex flex-row items-center p-2.5 rounded-lg select-none`}>
            <MdArrowBack className="group-hover:invert"/>
            <div className="ml-2 text-sm font-normal group-hover:invert">Önceki</div>
          </div>
        }
        nextLabel={
          <div className={`${page === pageCount ? "cursor-default text-gray-500" : "cursor-pointer hover:bg-gray-200 group"} flex flex-row items-center p-2.5 rounded-lg select-none`}>
            <div className="mr-2 text-sm font-normal group-hover:invert">Sonraki</div>
            <MdArrowForward className="group-hover:invert"/>
          </div>
        }
      />
    </div>
  );
}
