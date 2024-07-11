import '@mantine/carousel/styles.css';
import { Hero, TopRatedMovies } from '@/features/app/components/landing/Hero';
import { Discover } from '@/features/app/components/landing/Discover';
import { fetchPopularAndTopMovies } from '@/features/app/action';

export default async function Page() {
  const { popular, topRated } = await fetchPopularAndTopMovies();

  return (
    <>
      <Hero movies={popular} />
      <TopRatedMovies movies={topRated} />
      <Discover />
    </>
  );
}
