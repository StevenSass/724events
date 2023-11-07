import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
  // inversion des evtA et evtB
    new Date(evtB.date) < new Date(evtA.date) ? -1 : 1
  );
  const nextCard = () => {
    // ajout -1 a la ligne 17 pour ne pas avoir d'image undefined
    setTimeout(
      () => setIndex(index < (byDateDesc.length || 0) -1 ? index + 1 : 0),
      5000
    );
  };
  useEffect(() => {
    nextCard();
  });
  
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div key={event.title}>
        <div className={`SlideCard SlideCard--${ index === idx ? "display" : "hide"}`}>
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc?.map((event, radioIdx) => (
            <input
              key={event.title}
              type="radio"
              name="radio-button"
              // modification par index pour les dots si il sont checked ou non
              // modification de checked par defautChecked
              defaultChecked={radioIdx === index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;