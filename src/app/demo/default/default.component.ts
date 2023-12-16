// Angular Import
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

// Bootstrap Import
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';

// third party
import { ApexOptions, NgApexchartsModule } from 'ng-apexcharts';
import ApexCharts from 'apexcharts';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexResponsive,
  ApexXAxis,
  ApexGrid,
  ApexStroke,
  ApexTooltip
} from 'ng-apexcharts';
import {DashboardService} from "../../theme/shared/services/dashboard.service";
import {Subject, takeUntil} from "rxjs";


export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
  xaxis: ApexXAxis;
  colors: string[];
  grid: ApexGrid;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
};

export type ChartOptionsType = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels:  any;
  stroke: ApexStroke;
  fill: ApexFill;
};

export type ChartOptionsAge = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels:  any;
  stroke: ApexStroke;
  fill: ApexFill;
};

export type ChartOptionsGroup = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
};

@Component({
  selector: 'app-default',
  standalone: true,
  imports: [CommonModule, SharedModule, NgApexchartsModule],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export default class DefaultComponent implements OnInit{
  // private props
  @ViewChild('growthChart') growthChart: ChartComponent;
  chartOptions: Partial<ChartOptions>;
  @ViewChild('bajajchart') bajajchart: ChartComponent;
  chartOptions1: Partial<ChartOptions>;
  @ViewChild("chartType") chartType: ChartComponent;
  public chartOptionsType: Partial<ChartOptionsType>;
  @ViewChild("chartAge") chartAge: ChartComponent;
  public chartOptionsAge: Partial<ChartOptionsAge>;
  @ViewChild("chart") chart: ChartComponent;
  public chartOptionsGroup: Partial<ChartOptionsGroup>;

  monthChart: any;
  yearChart: any;
  totalAccounts: any;
  totalCustomers: any;
  totalTransactions: any;
  totalAmountTransactions: any;
  totalAvgTransactions: any;
  recentTransactions: any = [];
  bigRecentTransaction: any;
  colorChart = ['#673ab7'];

  tierAccount: any[];
  totalTierAccount: any[];

  distributionAge: any[];
  totaldistributionAge: any[];

  chartGithubIssues: ApexOptions = {};
  chartTaskDistribution: ApexOptions = {};
  chartBudgetDistribution: ApexOptions = {};
  chartWeeklyExpenses: ApexOptions = {};
  chartMonthlyExpenses: ApexOptions = {};
  chartYearlyExpenses: ApexOptions = {};
  data: any;
  selectedProject: string = 'ACME Corp. Backend App';
  private _unsubscribeAll: Subject<any> = new Subject<any>();


  // Constructor
  constructor( public dashboardService : DashboardService) {
    this.chartOptions = {
      series: [
        {
          name: 'Investment',
          data: [35, 125, 35, 35, 35, 80, 35, 20, 35, 45, 15, 75]
        },
        {
          name: 'Loss',
          data: [35, 15, 15, 35, 65, 40, 80, 25, 15, 85, 25, 75]
        },
        {
          name: 'Profit',
          data: [35, 145, 35, 35, 20, 105, 100, 10, 65, 45, 30, 10]
        },
        {
          name: 'Maintenance',
          data: [0, 0, 75, 0, 0, 115, 0, 0, 0, 0, 150, 0]
        }
      ],
      dataLabels: {
        enabled: false
      },
      chart: {
        type: 'bar',
        height: 480,
        stacked: true,
        toolbar: {
          show: true
        }
      },
      colors: ['#90caf9', '#1e88e5', '#673ab7', '#ede7f6'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0
            }
          }
        }
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '50%'
        }
      },
      xaxis: {
        type: 'category',
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      grid: {
        strokeDashArray: 4
      },
      tooltip: {
        theme: 'dark'
      }
    };
    this.chartOptions1 = {
      chart: {
        type: 'area',
        height: 95,
        stacked: true,
        sparkline: {
          enabled: true
        }
      },
      colors: ['#673ab7'],
      stroke: {
        curve: 'smooth',
        width: 1
      },

      series: [
        {
          data: [0, 15, 10, 50, 30, 40, 25]
        }
      ]
    };
    this.chartOptionsGroup = {
      series: [{
        name: "SAMPLE A",
        data: [
          [16.4, 5.4], [21.7, 2], [25.4, 3], [19, 2], [10.9, 1], [13.6, 3.2], [10.9, 7.4], [10.9, 0], [10.9, 8.2], [16.4, 0], [16.4, 1.8], [13.6, 0.3], [13.6, 0], [29.9, 0], [27.1, 2.3], [16.4, 0], [13.6, 3.7], [10.9, 5.2], [16.4, 6.5], [10.9, 0], [24.5, 7.1], [10.9, 0], [8.1, 4.7], [19, 0], [21.7, 1.8], [27.1, 0], [24.5, 0], [27.1, 0], [29.9, 1.5], [27.1, 0.8], [22.1, 2]]
      },{
        name: "SAMPLE B",
        data: [
          [36.4, 13.4], [1.7, 11], [5.4, 8], [9, 17], [1.9, 4], [3.6, 12.2], [1.9, 14.4], [1.9, 9], [1.9, 13.2], [1.4, 7], [6.4, 8.8], [3.6, 4.3], [1.6, 10], [9.9, 2], [7.1, 15], [1.4, 0], [3.6, 13.7], [1.9, 15.2], [6.4, 16.5], [0.9, 10], [4.5, 17.1], [10.9, 10], [0.1, 14.7], [9, 10], [12.7, 11.8], [2.1, 10], [2.5, 10], [27.1, 10], [2.9, 11.5], [7.1, 10.8], [2.1, 12]]
      },{
        name: "SAMPLE C",
        data: [
          [21.7, 3], [23.6, 3.5], [24.6, 3], [29.9, 3], [21.7, 20], [23, 2], [10.9, 3], [28, 4], [27.1, 0.3], [16.4, 4], [13.6, 0], [19, 5], [22.4, 3], [24.5, 3], [32.6, 3], [27.1, 4], [29.6, 6], [31.6, 8], [21.6, 5], [20.9, 4], [22.4, 0], [32.6, 10.3], [29.7, 20.8], [24.5, 0.8], [21.4, 0], [21.7, 6.9], [28.6, 7.7], [15.4, 0], [18.1, 0], [33.4, 0], [16.4, 0]]
      }],
      chart: {
        height: 350,
        type: 'scatter',
        zoom: {
          enabled: true,
          type: 'xy'
        }
      },
      xaxis: {
        tickAmount: 10,
        labels: {
          formatter: function(val) {
            return parseFloat(val).toFixed(1)
          }
        }
      },
      yaxis: {
        tickAmount: 7
      }
    };

  }

  splitArray(arr) {
    const ids = [];
    const counts = [];

    arr.forEach((item) => {
      ids.push(item._id);
      counts.push(item.count);
    });

    return { ids, counts };
  }

  groupByCode(){
    this.dashboardService.groupByCode().subscribe(
      response => {
        const values = Object.values(response);
        const test = response;
        console.log(values.length)
        for (const testElement of values) {
          console.log(testElement)
        }
      },
      error => {
        console.error(error);
      }
    )
  }

  getAllTotal(){
    this.dashboardService.getAllTotal().subscribe(
      response => {
        this.totalAccounts = response['total-account'];
        this.totalCustomers = response['total-customer'];
        this.totalTransactions = response['total-transaction'];
        this.totalAmountTransactions= response['total-amount-transaction'];
        this.totalAvgTransactions= response['average-amount-transaction'];
      },
      error => {
        console.error(error);
      }
    )
  }

  getRecentTransactions(){
    this.dashboardService.getRecentTransactions().subscribe(
      response => {
        this.recentTransactions = response;
        // Utilisation de reduce pour trouver la transaction avec le plus gros total
        this.bigRecentTransaction = this.recentTransactions.reduce((maxTotalTransaction, transaction) => {
          // Conversion des totaux en nombres pour la comparaison
          const maxTotal = parseFloat(maxTotalTransaction.transactions.total);
          const currentTotal = parseFloat(transaction.transactions.total);

          // Comparaison des totaux
          return currentTotal > maxTotal ? transaction : maxTotalTransaction;
        }, this.recentTransactions[0]);  // Initialisation avec la première transaction

      },
      error => {
        console.error(error);
      }
    )
  }

  getAccountByTier(){
    this.dashboardService.getAccountByTier().subscribe(
      response => {
        const { ids, counts } = this.splitArray(response);
        this.tierAccount = ids;
        this.totalTierAccount = counts
        this.chartOptionsType = {
          series: this.totalTierAccount,
          chart: {
            type: "polarArea"
          },
          stroke: {
            colors: ["#fff"]
          },
          fill: {
            opacity: 0.8
          },
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  position: "bottom"
                }
              }
            }
          ],
          labels: this.tierAccount,
        };
      },
      error => {
        console.error(error);
      }
    )
  }

  getCustomersByDate(){
    this.dashboardService.getCustomersByDate().subscribe(
      response => {
        const { ids, counts } = this.splitArray(response);
        this.distributionAge= ids;
        this.totaldistributionAge = counts;
        console.log(response)
        this.chartOptionsAge= {
          series: this.totaldistributionAge,
          chart: {
            type: "polarArea"
          },
          stroke: {
            colors: ["#fff"]
          },
          fill: {
            opacity: 0.8
          },
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  position: "bottom"
                }
              }
            }
          ],
          labels: this.distributionAge,
        };
      },
      error => {
        console.error(error);
      }
    )
  }

  // Life cycle events
  ngOnInit(): void {
    this.getAllTotal();
    this.getRecentTransactions();
    this.getAccountByTier();
    this.getCustomersByDate();
    this.groupByCode();

   /* setTimeout(() => {
      this.monthChart = new ApexCharts(document.querySelector('#tab-chart-1'), this.monthOptions);
      this.monthChart.render()
    }, 500);*/

  }

  // public Method
  onNavChange(changeEvent: NgbNavChangeEvent) {
    if (changeEvent.nextId === 1) {
      setTimeout(() => {
        this.monthChart = new ApexCharts(document.querySelector('#tab-chart-1'), this.monthOptions);
        this.monthChart.render();
      }, 200);
    }

    if (changeEvent.nextId === 2) {
      setTimeout(() => {
        this.yearChart = new ApexCharts(document.querySelector('#tab-chart-2'), this.yearOptions);
        this.yearChart.render();
      }, 200);
    }
  }

  ListGroup = [
    {
      name: 'Bajaj Finery',
      profit: '10% Profit',
      invest: '$1839.00',
      bgColor: 'bg-light-success',
      icon: 'ti ti-chevron-up',
      color: 'text-success'
    },
    {
      name: 'TTML',
      profit: '10% Loss',
      invest: '$100.00',
      bgColor: 'bg-light-danger',
      icon: 'ti ti-chevron-down',
      color: 'text-danger'
    },
    {
      name: 'Reliance',
      profit: '10% Profit',
      invest: '$200.00',
      bgColor: 'bg-light-success',
      icon: 'ti ti-chevron-up',
      color: 'text-success'
    },
    {
      name: 'ATGL',
      profit: '10% Loss',
      invest: '$189.00',
      bgColor: 'bg-light-danger',
      icon: 'ti ti-chevron-down',
      color: 'text-danger'
    },
    {
      name: 'Stolon',
      profit: '10% Profit',
      invest: '$210.00',
      bgColor: 'bg-light-success',
      icon: 'ti ti-chevron-up',
      color: 'text-success'
    }
  ];

  monthOptions = {
    chart: {
      type: 'line',
      height: 90,
      sparkline: {
        enabled: true
      }
    },
    dataLabels: {
      enabled: false
    },
    colors: ['#FFF'],
    stroke: {
      curve: 'smooth',
      width: 3
    },
    series: [
      {
        name: 'series1',
        data: [45, 66, 41, 89, 25, 44, 9, 54]
      }
    ],
    yaxis: {
      min: 5,
      max: 95
    },
    tooltip: {
      theme: 'dark',
      fixed: {
        enabled: false
      },
      x: {
        show: false
      },
      y: {
        title: {
          formatter: function (seriesName) {
            return 'Total Earning';
          }
        }
      },
      marker: {
        show: false
      }
    }
  };

  yearOptions = {
    chart: {
      type: 'line',
      height: 90,
      sparkline: {
        enabled: true
      }
    },
    dataLabels: {
      enabled: false
    },
    colors: ['#FFF'],
    stroke: {
      curve: 'smooth',
      width: 3
    },
    series: [
      {
        name: 'series1',
        data: [35, 44, 9, 54, 45, 66, 41, 69]
      }
    ],
    yaxis: {
      min: 5,
      max: 95
    },
    tooltip: {
      theme: 'dark',
      fixed: {
        enabled: false
      },
      x: {
        show: false
      },
      y: {
        title: {
          formatter: function (seriesName) {
            return 'Total Earning';
          }
        }
      },
      marker: {
        show: false
      }
    }
  };
  protected readonly parseFloat = parseFloat;

}
