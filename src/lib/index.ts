import axios from 'axios';
import { ethers } from 'ethers';

type SimulationType = 'quick' | 'full';

interface TenderlySimulatorOptions {
  tenderyUser: string;
  tenderlyProject: string;
  tenderlyAccessKey: string;
}

interface TenderlySimulationOptions {
  save?: boolean; // if true simulation is saved and shows up in the dashboard
  save_if_fails?: boolean; // if true, reverting simulations show up in the dashboard
  simulation_type?: SimulationType; // full or quick (full is default)
  network_id?: string; // network to simulate on
}

const defaultSimulationOptions: TenderlySimulationOptions = {
  save: false,
  save_if_fails: false,
  simulation_type: 'full',
  network_id: '1',
};

export class TenderlySimulator {
  private readonly _options: TenderlySimulatorOptions;

  constructor(options: TenderlySimulatorOptions) {
    this._options = options;
  }

  async simulate(transaction: ethers.TransactionLike, options?: TenderlySimulationOptions) {
    const { tenderyUser, tenderlyProject, tenderlyAccessKey: tenderlyApiKey } = this._options;
    options = { ...defaultSimulationOptions, ...options };
    const { save, save_if_fails, simulation_type, network_id } = options;
    const response = await axios.post(
      `https://api.tenderly.co/api/v1/account/${tenderyUser}/project/${tenderlyProject}/simulate`,
      {
        ...transaction,
        save,
        save_if_fails,
        simulation_type,
        network_id,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Key': tenderlyApiKey,
        },
      },
    );
    return response.data.transaciton;
  }
}
