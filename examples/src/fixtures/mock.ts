import { OptionalDeep } from 'ts-toolbelt/out/Object/Optional';

import { Team, User, UserRoles } from './domains';

export const mockValidMemberUser: Partial<User> = {
  email: 'user@gmail.com',
  id: '12345678-1234-1234-1234-123456789012',
  managerId: '12345678-1234-1234-1234-123456789012',
  password: 'password',
  roles: UserRoles.MEMBER,
  username: 'valid user',
};

export const mockInvalidMemberUserMissingManagerId: Partial<User> = {
  email: 'user@gmail.com',
  id: '12345678-1234-1234-1234-123456789012',
  password: 'password',
  roles: UserRoles.MEMBER,
  username: 'invalid user',
  managerId: 'df',
};

export const mockValidTeam: OptionalDeep<Team> = {
  id: ['17'] as any,
  members: [mockValidMemberUser],
  name: 'Valid Team',
};

export const mockInvalidTeam: OptionalDeep<Team> = {
  id: ['12345678-1234-1234-1234-123456789012'],
  members: [mockInvalidMemberUserMissingManagerId],
  name: 'Invalid Team',
};
