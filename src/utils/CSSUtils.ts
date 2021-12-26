import { StyleValue } from "vue";

export class StyleGenerate {
  _style: { [xx: string]: string } = {};

  constructor() {}

  /**
   *  添加一个Transform
   *
   * @param {TransformGenerate} transformGenerate
   * @memberof StyleGenerate
   */
  public addTransform(transformGenerate: TransformGenerate) {
    this.add(transformGenerate.pre, transformGenerate.return());

    return this;
  }

  public addTransition(prop: string = "all", durition: number | string = 1000) {
    durition = Number.isInteger(durition) ? `${durition}ms` : durition;
    this.add("transition", `${prop} ${durition}`);

    return this;
  }

  /**
   * 增加一个样式
   *
   * @param {string} kye  样式名称
   * @param {string} value 样式值
   * @memberof StyleGenerate
   */
  public add(kye: string, value: string) {
    this._style[kye] = value;
  }

  public return(): StyleValue {
    return this._style;
  }
  static newClass() {
    return new StyleGenerate();
  }
}

export class TransformGenerate {
  pre = "transform";
  _value: string[] = [];

  /**
   *
   *
   * @param {(number|string)} x x偏移
   * @param {(string|number|null|undefined)} [y=null] y偏移
   * @param {(number|string|null|undefined)} [z=null] z偏移
   * @return {*}
   * @memberof TransformGenerate
   */
  public addTranslate(
    x: number | string,
    y: string | number | null | undefined = null,
    z: number | string | null | undefined = null
  ) {
    this._value.push(`translate(${x}${y ? "," + y : ""}${z ? "," + z : ""})`);
    return this;
  }

  public return() {
    let ret = "";
    this._value.forEach((item) => {
      ret += item;
    });
    return ret;
  }

  static newClass() {
    return new TransformGenerate();
  }
}
