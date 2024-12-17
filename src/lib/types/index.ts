import { UserIdentifierTypeEnum } from '@ahomevilla-hotel/node-sdk';

export type Identifier = UserIdentifierTypeEnum;

export type IdentifierValue = {
  type: Identifier;
  value: string;
  id: string;
};
