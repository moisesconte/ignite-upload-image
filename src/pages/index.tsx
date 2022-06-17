import { Button, Box, Text } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

export default function Home(): JSX.Element {
  const fetchImages = async ({ pageParam = null }) => {
    const response = await api.get(`/api/images`, {
      params: {
        after: pageParam,
      },
    });

    return response.data;
  };

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery('images', fetchImages, {
    getNextPageParam: lastPage => lastPage.after ?? null,
  });

  const formattedData = useMemo(() => {
    const dados = data?.pages.map(page => {
      return page.data;
    });

    return dados?.flat();
  }, [data]);

  // RENDER LOADING SCREEN
  if (isLoading) {
    return <Loading />;
  }

  // RENDER ERROR SCREEN
  if (isError) {
    return <Error />;
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {/* RENDER LOAD MORE BUTTON IF DATA HAS NEXT PAGE */}
        {hasNextPage && (
          <Button mt={12} onClick={() => fetchNextPage()}>
            <Text fontSize="16px">
              {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
            </Text>
          </Button>
        )}
      </Box>
    </>
  );
}
