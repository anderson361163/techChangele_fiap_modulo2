import { Injectable } from '@nestjs/common';
import * as config from '@root/package.json';

@Injectable()
export class AppService {
  getHealthCheck() {
    return {
      name: config.name,
      version: config.version,
    };
  }
}
