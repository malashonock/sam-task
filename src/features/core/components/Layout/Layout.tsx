import FilterList from 'features/filtering/components/FilterList/FilterList';
import SearchBox from 'features/filtering/components/SearchBox/SearchBox';
import GuitarCardList from 'features/guitars/components/GuitarCardList/GuitarCardList';
import ResetButton from 'features/reset/components/ResetButton/ResetButton';
import CartOverflowToast from 'features/shoppingCart/components/CartOverflowToast/CartOverflowToast';
import Checkout from 'features/shoppingCart/components/Checkout/Checkout';
import Sorter from 'features/sorting/components/Sorter/Sorter';
import styles from './Layout.module.scss';

export default function Layout(): JSX.Element {
  return (
    <>
      <header>
        <div className="row py-4">
          <h1 className="display-5 col text-center">Welcome to Guitar Heaven Shop!</h1>
        </div>
      </header>
      <main className="row">
        <aside className="col-3 col-xl-2 d-flex flex-column align-items-stretch">
          <FilterList />
          <ResetButton />
        </aside>
        <div className="col">
          <div className="row mb-3 d-flex flex-sm-column flex-xl-row">
            <div className="col">
              <SearchBox />
            </div>
            <div className="col col-xl-6 col-xl-4 col-xxl-3">
              <Sorter />
            </div>
          </div>
          <GuitarCardList />
        </div>
        <aside className="col-3 col-xl-2 d-flex flex-column p-3">
          <Checkout />
        </aside>
      </main>
      <footer className="d-flex justify-content-between align-items-center py-3">
        <div className="author fw-bold">
          Github:&nbsp;
          <a href="https://github.com/malashonock" target="_blank" rel="noopener noreferrer">
            @malashonock
          </a>
          <p className="year">2022</p>
        </div>
        <div className="logo">
          <a href="https://sam-solutions.by/" target="_blank" rel="noopener noreferrer">
            <img
              className={styles.logo__img}
              src="./img/sam-logo.svg"
              alt="sam-solutions-logo"
              width="100"
            />
          </a>
        </div>
      </footer>
      <CartOverflowToast />
    </>
  );
}
