// src/configs/index.js
export const chartsConfig = {
    type: "bar",
    height: 240,
    options: {
      chart: {
        toolbar: { show: false },
      },
      responsive: [
        {
          breakpoint: 640,
          options: {
            chart: {
              height: 200,
            },
          },
        },
      ],
      xaxis: {
        categories: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
      },
    },
  };
  