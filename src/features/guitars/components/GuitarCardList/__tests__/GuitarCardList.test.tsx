import { render } from '@testing-library/react';
import TestApp from '../../../../../mockdata/TestApp';
import mockGuitarRepositoryFactory from '../../../../../mockdata/mockGuitarRepositoryFactory';
import GuitarCardList from '../GuitarCardList';
import mockGuitars from '../../../../../mockdata/mockGuitars';
import mockGuitarFilters from '../../../../../mockdata/mockGuitarFilters';

describe('GuitarCardList component', () => {
  describe('given no guitars available in repository', () => {
    it('renders "Loading guitars..." message', () => {
      const { container: guitarCardList } = render(
        <TestApp>
          <GuitarCardList />
        </TestApp>
      );

      expect(guitarCardList).toHaveTextContent('Loading guitars...');
    });
  });

  describe('given some guitars available in repository, but all filtered out', () => {
    it('renders "No guitars found matching the selected criteria." message', () => {
      const { container: guitarCardList } = render(
        <TestApp
          mockRepository={mockGuitarRepositoryFactory(mockGuitars.severalGuitars)}
          mockFilters={mockGuitarFilters.missingBrandSelected}
        >
          <GuitarCardList />
        </TestApp>
      );

      expect(guitarCardList).toHaveTextContent('No guitars found matching the selected criteria.');
    });
  });

  describe('given 3 guitars available in repository and no filters', () => {
    it('renders 3 GuitarCard components', () => {
      const testGuitars = mockGuitars.severalGuitars;

      const { container: guitarCardList } = render(
        <TestApp mockRepository={mockGuitarRepositoryFactory(testGuitars)}>
          <GuitarCardList />
        </TestApp>
      );

      const guitarCards = guitarCardList.querySelectorAll('.card');
      expect(guitarCards.length).toBe(testGuitars.length);
    });
  });
});
