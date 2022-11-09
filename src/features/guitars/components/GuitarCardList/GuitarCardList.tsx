import { useContext, useEffect, useMemo, useReducer } from 'react';
import GuitarContext from '../../model/GuitarContext';
import FilterContext, { FiltersState } from '../../../filtering/model/FilterContext';
import SortingContext, { SortingState } from '../../../sorting/model/SortingContext';
import Guitar from '../../model/Guitar';
import GuitarRepository from '../../model/GuitarRepository';
import { guitarListReducer } from '../../model/GuitarListReducer';
import GuitarCard from '../GuitarCard/GuitarCard';

export default function GuitarCardList(): JSX.Element {
  const guitarRepository: GuitarRepository = useContext(GuitarContext) as GuitarRepository;

  const guitars: Guitar[] = useMemo(
    () => guitarRepository.guitars || [],
    [guitarRepository.guitars]
  );

  const { filters }: FiltersState = useContext(FilterContext) as FiltersState;
  const { sorting }: SortingState = useContext(SortingContext) as SortingState;

  const [guitarList, dispatchGuitarListAction] = useReducer(guitarListReducer, guitars);

  useEffect(() => {
    dispatchGuitarListAction({ type: 'update', guitarState: { guitars, filters, sorting } });
  }, [guitars, filters, sorting]);

  let content;

  if (guitars.length === 0) {
    content = <p>Loading guitars...</p>;
  } else if (guitarList.length === 0) {
    content = <p>No guitars found matching the selected criteria.</p>;
  } else {
    content = guitarList.map((guitar) => <GuitarCard guitar={guitar} key={guitar.model} />);
  }

  return (
    <div className="col gap-3 d-flex flex-row flex-wrap justify-content-center">{content}</div>
  );
}
