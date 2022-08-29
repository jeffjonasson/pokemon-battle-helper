import React from "react";
import "./App.css";
import { capitalizeFirstChar } from "./helpers";

export const DefenseStats = ({ defenseStats }) => {
  const uniqueMultipliers = [...new Set(Object.values(defenseStats))].sort(
    function (a, b) {
      return b - a;
    }
  );

  const index = uniqueMultipliers.indexOf(1);

  if (index > -1) {
    uniqueMultipliers.splice(index, 1); // 2nd parameter means remove one item only
  }

  const getKeysByValue = (object, value) => {
    return Object.keys(object).filter((key) => object[key] === value);
  };

  const typeArrayFormatter = (typesArr) => {
    let typesString = "";
    typesArr.forEach((type) => {
      typesString = `${typesString}${capitalizeFirstChar(type)}, `;
    });
    return typesString.substring(0, typesString.length - 2);
  };

  return (
    <>
      {uniqueMultipliers.map((multiplier) => (
        <div key={multiplier} className="DefenseMultiplier">
          <div className="DefenseMultiplier-multi">
            Damaged{" "}
            <span
              className={`DefenseMultiplier-${multiplier
                .toString()
                .replaceAll(".", "")}`}
            >
              {multiplier}x{" "}
            </span>
            by:
          </div>
          <div className="DefenseMultiplier-types">
            {typeArrayFormatter(getKeysByValue(defenseStats, multiplier))}
          </div>
        </div>
      ))}
    </>
  );
};
