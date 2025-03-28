import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { toggleAnimation } from 'src/app/shared/animations';
import { CommonModule } from '@angular/common';
import { IconModule } from 'src/app/shared/icon/icon.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MenuModule } from 'headlessui-angular';
import { Router } from '@angular/router';
import * as Gauge from 'gaugeJS';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    NgApexchartsModule,
    MenuModule,
    IconModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [toggleAnimation],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('gauge1') gauge1Canvas!: ElementRef;
  
  store: any;
  revenueChart: any;
  salesByCategory: any;
  dailySales: any;
  totalOrders: any;
  gaugeChart1: any;
  gauge1: any;
  isLoading = true;
  
  // Valores del medidor
  valorActual = 12000;
  valorMaximo = 20000;
  valorMinimo = 0;
  
  constructor(
    public storeData: Store<any>,
    private router: Router
  ) {
    this.initStore();
    this.isLoading = false;
  }

  ngOnInit() {
    // Forzar la activación del dropdown de Caddy al cargar este componente
    setTimeout(() => {
      const caddyDropdown = document.querySelector('button[data-dropdown-name="caddy"]');
      if (caddyDropdown && !caddyDropdown.classList.contains('active')) {
        (caddyDropdown as HTMLElement).click();
      }
      
      // Aseguramos que el dropdown de Dashboard no esté activo
      const dashboardDropdown = document.querySelector('button[data-dropdown-name="dashboard"]');
      if (dashboardDropdown && dashboardDropdown.classList.contains('active')) {
        (dashboardDropdown as HTMLElement).click();
      }
    }, 200);
    
    // Inicialización de los gráficos
    this.initCharts();
  }

  ngAfterViewInit() {
    // Inicializar el tacómetro de GaugeJS
    this.initGauges();
  }

  initGauges() {
    // Configuración del tacómetro estilo profesional
    const opts1 = {
      angle: -0.2,
      lineWidth: 0.3,
      radiusScale: 0.65,
      pointer: {
        length: 0.6,
        strokeWidth: 0.06,
        color: '#FFF',
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowOffsetY: 3,
        shadowOffsetX: 0,
        shadowBlur: 5
      },
      limitMax: false,
      limitMin: false,
      colorStart: '#FF5252',
      colorStop: '#37D159',
      strokeColor: '#1E1E2D',
      generateGradient: false,
      highDpiSupport: true,
      renderTicks: {
        divisions: 5,
        divWidth: 1,
        divLength: 0.5,
        divColor: '#FFFFFF',
        subDivisions: 3,
        subWidth: 0.5,
        subLength: 0.2,
        subColor: '#AAAAAA'
      },
      staticLabels: {
        font: "9px sans-serif",
        labels: [20, 40, 60, 80],
        color: "#FFFFFF",
        fractionDigits: 0
      },
      staticZones: [
        {min: 0, max: 30, color: "#FF5252", strokeStyle: "#FF5252"},
        {min: 30, max: 40, color: "#FBBC05", strokeStyle: "#FBBC05"},
        {min: 40, max: 70, color: "#37D159", strokeStyle: "#37D159"},
        {min: 70, max: 100, color: "#37D159", strokeStyle: "#37D159"},
      ],
      valueBox: {
        enabled: false
      }
    };
    
    // Inicializar el tacómetro
    if (this.gauge1Canvas) {
      const target1 = this.gauge1Canvas.nativeElement;
      this.gauge1 = new Gauge.Gauge(target1).setOptions(opts1);
      this.gauge1.maxValue = 100;
      this.gauge1.setMinValue(0);
      this.gauge1.animationSpeed = 32;
      this.gauge1.set(60);
    }
  }

  async initStore() {
    this.storeData
      .select((d) => d.index)
      .subscribe((d) => {
        const hasChangeTheme = this.store?.theme !== d?.theme;
        const hasChangeLayout = this.store?.layout !== d?.layout;
        const hasChangeMenu = this.store?.menu !== d?.menu;
        const hasChangeSidebar = this.store?.sidebar !== d?.sidebar;

        this.store = d;

        if (hasChangeTheme || hasChangeLayout || hasChangeMenu || hasChangeSidebar) {
          if (this.isLoading || hasChangeTheme) {
            this.initCharts(); //init charts
          } else {
            setTimeout(() => {
              this.initCharts(); // refresh charts
            }, 300);
          }
        }
      });
  }

  initCharts() {
    const isDark = this.store && (this.store.theme === 'dark' || this.store.isDarkMode) ? true : false;
    const isRtl = this.store.rtlClass === 'rtl' ? true : false;

    // revenue
    this.revenueChart = {
      chart: {
        height: 325,
        type: 'area',
        fontFamily: 'Nunito, sans-serif',
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        curve: 'smooth',
        width: 2,
        lineCap: 'square',
      },
      dropShadow: {
        enabled: true,
        opacity: 0.2,
        blur: 10,
        left: -7,
        top: 22,
      },
      colors: isDark ? ['#2196f3', '#e7515a'] : ['#1b55e2', '#e7515a'],
      markers: {
        discrete: [
          {
            seriesIndex: 0,
            dataPointIndex: 6,
            fillColor: '#1b55e2',
            strokeColor: 'transparent',
            size: 7,
          },
          {
            seriesIndex: 1,
            dataPointIndex: 5,
            fillColor: '#e7515a',
            strokeColor: 'transparent',
            size: 7,
          },
        ],
      },
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      xaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          show: true,
        },
        labels: {
          offsetX: isRtl ? 2 : 0,
          offsetY: 5,
          style: {
            fontSize: '12px',
            cssClass: 'apexcharts-xaxis-title',
          },
        },
      },
      yaxis: {
        tickAmount: 7,
        labels: {
          formatter: (value: number) => {
            return value / 1000 + 'K';
          },
          offsetX: isRtl ? -30 : -10,
          offsetY: 0,
          style: {
            fontSize: '12px',
            cssClass: 'apexcharts-yaxis-title',
          },
        },
        opposite: isRtl ? true : false,
      },
      grid: {
        borderColor: isDark ? '#191e3a' : '#e0e6ed',
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        yaxis: {
          lines: {
            show: false,
          },
        },
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        },
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        fontSize: '16px',
        markers: {
          width: 10,
          height: 10,
          offsetX: -2,
        },
        itemMargin: {
          horizontal: 10,
          vertical: 5,
        },
      },
      tooltip: {
        marker: {
          show: true,
        },
        x: {
          show: false,
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          inverseColors: !1,
          opacityFrom: isDark ? 0.19 : 0.28,
          opacityTo: 0.05,
          stops: isDark ? [100, 100] : [45, 100],
        },
      },
      series: [
        {
          name: 'Income',
          data: [16800, 16800, 15500, 17800, 15500, 17000, 19000, 16000, 15000, 17000, 14000, 17000],
        },
        {
          name: 'Expenses',
          data: [16500, 17500, 16200, 17300, 16000, 19500, 16000, 17000, 16000, 19000, 18000, 19000],
        },
      ],
    };

    // sales by category
    this.salesByCategory = {
      chart: {
        type: 'donut',
        height: 460,
        fontFamily: 'Nunito, sans-serif',
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 25,
        colors: isDark ? '#0e1726' : '#fff',
      },
      colors: isDark ? ['#5c1ac3', '#e2a03f', '#e7515a', '#e2a03f'] : ['#e2a03f', '#5c1ac3', '#e7515a'],
      legend: {
        position: 'bottom',
        horizontalAlign: 'center',
        fontSize: '14px',
        markers: {
          width: 10,
          height: 10,
          offsetX: -2,
        },
        height: 50,
        offsetY: 20,
      },
      plotOptions: {
        pie: {
          donut: {
            size: '65%',
            background: 'transparent',
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: '29px',
                offsetY: -10,
              },
              value: {
                show: true,
                fontSize: '26px',
                color: isDark ? '#bfc9d4' : undefined,
                offsetY: 16,
                formatter: (val: any) => {
                  return val;
                },
              },
              total: {
                show: true,
                label: 'Total',
                color: '#888ea8',
                fontSize: '29px',
                formatter: (w: any) => {
                  return w.globals.seriesTotals.reduce(function (a: any, b: any) {
                    return a + b;
                  }, 0);
                },
              },
            },
          },
        },
      },
      labels: ['Apparel', 'Sports', 'Others'],
      states: {
        hover: {
          filter: {
            type: 'none',
            value: 0.15,
          },
        },
        active: {
          filter: {
            type: 'none',
            value: 0.15,
          },
        },
      },
      series: [985, 737, 270],
    };

    // daily sales
    this.dailySales = {
      chart: {
        height: 160,
        type: 'bar',
        fontFamily: 'Nunito, sans-serif',
        toolbar: {
          show: false,
        },
        stacked: true,
        stackType: '100%',
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 1,
      },
      colors: ['#e2a03f', '#e0e6ed'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      xaxis: {
        labels: {
          show: false,
        },
        categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'],
      },
      yaxis: {
        show: false,
      },
      fill: {
        opacity: 1,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '25%',
        },
      },
      legend: {
        show: false,
      },
      grid: {
        show: false,
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        },
      },
      series: [
        {
          name: 'Sales',
          data: [44, 55, 41, 67, 22, 43, 21],
        },
        {
          name: 'Last Week',
          data: [13, 23, 20, 8, 13, 27, 33],
        },
      ],
    };

    // total orders
    this.totalOrders = {
      chart: {
        height: 290,
        type: 'area',
        fontFamily: 'Nunito, sans-serif',
        sparkline: {
          enabled: true,
        },
      },
      stroke: {
        curve: 'smooth',
        width: 2,
      },
      colors: isDark ? ['#00ab55'] : ['#00ab55'],
      labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      yaxis: {
        min: 0,
        show: false,
      },
      grid: {
        padding: {
          top: 125,
          right: 0,
          bottom: 0,
          left: 0,
        },
      },
      fill: {
        opacity: 1,
        type: 'gradient',
        gradient: {
          type: 'vertical',
          shadeIntensity: 1,
          inverseColors: !1,
          opacityFrom: 0.3,
          opacityTo: 0.05,
          stops: [100, 100],
        },
      },
      tooltip: {
        x: {
          show: false,
        },
      },
      series: [
        {
          data: [28, 40, 36, 52, 38, 60, 38, 52, 36, 40],
        },
      ],
    };

    // Gauge Chart 1
    this.gaugeChart1 = {
      series: [Math.round((this.valorActual / this.valorMaximo) * 100)],
      chart: {
        height: 300,
        type: 'radialBar',
        offsetY: -10,
        sparkline: {
          enabled: true
        }
      },
      colors: ['#4F7FFE'], // Azul como en la imagen
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 135,
          hollow: {
            margin: 0,
            size: '70%',
            background: '#fff',
            image: undefined,
            imageOffsetX: 0,
            imageOffsetY: 0,
            position: 'front'
          },
          track: {
            background: '#EEEEEE',
            strokeWidth: '97%',
            margin: 5,
            dropShadow: {
              enabled: false
            }
          },
          dataLabels: {
            name: {
              show: false
            },
            value: {
              offsetY: -10,
              fontSize: '22px',
              fontWeight: '700',
              color: '#333333',
              formatter: function(val: number): string {
                return Math.round((val * 20000) / 100).toString();
              }
            }
          }
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: 'horizontal',
          shadeIntensity: 0.5,
          gradientToColors: ['#4F7FFE'],
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100]
        }
      },
      stroke: {
        lineCap: 'round',
        dashArray: 4
      },
      labels: ['Total Gastos']
    };
  }
}
