// source taken from https://stackoverflow.com/a/63776262/17119295

import { MutableRefObject, useEffect, useRef } from 'react';

export default function useFirstRender(): boolean {
  const isFirstRender: MutableRefObject<boolean> = useRef(true);

  useEffect((): void => {
    isFirstRender.current = false;
  }, []);

  return isFirstRender.current;
}
