import { Transform } from '../transformers';
import { Type } from '../transformers/Type';
import { IsString } from '../validators';

export class ValidatedResult {
  @IsString()
  @Transform((_, object: Record<PropertyKey, unknown>) => object.instancePath)
  property: string;

  @IsString()
  message: string;
}

export class Result {
  @Transform((value) => value ?? 'Validate failed')
  @IsString()
  status: 'success' | 'error';

  @Type(ValidatedResult)
  data: ValidatedResult[];
}
