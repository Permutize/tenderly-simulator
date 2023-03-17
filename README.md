# Tenderly simulator

This is a Tenderly simulator for the [Tenderly](https://tenderly.co) platform.

## Installation

```bash
npm install tenderly-simulator
```

## Usage

```javascript
const { TenderlySimulator } = require('tenderly-simulator')

const simulator = new TenderlySimulator({
  tenderlyUser: 'tenderly-user',
  tenderlyProject: 'tenderly-project',
  tenderlyAccessKey: 'tenderly-access-key',
});

const tx = await contract.populateTransaction.myFunction(data);

const result = await simulator.simulate(tx);

console.log(result);
```

&copy; 2022 [HaHa.me](https://haha.me)