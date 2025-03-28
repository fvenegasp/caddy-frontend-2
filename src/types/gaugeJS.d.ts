declare module 'gaugeJS' {
  export class Gauge {
    constructor(target: HTMLCanvasElement);
    setOptions(options: any): Gauge;
    maxValue: number;
    setMinValue(value: number): void;
    animationSpeed: number;
    set(value: number): void;
  }
} 