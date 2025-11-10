import { AfterViewInit, Component, HostListener, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'page-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit, AfterViewInit, OnChanges {

  menuLateralFechado = false;

  constructor() {
   }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.isBiggerScreen();
  }

  ngOnChanges(changes: SimpleChanges) {
    changes.menuLateralAberto.currentValue = !changes.menuLateralAberto.currentValue;
  }

  onAbrirFecharMenu() {
    this.menuLateralFechado = !this.menuLateralFechado;
  }

  // Calcula a largura da tela para esconder o menu lateral de forma altomática
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (event.target.innerWidth < 768) {
      this.menuLateralFechado = true;
      localStorage.setItem("telaPequena", "sim")
    } else {
      this.menuLateralFechado = false;
      localStorage.setItem("telaPequena", "nao")
    }
  }

  isBiggerScreen() {
    const width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;

    if (width < 768) {
      this.menuLateralFechado = true;
      localStorage.setItem("telaPequena", "sim")
    } else {
      this.menuLateralFechado = false;
      localStorage.setItem("telaPequena", "nao")
    }
  }

}
