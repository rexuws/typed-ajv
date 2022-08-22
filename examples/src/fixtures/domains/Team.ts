import { IsString, IsUUID, Type } from 'typed-ajv';

import { User } from './User';

export class Team {
  @IsString()
  @IsUUID()
  id: string;

  @IsString()
  name: string;

  @Type(User)
  members: User;
}
