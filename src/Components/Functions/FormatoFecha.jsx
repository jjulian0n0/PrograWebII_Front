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

  return <h4>Subido el: {formattedDate}</h4>;
};

export default FechaComponent;