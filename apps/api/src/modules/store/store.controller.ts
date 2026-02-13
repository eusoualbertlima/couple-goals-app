import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { IsUUID } from "class-validator";

import { CurrentUser, type JwtPayloadUser } from "@/common/guards/current-user.decorator";
import { JwtAuthGuard } from "@/common/guards/jwt-auth.guard";
import { StoreService } from "@/modules/store/store.service";

class EquipDto {
  @IsUUID()
  unlockId!: string;
}

@Controller("store")
@UseGuards(JwtAuthGuard)
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Get("catalog")
  catalog(@CurrentUser() user: JwtPayloadUser) {
    return this.storeService.listCatalog(user.coupleId!);
  }

  @Post(":itemId/unlock")
  unlock(@CurrentUser() user: JwtPayloadUser, @Param("itemId") itemId: string) {
    return this.storeService.unlock(user.coupleId!, itemId);
  }

  @Post("equip")
  equip(@CurrentUser() user: JwtPayloadUser, @Body() dto: EquipDto) {
    return this.storeService.equip(user.coupleId!, dto.unlockId);
  }
}
