import {
  _,
  AnySchemaObject,
  CodeKeywordDefinition,
  KeywordErrorDefinition,
  str,
} from 'ajv';
import * as errorFns from 'ajv/dist/compile/errors';
import { KeywordErrorCxt } from 'ajv/dist/types';

const KEYWORD = 'errorMessage';

let patchedReportError = false;

const findMessage = (schema: AnySchemaObject, keyword: string): any => {
  return typeof schema.errorMessage === 'object'
    ? schema.errorMessage[keyword]
    : schema.errorMessage;
};

const getCustomError = (
  cxt: KeywordErrorCxt
): KeywordErrorDefinition | undefined => {
  const { parentSchema, keyword } = cxt;

  if (!parentSchema) return;

  const message = findMessage(parentSchema, keyword);

  if (!message) return;

  if (typeof message === 'string')
    return {
      message: () => str`${message}`,
    };

  return {
    message: (p) => {
      return str`${message(p.params.param)}`;
    },
  };

  // return;
};

export const patchReportError = () => {
  if (patchedReportError) return;

  const { reportError: _reportError } = errorFns;

  (<any>errorFns).reportError = (...args: any[]) => {
    const cxt: KeywordErrorCxt = args[0];

    const errArg: KeywordErrorDefinition = args[1];

    const [, , ...rest] = args;

    const customErr = getCustomError(cxt);

    // console.log('intercepted');
    return _reportError(
      cxt,
      customErr ? { ...errArg, ...customErr } : errArg,
      ...rest
    );
  };

  patchedReportError = true;
};

export const errorMessage$ = (): CodeKeywordDefinition => ({
  keyword: KEYWORD,
  schemaType: ['object'],
  post: true,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  code: () => {},
  metaSchema: {
    anyOf: [
      { type: 'string' },
      {
        type: 'object',
        properties: {
          properties: { $ref: '#/$defs/messageType' },
          // items: { $ref: '#/$defs/stringList' },
          // required: { $ref: '#/$defs/stringOrMap' },
          // dependencies: { $ref: '#/$defs/stringOrMap' },
        },
        additionalProperties: {
          anyOf: [{ type: 'string' }, { typeof: 'function' }],
        },
      },
    ],
    $defs: {
      messageType: {
        anyOf: [
          {
            type: 'string',
          },
          {
            typeof: 'function',
          },
        ],
      },
    },
  },
});
