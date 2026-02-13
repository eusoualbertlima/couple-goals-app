import { Module } from "@nestjs/common";

import { RetentionController } from "@/modules/retention/retention.controller";
import { RetentionService } from "@/modules/retention/retention.service";

@Module({
  controllers: [RetentionController],
  providers: [RetentionService],
  exports: [RetentionService]
})
export class RetentionModule {}
