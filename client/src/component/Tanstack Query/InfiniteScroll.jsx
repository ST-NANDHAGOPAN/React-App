import React from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';

const fetchData = async ({ pageParam = 1 }) => {
  const response = await fetch(`https://675c03c59ce247eb19383e02.mockapi.io/infinite?page=${pageParam}&limit=5`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const InfiniteScroll = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(
    ['infiniteData'],
    fetchData,
    {
      getNextPageParam: (_, pages) => {
        return pages.length + 1;
      },
    }
  );

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'error') {
    return <div>Error fetching data</div>;
  }

  return (
    <div>
      {data.pages.map((page, pageIndex) => (
        <React.Fragment key={pageIndex}>
          {page.map((item) => (
            <div key={item.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <span>{item.name}</span>
            </div>
          ))}
        </React.Fragment>
      ))}
      <div>
        {hasNextPage ? (
          <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
            {isFetchingNextPage ? 'Loading more...' : 'Load More'}
          </button>
        ) : (
          <p>No more data to load</p>
        )}
      </div>
    </div>
  );
};

export default InfiniteScroll;
