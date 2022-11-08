import FilterList from '../../../filtering/components/FilterList/FilterList';
import SearchBox from '../../../filtering/components/SearchBox/SearchBox';
import GuitarCardList from '../../../guitars/components/GuitarCardList/GuitarCardList';
import ResetButton from '../../../reset/components/ResetButton/ResetButton';
import CartOverflowToast from '../../../shoppingCart/components/CartOverflowToast/CartOverflowToast';
import ShoppingCart from '../../../shoppingCart/components/ShoppingCart/ShoppingCart';
import Sorter from '../../../sorting/components/Sorter/Sorter';

export default function Layout(): JSX.Element {
  return (
    <>
      <header>
        <div className="row py-4">
          <h1 className="display-5 col">Welcome to Guitar Heaven Shop!</h1>
          <div className="col-1 display-4 d-flex justify-content-end align-items-center">
            <ShoppingCart />
          </div>
        </div>
      </header>
      <main className="row">
        <aside className="col-3 col-xl-2 d-flex flex-column align-align-items-stretch">
          <FilterList />
          <ResetButton />
        </aside>
        <div className="col">
          <div className="row mb-3">
            <div className="col">
              <SearchBox />
            </div>
            <div className="col-6 col-xl-4 col-xxl-3">
              <Sorter />
            </div>
          </div>
          <GuitarCardList />
        </div>
      </main>
      <footer className="d-flex justify-content-between align-items-center py-3">
        <div className="author fw-bold">
          Github:&nbsp;
          <a href="https://github.com/malashonock" target="_blank" rel="noopener noreferrer">
            @malashonock
          </a>
          <p className="year">2022</p>
        </div>
        <div className="rs-school-logo">
          <a href="https://rs.school/js/" target="_blank" rel="noopener noreferrer">
            <img src="./img/rs_school_js.svg" alt="rs-school-logo" width="100" />
          </a>
        </div>
      </footer>
      <CartOverflowToast />
    </>
  );
}
