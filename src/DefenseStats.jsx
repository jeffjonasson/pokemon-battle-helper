import React from "react";

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

  function getKeysByValue(object, value) {
    return Object.keys(object).filter((key) => object[key] === value);
  }

  return (
    <>
      {uniqueMultipliers.map((multiplier) => (
        <p>
          <div>Damaged {multiplier}x by:</div>
          <div>{getKeysByValue(defenseStats, multiplier).toString()}</div>
        </p>
      ))}
    </>
  );
};
