import { Module } from "@nestjs/common";

import { TreeController } from "@/modules/tree/tree.controller";
import { TreeService } from "@/modules/tree/tree.service";

@Module({
  controllers: [TreeController],
  providers: [TreeService],
  exports: [TreeService]
})
export class TreeModule {}
