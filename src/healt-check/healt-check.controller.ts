import { Controller, Get } from '@nestjs/common';

@Controller('/')
export class HealtCheckController {
  @Get()
  healthCheck(): string {
    return 'Payments Microservice is running';
  }
}
