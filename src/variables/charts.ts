/*!

=========================================================
* Argon Dashboard React - v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Chart from "chart.js";
//
// Chart extension for making the bars rounded
// Code from: https://codepen.io/jedtrow/full/ygRYgo
//

var mode = "light"; //(themeMode) ? themeMode : 'light';
var fonts = {
  base: "Open Sans"
};

// Colors
var colors = {
  gray: {
    100: "#f6f9fc",
    200: "#e9ecef",
    300: "#dee2e6",
    400: "#ced4da",
    500: "#adb5bd",
    600: "#8898aa",
    700: "#525f7f",
    800: "#32325d",
    900: "#212529"
  },
  theme: {
    default: "#172b4d",
    primary: "#5e72e4",
    secondary: "#f4f5f7",
    info: "#11cdef",
    success: "#2dce89",
    danger: "#f5365c",
    warning: "#fb6340"
  },
  black: "#12263F",
  white: "#FFFFFF",
  transparent: "transparent"
};

// Methods

// Chart.js global options
function chartOptions() {
  // Options
  var options = {
    defaults: {
      global: {
        responsive: true,
        maintainAspectRatio: false,
        defaultColor: mode === "dark" ? colors.gray[700] : colors.gray[600],
        defaultFontColor: mode === "dark" ? colors.gray[700] : colors.gray[600],
        defaultFontFamily: fonts.base,
        defaultFontSize: 13,
        layout: {
          padding: 0
        },
        legend: {
          display: false,
          position: "bottom",
          labels: {
            usePointStyle: true,
            padding: 16
          }
        },
        elements: {
          point: {
            radius: 0,
            backgroundColor: colors.theme["primary"]
          },
          line: {
            tension: 0.4,
            borderWidth: 4,
            borderColor: colors.theme["primary"],
            backgroundColor: colors.transparent,
            borderCapStyle: "rounded"
          },
          rectangle: {
            backgroundColor: colors.theme["warning"]
          },
          arc: {
            backgroundColor: colors.theme["primary"],
            borderColor: mode === "dark" ? colors.gray[800] : colors.white,
            borderWidth: 4
          }
        },
        tooltips: {
          enabled: true,
          mode: "index",
          intersect: false
        }
      },
      doughnut: {
        cutoutPercentage: 83,
        legendCallback: function (chart: any) {
          var data = chart.data;
          var content = "";

          data.labels.forEach(function (label: any, index: number) {
            var bgColor = data.datasets[0].backgroundColor[index];

            content += '<span class="chart-legend-item">';
            content +=
              '<i class="chart-legend-indicator" style="background-color: ' +
              bgColor +
              '"></i>';
            content += label;
            content += "</span>";
          });

          return content;
        }
      }
    }
  };

  // yAxes
  Chart.scaleService.updateScaleDefaults("linear", {
    gridLines: {
      borderDash: [2],
      borderDashOffset: 2,
      color: mode === "dark" ? colors.gray[900] : colors.gray[300],
      drawBorder: false,
      drawTicks: false,
      lineWidth: 0,
      zeroLineWidth: 0,
      zeroLineColor: mode === "dark" ? colors.gray[900] : colors.gray[300],
      zeroLineBorderDash: [2],
      zeroLineBorderDashOffset: 2
    },
    ticks: {
      beginAtZero: true,
      padding: 10,
      callback: function (value: number) {
        if (!(value % 10)) {
          return value;
        }
      }
    }
  });

  // xAxes
  Chart.scaleService.updateScaleDefaults("category", {
    gridLines: {
      drawBorder: false,
      drawOnChartArea: false,
      drawTicks: false
    },
    ticks: {
      padding: 20
    }
  });

  return options;
}

// Parse global options
function parseOptions(parent: any, options: any) {
  for (var item in options) {
    if (typeof options[item] !== "object") {
      parent[item] = options[item];
    } else {
      parseOptions(parent[item], options[item]);
    }
  }
}

// Example 1 of Chart inside src/views/Index.js (Sales value - Card)
let chartExample1 = {
  options: {
    scales: {
      yAxes: [
        {
          gridLines: {
            color: colors.gray[900],
            zeroLineColor: colors.gray[900]
          },
          ticks: {
            callback: function (value: number) {
              if (!(value % 10)) {
                return "$" + value + "k";
              }
            }
          }
        }
      ]
    },
    tooltips: {
      callbacks: {
        label: function (item: any, data: any) {
          var label = data.datasets[item.datasetIndex].label || "";
          var yLabel = item.yLabel;
          var content = "";

          if (data.datasets.length > 1) {
            content += label;
          }

          content += "$" + yLabel + "k";
          return content;
        }
      }
    }
  },
  data1: (canvas: any) => {
    return {
      labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [
        {
          label: "Performance",
          data: [0, 20, 10, 30, 15, 40, 20, 60, 60]
        }
      ]
    };
  },
  data2: (canvas: any) => {
    return {
      labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [
        {
          label: "Performance",
          data: [0, 20, 5, 25, 10, 30, 15, 40, 40]
        }
      ]
    };
  }
};

// Example 2 of Chart inside src/views/Index.js (Total orders - Card)
let chartExample2 = {
  options: {
    scales: {
      yAxes: [
        {
          ticks: {
            callback: function (value: number) {
              if (!(value % 10)) {
                //return '$' + value + 'k'
                return value;
              }
            }
          }
        }
      ]
    },
    tooltips: {
      callbacks: {
        label: function (item: any, data: any) {
          var label = data.datasets[item.datasetIndex].label || "";
          var yLabel = item.yLabel;
          var content = "";
          if (data.datasets.length > 1) {
            content += label;
          }
          content += yLabel;
          return content;
        }
      }
    }
  },
  data: {
    labels: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Sales",
        data: [25, 20, 30, 22, 17, 29],
        maxBarThickness: 10
      }
    ]
  }
};

export {
  chartOptions, // used inside src/views/Index.js
  parseOptions, // used inside src/views/Index.js
  chartExample1, // used inside src/views/Index.js
  chartExample2 // used inside src/views/Index.js
};
