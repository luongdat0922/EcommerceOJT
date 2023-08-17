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
    this.endDate = currentDate.toISOString().substring(0, 10);

    this.fetchOrders();
    this.drawChart();
  }

  fetchOrders(): void {
    this.chartService.getOrders(new Date(this.startDate), new Date(this.endDate)).subscribe(orders => {
      this.orders = orders;
      const statusCount = this.countStatus(orders);
      this.updateChart(statusCount);
      this.calculateTotals(orders);
    });
  }

  countStatus(orders: OrderResponse[]): { [status: string]: number } {
    const statusCount: { [status: string]: number } = {};
    orders.forEach(order => {
      const status = order.status;
      if (statusCount[status]) {
        statusCount[status]++;
      } else {
        statusCount[status] = 1;
      }
    });
    return statusCount;
  }

  submitDates(): void {
    const start = new Date(this.startDate);
    const end = new Date(this.endDate);
  
    const timeDiff = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  
    if (diffDays > 30) {
      alert('Khoảng cách giữa hai ngày không được vượt quá 30 ngày');
      // Perform other actions if needed
    } else {
      alert('Khoảng cách giữa hai ngày hợp lệ');
      this.fetchOrders(); // Fetch orders based on selected dates
      // Perform other actions if needed
      console.log(this.orders);
    }
  }

  drawChart(): void {
    const myChart = new Chart("myChart", {
      type: 'bar',
      data: {
        labels: ['Processing', 'Confirmed', 'Delivered', 'Completed', 'Cancelled'],
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
      .filter(order => order.status === "Completed")
      .reduce((total, order) => total + order.totalPrice, 0);
  }
}