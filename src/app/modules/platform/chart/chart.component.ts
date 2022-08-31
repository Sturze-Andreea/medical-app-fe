import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Chart } from 'chart.js';
import { HospitalizationService } from 'src/app/data/services/hospitalization.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  chart: any = [];
  @ViewChild('pdfChart', { static: false }) pdfChart: ElementRef;
  constructor(
    private hospitalizationService: HospitalizationService,
    public dialogRef: MatDialogRef<ChartComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog
  ) {}

  createDiagonalPattern(color = 'black') {
    let shape = document.createElement('canvas');
    shape.width = 10;
    shape.height = 10;
    let c: any = shape.getContext('2d');
    c.strokeStyle = color;
    c.beginPath();
    c.moveTo(2, 0);
    c.lineTo(10, 8);
    c.stroke();
    c.beginPath();
    c.moveTo(0, 8);
    c.lineTo(2, 10);
    c.stroke();
    return c.createPattern(shape, 'repeat');
  }

  ngOnInit(): void {
    this.hospitalizationService
      .getChartData(this.data.id)
      .subscribe((res: any) => {
        this.chart = new Chart('canvas', {
          data: {
            labels: res.map((elem: any) => elem.date.substring(0, 10)),
            datasets: [
              {
                label: 'Temperature',
                yAxisID: 'y-axis-4',
                type: 'line',
                data: res
                  .map((elem: any) => elem.temperature)
                  .map((elem: any) => (elem === -1 ? null : elem)),
                borderColor: '#0b04cf',
                fill: false,
              },
              {
                label: 'Pulse',
                yAxisID: 'y-axis-3',
                type: 'line',
                data: res
                  .map((elem: any) => elem.pulse)
                  .map((elem: any) => (elem === -1 ? null : elem)),
                borderColor: '#fc1703',
                fill: false,
              },
              {
                label: 'Breaths',
                yAxisID: 'y-axis-1',
                type: 'line',
                data: res
                  .map((elem: any) => elem.breathNr)
                  .map((elem: any) => (elem === -1 ? null : elem)),
                borderColor: '#0ea303',
                fill: false,
              },
              {
                label: 'Blood pressure',
                yAxisID: 'y-axis-2',
                type: 'bar',
                data: res
                  .map((elem: any) => [elem.minTA, elem.maxTA])
                  .map((elem: any) => (elem[0] === -1 ? null : elem)),
                backgroundColor: this.createDiagonalPattern('#fc1703'),
                borderColor: '#fc1703',
                borderWidth: 0.5,
                fill: false,
              },
            ],
          },
          options: {
            spanGaps: true,
            legend: {
              display: true,
            },
            scales: {
              xAxes: [
                {
                  display: true,
                },
              ],
              yAxes: [
                {
                  stacked: false,
                  position: 'left',
                  scaleLabel: {
                    display: true,
                    labelString: 'Temperature',
                  },
                  type: 'linear',
                  id: 'y-axis-4',
                  ticks: {
                    max: 42,
                    min: 36,
                    stepSize: 1,
                    display: true,
                    beginAtZero: false,
                    fontSize: 13,
                    padding: 10,
                  },
                },
                {
                  stacked: false,
                  position: 'left',
                  scaleLabel: {
                    display: true,
                    labelString: 'Pulse',
                  },
                  type: 'linear',
                  id: 'y-axis-3',
                  ticks: {
                    max: 180,
                    min: 60,
                    stepSize: 20,
                    display: true,
                    beginAtZero: false,
                    fontSize: 13,
                    padding: 10,
                  },
                },
                {
                  stacked: false,
                  position: 'left',
                  scaleLabel: {
                    display: true,
                    labelString: 'Blood pressure',
                  },
                  type: 'linear',
                  id: 'y-axis-2',
                  ticks: {
                    max: 350,
                    min: 50,
                    stepSize: 50,
                    display: true,
                    beginAtZero: false,
                    fontSize: 13,
                    padding: 10,
                  },
                },
                {
                  stacked: false,
                  position: 'left',
                  scaleLabel: {
                    display: true,
                    labelString: 'Breaths',
                  },
                  type: 'linear',
                  id: 'y-axis-1',
                  ticks: {
                    max: 40,
                    min: 10,
                    stepSize: 5,
                    display: true,
                    beginAtZero: false,
                    fontSize: 13,
                    padding: 10,
                  },
                },
              ],
            },
          },
        });
      });
  }

  close() {
    this.dialogRef.close();
  }

  public downloadAsPDF() {
    html2canvas(this.pdfChart.nativeElement, { scale: 3 }).then((canvas) => {
      const imageGeneratedFromTemplate = canvas.toDataURL('image/png');
      const fileWidth = 250;
      const generatedImageHeight = (canvas.height * fileWidth) / canvas.width;
      let PDF = new jsPDF('l', 'mm', 'a4');
      PDF.addImage(
        imageGeneratedFromTemplate,
        'PNG',
        0,
        5,
        fileWidth,
        generatedImageHeight
      );
      PDF.html(this.pdfChart.nativeElement.innerHTML);
      PDF.save(`chart-${this.data.pacient}.pdf`);
    });
  }
}
