import React, { useState, useRef, useEffect, useCallback } from "react";
import Loader from "../Loader/index";
import useFetch from "../../Hooks/useFetch";
import * as S from "./style";

const Cards = () => {
  const [page, setPage] = useState(1);
  const [favorties, setFavorties] = useState<string[]>([]);
  const { loading, error, list, hasMore } = useFetch(page);
  const loaderElem = useRef<HTMLDivElement>(null!);

  const handleObserver = useCallback(
    entries => {
      const target = entries[0];
      if (target.isIntersecting && hasMore) {
        setPage(prev => prev + 1);
      }
    },
    [hasMore]
  );

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "100px",
      threshold: 1
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loaderElem.current) observer.observe(loaderElem.current);
  }, [handleObserver]);

  const handleFavorites = (id: string) => {
    const favroiteIds: string[] = JSON.parse(
      localStorage.getItem("favorties") || "[]"
    );

    if (favroiteIds && favroiteIds.length) {
      if (favroiteIds.includes(id)) {
        const filteredFav = favroiteIds.filter((item: string) => item !== id);
        localStorage.setItem("favorties", JSON.stringify(filteredFav));
        setFavorties(filteredFav);
      } else {
        const newFavIds = [...favroiteIds, id];
        localStorage.setItem("favorties", JSON.stringify(newFavIds));
        setFavorties(newFavIds);
      }
    } else {
      localStorage.setItem("favorties", JSON.stringify([id]));
      setFavorties([id]);
    }
  };

  return (
    <S.Container>
      <S.List>
        {list.map(item => (
          <S.ListItem key={item.id}>
            <S.Image
              src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_z.jpg`}
              alt="ddd"
            />
            <S.Overlay>
              <div>
                {item.title ? (
                  <S.OverlayTitle>${item.title}</S.OverlayTitle>
                ) : null}
                <span>{item.owner}</span>
              </div>

              <button onClick={() => handleFavorites(item.id)}>
                {favorties.includes(item.id) ? "Unfavourite" : "Favourite"}
              </button>
            </S.Overlay>
          </S.ListItem>
        ))}
      </S.List>

      <div
        ref={loaderElem}
        style={{
          height: "10px"
        }}
      />
      {loading && (
        <S.LoderContainer>
          <Loader size={30} />
        </S.LoderContainer>
      )}
      {error && <p>{error}</p>}
    </S.Container>
  );
};

export default Cards;
