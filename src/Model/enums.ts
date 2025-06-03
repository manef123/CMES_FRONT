export enum ClassStatus {
  ACTIVE,
  INACTIVE,
  UNDER_REVISION,
  LOCKED,
  DELETED,
  PENDING_APPROVAL,
  APPROVED,
  REJECTED
}

export enum ClassType {
  MaterialClass = 1,
  BatchClass = 2,
  ConfigurableObjects = 3,
  VariantClass = 4
}

export enum ControlModelType {
  PAC, // Production Control
  TPV  // Quality Control
}

export enum DataType {
  CHAR,
  NUM,
  CURR,
  DATE,
  TIME,
  BOOL,
  DEC
}

export enum EventType {
  SHIFT_START,
  SHIFT_END,
  CHARACTERISTIC_EVENT,
  PRODUCTION_START,
  PRODUCTION_END
}

export enum MaterialType {
  ROH,
  HALB,
  FERT
}

export enum UnitOfMeasure {
  Millimeter,
  Centimeter,
  Meter,
  Kilometer,
  Inch,
  Foot,
  Yard,
  Mile,

  Milligram,
  Gram,
  Kilogram,
  MetricTon,
  Ounce,
  Pound,
  Ton,

  Milliliter,
  Liter,
  CubicMeter,
  CubicCentimeter,
  Gallon,
  Quart,
  Pint,
  FluidOunce,

  SquareMillimeter,
  SquareCentimeter,
  SquareMeter,
  SquareKilometer,
  SquareInch,
  SquareFoot,
  SquareYard,
  Acre,
  Hectare,

  Second,
  Minute,
  Hour,
  Day,
  Week,
  Month,
  Year,

  Celsius,
  Fahrenheit,
  Kelvin,

  Pascal,
  Bar,
  PSI,
  Atmosphere,

  Joule,
  Kilojoule,
  Calorie,
  Kilocalorie,
  WattHour,
  KilowattHour,

  MetersPerSecond,
  KilometersPerHour,
  MilesPerHour,

  Hertz,
  Kilohertz,
  Megahertz,

  Volt,
  Ampere,
  Ohm,
  Watt,

  USD,
  EUR,
  GBP,
  JPY,
  TND
}
