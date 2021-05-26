import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import SmartView from './smart.js';
import {STATISTICS_SETTINGS, STATISTICS_TITLES} from '../constants.js';
import {countPointsByTripType, getCostsByTripType, getDurationByTripType, getUniqueItems} from '../utils/statistics';
import {getFormatterDuration} from '../utils/date.js';

const renderMoneyChart = (moneyCtx, tripPoints) => {
  const pointsTypes = tripPoints.map((tripPoint) => tripPoint.type);
  const uniqueTypes = getUniqueItems(pointsTypes);
  const moneyByTypes = uniqueTypes.map((type) => getCostsByTripType(tripPoints, type));

  moneyCtx.height = uniqueTypes.length * STATISTICS_SETTINGS.barHeight;

  return new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: STATISTICS_SETTINGS.type,
    data: {
      labels: uniqueTypes,
      datasets: [{
        data: moneyByTypes,
        backgroundColor: STATISTICS_SETTINGS.backgroundColor,
        hoverBackgroundColor: STATISTICS_SETTINGS.hoverBackgroundColor,
        anchor: STATISTICS_SETTINGS.dataAnchor,
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: STATISTICS_SETTINGS.fontSize,
          },
          color: STATISTICS_SETTINGS.datalabelsColor,
          anchor: STATISTICS_SETTINGS.datalabelsAnchor,
          align: STATISTICS_SETTINGS.datalabelsAlign,
          formatter: (val) => `€ ${val}`,
        },
      },
      title: {
        display: true,
        text: STATISTICS_TITLES.MONEY,
        fontColor: STATISTICS_SETTINGS.fontColor,
        fontSize: STATISTICS_SETTINGS.titleFontSize,
        position: STATISTICS_SETTINGS.titlePosition,
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: STATISTICS_SETTINGS.fontColor,
            padding: STATISTICS_SETTINGS.padding,
            fontSize: STATISTICS_SETTINGS.fontSize,
            callback: (val) => `${val.toUpperCase()}`,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: STATISTICS_SETTINGS.barThickness,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          minBarLength: STATISTICS_SETTINGS.minBarLength,
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const renderChartByTripType = (typeCtx, tripPoints) => {
  const pointsTypes = tripPoints.map((tripPoint) => tripPoint.type);
  const uniqueTypes = getUniqueItems(pointsTypes);
  const pointsByTypeCounts = uniqueTypes.map((type) => countPointsByTripType(tripPoints, type));

  typeCtx.height = uniqueTypes.length * STATISTICS_SETTINGS.barHeight;

  return new Chart(typeCtx, {
    plugins: [ChartDataLabels],
    type: STATISTICS_SETTINGS.type,
    data: {
      labels: uniqueTypes,
      datasets: [{
        data: pointsByTypeCounts,
        backgroundColor: STATISTICS_SETTINGS.backgroundColor,
        hoverBackgroundColor: STATISTICS_SETTINGS.hoverBackgroundColor,
        anchor: STATISTICS_SETTINGS.dataAnchor,
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: STATISTICS_SETTINGS.fontSize,
          },
          color: STATISTICS_SETTINGS.datalabelsColor,
          anchor: STATISTICS_SETTINGS.datalabelsAnchor,
          align: STATISTICS_SETTINGS.datalabelsAlign,
          formatter: (val) => `${val}x`,
        },
      },
      title: {
        display: true,
        text: STATISTICS_TITLES.TYPE,
        fontColor: STATISTICS_SETTINGS.fontColor,
        fontSize: STATISTICS_SETTINGS.titleFontSize,
        position: STATISTICS_SETTINGS.titlePosition,
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: STATISTICS_SETTINGS.fontColor,
            padding: STATISTICS_SETTINGS.padding,
            fontSize: STATISTICS_SETTINGS.fontSize,
            callback: (val) => `${val.toUpperCase()}`,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: STATISTICS_SETTINGS.barThickness,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          minBarLength: STATISTICS_SETTINGS.minBarLength,
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const renderTimeChart = (timeCtx, tripPoints) => {
  const pointsTypes = tripPoints.map((tripPoint) => tripPoint.type);
  const uniqueTypes = getUniqueItems(pointsTypes);
  const durationsByTripTypes = uniqueTypes.map((type) => getDurationByTripType(tripPoints, type));

  timeCtx.height = uniqueTypes.length * STATISTICS_SETTINGS.barHeight;

  return new Chart(timeCtx, {
    plugins: [ChartDataLabels],
    type: STATISTICS_SETTINGS.type,
    data: {
      labels: uniqueTypes,
      datasets: [{
        data: durationsByTripTypes,
        backgroundColor: STATISTICS_SETTINGS.backgroundColor,
        hoverBackgroundColor: STATISTICS_SETTINGS.hoverBackgroundColor,
        anchor: STATISTICS_SETTINGS.dataAnchor,
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: STATISTICS_SETTINGS.fontSize,
          },
          color: STATISTICS_SETTINGS.datalabelsColor,
          anchor: STATISTICS_SETTINGS.datalabelsAnchor,
          align: STATISTICS_SETTINGS.datalabelsAlign,
          formatter: (val) => `${getFormatterDuration(val)}`,
        },
      },
      title: {
        display: true,
        text: STATISTICS_TITLES.TIME_SPENT,
        fontColor: STATISTICS_SETTINGS.fontColor,
        fontSize: STATISTICS_SETTINGS.titleFontSize,
        position: STATISTICS_SETTINGS.titlePosition,
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: STATISTICS_SETTINGS.fontColor,
            padding: STATISTICS_SETTINGS.padding,
            fontSize: STATISTICS_SETTINGS.fontSize,
            callback: (val) => `${val.toUpperCase()}`,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: STATISTICS_SETTINGS.barThickness,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          minBarLength: STATISTICS_SETTINGS.minBarLength,
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};


const createStatisticsTemplate = () => {
  return `<section class="statistics">
            <h2 class="visually-hidden">Trip statistics</h2>

            <div class="statistics__item statistics__item--money">
              <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
            </div>

            <div class="statistics__item statistics__item--transport">
              <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
            </div>

            <div class="statistics__item statistics__item--time-spend">
              <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
            </div>
          </section>`;
};

export default class Statistics extends SmartView {
  constructor(tripPoints) {
    super();

    this._tripPoints = tripPoints;
    this._moneyChart = null;
    this._typeChart = null;
    this._timeChart = null;

    this._setCharts();
  }

  removeElement() {
    super.removeElement();
  }

  getTemplate() {
    return createStatisticsTemplate();
  }

  restoreHandlers() {
    this._setCharts();
  }

  _setCharts() {
    if (this._moneyChart !== null || this._typeChart !== null || this._timeChart !== null) {
      this._moneyChart = null;
      this._typeChart = null;
      this._timeChart = null;
    }

    const moneyCtx = this.getElement().querySelector('.statistics__chart--money');
    const typeCtx = this.getElement().querySelector('.statistics__chart--transport');
    const timeCtx = this.getElement().querySelector('.statistics__chart--time');


    this._timeChart = renderTimeChart(timeCtx, this._tripPoints);
    this._moneyChart = renderMoneyChart(moneyCtx, this._tripPoints);
    this._typeChart = renderChartByTripType(typeCtx, this._tripPoints);
  }
}
