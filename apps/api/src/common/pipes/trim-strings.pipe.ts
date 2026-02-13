import { Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class TrimStringsPipe implements PipeTransform {
  transform(value: unknown): unknown {
    return this.sanitize(value);
  }

  private sanitize(value: unknown): unknown {
    if (typeof value === "string") {
      return value.replace(/[<>]/g, "").trim();
    }
    if (Array.isArray(value)) {
      return value.map((entry) => this.sanitize(entry));
    }
    if (value && typeof value === "object") {
      return Object.fromEntries(
        Object.entries(value).map(([key, entry]) => [key, this.sanitize(entry)])
      );
    }
    return value;
  }
}
