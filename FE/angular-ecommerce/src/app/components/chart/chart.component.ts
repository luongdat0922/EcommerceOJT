import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { OrderResponse } from 'src/app/common/order-rep';
import { ChartService } from 'src/app/services/chart.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  startDate: string;
  endDate: string;
  totalOrders: number = 0;
  totalPrice: number = 0;
  totalPriceCompleted: number = 0;

  orders: OrderResponse[];

  constructor(private chartService: ChartService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    const currentDate = new Date();
    this.startDate = currentDate.toISOString().substring(0, 10);
    console.log(this.startDate);
    this.endDate = currentDate.toISOString().substring(0, 10);

    this.fetchOrders();
    this.drawChart();
  }

  fetchOrders(): void {
    this.chartService.getOrders(this.startDate, this.endDate).subscribe(orders => {
      this.orders = orders;
      const statusCount = this.countStatus(orders);
      this.updateChart(statusCount);
      this.calculateTotals(orders);
    });
  }

  countStatus(orders: OrderResponse[]): { [status: string]: number } {
    const statusOrder = ['Processing', 'Confirmed', 'Shipping', 'Success', 'Cancelled'];

    const statusCount: { [status: string]: number } = {};

    statusOrder.forEach(status => {
      statusCount[status] = 0;
    });

    orders.forEach(order => {
      const status = order.status;
      if (statusCount[status] !== undefined) {
        statusCount[status]++;
      }
    });

    return statusCount;
  }

  submitDates(): void {
    const start = new Date(this.startDate);
    const end = new Date(this.endDate);

    if (end < start) {
      alert('End date should be greater than or equal to start date');
      return;
    }

    const timeDiff = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (diffDays > 30) {
      alert('The interval between two dates should not exceed 30 days');
      return;
    }

    this.fetchOrders();
  }

  drawChart(): void {
    const myChart = new Chart("myChart", {
      type: 'bar',
      data: {
        labels: ['Processing', 'Confirmed', 'Shipping', 'Success', 'Cancelled'],
        datasets: [{
          label: '# of Status',
          data: [0, 0, 0, 0, 0],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  updateChart(statusCount: { [status: string]: number }): void {
    const myChart = Chart.getChart("myChart");
    if (myChart) {
      myChart.data.datasets[0].data = Object.values(statusCount);
      myChart.update();
    }
  }

  calculateTotals(orders: OrderResponse[]): void {
    this.totalOrders = orders.length;
    this.totalPrice = orders.reduce((total, order) => total + order.totalPrice, 0);
    this.totalPriceCompleted = orders
      .filter(order => order.status === "Success")
      .reduce((total, order) => total + order.totalPrice, 0);
  }
}