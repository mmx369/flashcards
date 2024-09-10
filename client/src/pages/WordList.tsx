import { useEffect, useState } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import { useGetCurrentLanguage } from '../hooks/useGetCurrentLanguage';
import DictionaryService from '../services/DictionaryService';
import { IWord } from '../models/IWord';
import { WordCard } from './WordCard';
import PaginationComponent from '../components/Pagination/Pagination';

function WordList() {
  const { currentLanguage } = useGetCurrentLanguage();
  const [wordsList, setWordsList] = useState<IWord[]>([]);
  const [totalWords, setTotalWords] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  useEffect(() => {
    async function getDictionaryList(lng: string) {
      setLoading(true);
      setError(null);
      try {
        const response = await DictionaryService.fetchWordsPagination(
          lng,
          currentPage.toString()
        );
        const { words, totalWords } = response.data;
        setWordsList(words);
        setTotalWords(totalWords);
      } catch {
        setError('Failed to fetch words.');
      } finally {
        setLoading(false);
      }
    }
    getDictionaryList(currentLanguage);
  }, [currentLanguage, currentPage]);

  const handlePageChange = (selectedPage: number) => {
    setCurrentPage(selectedPage);
  };

  if (loading) {
    return <RotatingLines width='50' />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h3>Words Dictionary</h3>
      <PaginationComponent
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={totalWords}
        onPageChange={handlePageChange}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignContent: 'center',
        }}
      >
        {wordsList.map((el) => (
          <WordCard key={el._id} {...el} />
        ))}
        <PaginationComponent
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={totalWords}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default WordList;
