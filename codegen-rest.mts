import * as dotenv from 'dotenv';
import 'dotenv/config';
import path from 'path';
import { generateApi, GenerateApiParams } from 'swagger-typescript-api';

type GenerateApiParamsFromUrl = {
  name: string;
  url: string;
};

dotenv.config({ path: '.env' });
dotenv.config({ path: '.env.local', override: true });

const sleep = (ms: number) =>
  new Promise((r) => {
    setTimeout(r, ms);
  });

const timeout = 5_000;

type ApiParams = Partial<GenerateApiParams> & GenerateApiParamsFromUrl;
const apis: ApiParams[] = [
  {
    url: `${process.env.VITE_BASE_API_URL}/v3/api-docs/user-api`,
    name: 'SwaggerTypeUser',
  },
];

const generate = ({ name, url }: GenerateApiParamsFromUrl) => {
  /* NOTE: all fields are optional except one of `output`, `url`, `spec` */
  // See https://github.com/acacode/swagger-typescript-api
  return generateApi({
    url,
    name: `${name}.ts`,
    defaultResponseAsSuccess: false,
    generateClient: false,
    extractRequestParams: false,
    httpClientType: 'axios',
    extractRequestBody: false,
    generateResponses: false,
    defaultResponseType: 'void',
    // set to `false` to prevent the tool from writing to disk
    output: path.resolve(process.cwd(), 'src/types'),
    cleanOutput: false,
    enumNamesAsValues: false,
    generateRouteTypes: false,
    enumKeyPrefix: '',
    addReadonly: false,
    generateUnionEnums: false,
    enumKeySuffix: '',
    prettier: {
      // By default prettier config is load from your project
      printWidth: 120,
      parser: 'typescript',
      tabWidth: 2,
      trailingComma: 'all',
    },
    toJS: false,
    /** allow to generate extra files based with this extra templates, see more below */
    extraTemplates: [],

    codeGenConstructs: (constructs) => ({
      ...constructs,
    }),

    unwrapResponseData: false,

    extractingOptions: {
      requestBodySuffix: ['Payload', 'Body', 'Input'],
      requestParamsSuffix: ['Params'],
      responseBodySuffix: ['Data', 'Result', 'Output'],
      responseErrorSuffix: ['Error', 'Fail', 'Fails', 'ErrorData', 'HttpError', 'BadResponse'],
    },

    fixInvalidEnumKeyPrefix: 'Value',
    singleHttpClient: true,
    fixInvalidTypeNamePrefix: 'Type',
    moduleNameFirstTag: false,
    hooks: {
      // ToDo: not sure why this doesn't work, but its not that important
      onPrepareConfig: (currentConfiguration) => ({
        ...currentConfiguration,
        config: {
          ...currentConfiguration.config,
          apiClassName: name,
        },
      }),
    },
    typePrefix: '',
    typeSuffix: '',
  });
};

const generateApis = async () => {
  const TIMEOUT_RESPONSE = 'TIMEOUT';
  await Promise.all(
    apis.map(async (api) => {
      console.info({ msg: 'Generating apis', api });
      try {
        const response = await Promise.race([generate(api), sleep(timeout).then(() => TIMEOUT_RESPONSE)]);
        if (response === TIMEOUT_RESPONSE) {
          console.error({ msg: 'Fetch open api timeout', api });
          process.exit(0);
        }
      } catch (error) {
        console.error({ msg: 'Error generating api', api });
        console.error(error);
      }
    }),
  );
};

generateApis();
