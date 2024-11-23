import React from "react";

const FechaComponent = ({ isoDate }) => {
  const dateObj = new Date(isoDate);

  // Formatear la fecha al estilo DIA/MES/AÑO hh:mm
  const formattedDate = dateObj.toLocaleString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return <p>Subido el: {formattedDate}</p>;
};

export default FechaComponent;