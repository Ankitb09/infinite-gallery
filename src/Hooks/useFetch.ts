import { useEffect, useReducer } from "react";

enum ActionKind {
  start = "START",
  loaded = "LOADED",
  failed = "FAILED"
}

type State = {
  loading: boolean;
  hasMore: boolean;
  list: FlickerResp;
  error: string;
};

type Action =
  | { type: ActionKind.start }
  | {
      type: ActionKind.loaded;
      hasMore: boolean;
      list: FlickerResp;
      error: boolean;
      loading: boolean;
    }
  | { type: ActionKind.failed; error: string };

type FlickerResp = {
  farm: number;
  id: string;
  isfamily: number;
  isfriend: number;
  ispublic: number;
  owner: string;
  secret: string;
  server: string;
  title: string;
}[];

const initialState: State = {
  loading: false,
  hasMore: true,
  list: [],
  error: ""
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionKind.start:
      return { ...state, loading: true };
    case ActionKind.loaded:
      /*
       * This is needed because Flickr Api is
       * returning duplicate results for different pages
       */

      const list = [...state.list, ...action.list];
      const newList = list.filter(
        (v, i, a) => a.findIndex(t => t.id === v.id) === i
      );

      return {
        ...state,
        loading: false,
        list: newList,
        hasMore: true,
        error: ""
      };
    case ActionKind.failed:
      return { ...state, loading: false, error: action.error };
    default:
      throw new Error("Don't understand action");
  }
};

function useFetch(page: number) {
  const [states, dispatch] = useReducer(reducer, initialState);

  const { loading, list, hasMore, error } = states;

  useEffect(() => {
    const sendQuery = async () => {
      try {
        dispatch({ type: ActionKind.start });

        const resp = await fetch(
          `https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=92d56f1cd4360db8077638c68f82f2a8&extras=65081cc57f34597a&per_page=40&page=${page}&format=json&nojsoncallback=1`
        );

        const JSONResp = await resp.json();
        if (JSONResp.stat === "ok") {
          dispatch({
            type: ActionKind.loaded,
            hasMore: page <= JSONResp.photos.pages,
            loading: false,
            list: JSONResp.photos.photo,
            error: false
          });
        }

        if (JSONResp.stat === "fail") {
          dispatch({ type: ActionKind.failed, error: JSONResp.message });
        }
      } catch (err) {
        dispatch({ type: ActionKind.failed, error: err });
      }
    };

    sendQuery();
  }, [page]);

  return { loading, error, list, hasMore };
}

export default useFetch;
