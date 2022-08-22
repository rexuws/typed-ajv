import { IsEmail, IsEnum, IsString, IsUUID, ValidateIf } from 'typed-ajv';

export enum UserRoles {
  MEMBER = 'MEMBER',
  ADMIN = 'ADMIN',
  IT = 'IT',
}

export class User {
  @IsString()
  @IsUUID()
  id: string;

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsEnum([UserRoles.MEMBER, UserRoles.ADMIN, UserRoles.IT])
  roles: UserRoles;

  @IsString()
  @IsUUID()
  @ValidateIf(
    (o) => {
      console.log('here');
      return o === UserRoles.MEMBER;
    },
    { dependency: 'roles' }
  )
  managerId?: string;
}
