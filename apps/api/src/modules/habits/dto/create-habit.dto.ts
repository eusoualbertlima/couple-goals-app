import { HabitCategory, HabitFrequency, HabitVisibility } from "@prisma/client";
import { IsBoolean, IsEnum, IsInt, IsOptional, IsString, MaxLength, Min } from "class-validator";

export class CreateHabitDto {
  @IsString()
  @MaxLength(120)
  title!: string;

  @IsEnum(HabitCategory)
  category!: HabitCategory;

  @IsEnum(HabitFrequency)
  frequency!: HabitFrequency;

  @IsOptional()
  @IsString()
  customFrequencyCron?: string;

  @IsInt()
  @Min(1)
  weeklyTarget!: number;

  @IsInt()
  @Min(1)
  monthlyTarget!: number;

  @IsInt()
  @Min(1)
  yearlyTarget!: number;

  @IsEnum(HabitVisibility)
  visibility!: HabitVisibility;

  @IsBoolean()
  remindersEnabled!: boolean;
}
