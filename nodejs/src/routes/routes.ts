/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import {  fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { TimescaleResearcherController } from './../controllers/TimescaleResearcherController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { RedisResearcherController } from './../controllers/RedisResearcherController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { PostgresResearcherController } from './../controllers/PostgresResearcherController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { OracleResearcherController } from './../controllers/OracleResearcherController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { NeoResearcherController } from './../controllers/NeoResearcherController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { MysqlResearcherController } from './../controllers/MysqlResearcherController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { MssqlResearcherController } from './../controllers/MssqlResearcherController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { MongoResearcherController } from './../controllers/MongoResearcherController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { MariaResearcherController } from './../controllers/MariaResearcherController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { InfluxResearcherController } from './../controllers/InfluxResearcherController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ElasticResearcherController } from './../controllers/ElasticResearcherController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { DuckResearcherController } from './../controllers/DuckResearcherControler';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CockroachResearcherController } from './../controllers/CockroachResearcherController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CassandraResearcherController } from './../controllers/CassandraResearcherController';
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';



// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa




export function RegisterRoutes(app: Router) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################


    
        const argsTimescaleResearcherController_getResearchers: Record<string, TsoaRoute.ParameterSchema> = {
                page: {"in":"query","name":"page","dataType":"double"},
                limit: {"in":"query","name":"limit","dataType":"double"},
                name: {"in":"query","name":"name","dataType":"string"},
        };
        app.get('/timescale/researchers',
            ...(fetchMiddlewares<RequestHandler>(TimescaleResearcherController)),
            ...(fetchMiddlewares<RequestHandler>(TimescaleResearcherController.prototype.getResearchers)),

            async function TimescaleResearcherController_getResearchers(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsTimescaleResearcherController_getResearchers, request, response });

                const controller = new TimescaleResearcherController();

              await templateService.apiHandler({
                methodName: 'getResearchers',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsRedisResearcherController_getResearchers: Record<string, TsoaRoute.ParameterSchema> = {
                page: {"in":"query","name":"page","dataType":"double"},
                pageSize: {"in":"query","name":"pageSize","dataType":"double"},
                name: {"in":"query","name":"name","dataType":"string"},
        };
        app.get('/redis/researchers',
            ...(fetchMiddlewares<RequestHandler>(RedisResearcherController)),
            ...(fetchMiddlewares<RequestHandler>(RedisResearcherController.prototype.getResearchers)),

            async function RedisResearcherController_getResearchers(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsRedisResearcherController_getResearchers, request, response });

                const controller = new RedisResearcherController();

              await templateService.apiHandler({
                methodName: 'getResearchers',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsPostgresResearcherController_getResearchers: Record<string, TsoaRoute.ParameterSchema> = {
                page: {"in":"query","name":"page","dataType":"double"},
                limit: {"in":"query","name":"limit","dataType":"double"},
                name: {"in":"query","name":"name","dataType":"string"},
        };
        app.get('/postgres/researchers',
            ...(fetchMiddlewares<RequestHandler>(PostgresResearcherController)),
            ...(fetchMiddlewares<RequestHandler>(PostgresResearcherController.prototype.getResearchers)),

            async function PostgresResearcherController_getResearchers(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPostgresResearcherController_getResearchers, request, response });

                const controller = new PostgresResearcherController();

              await templateService.apiHandler({
                methodName: 'getResearchers',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsOracleResearcherController_getResearchers: Record<string, TsoaRoute.ParameterSchema> = {
                page: {"in":"query","name":"page","dataType":"double"},
                pageSize: {"in":"query","name":"pageSize","dataType":"double"},
                name: {"in":"query","name":"name","dataType":"string"},
        };
        app.get('/oracle/researchers',
            ...(fetchMiddlewares<RequestHandler>(OracleResearcherController)),
            ...(fetchMiddlewares<RequestHandler>(OracleResearcherController.prototype.getResearchers)),

            async function OracleResearcherController_getResearchers(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsOracleResearcherController_getResearchers, request, response });

                const controller = new OracleResearcherController();

              await templateService.apiHandler({
                methodName: 'getResearchers',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsNeoResearcherController_getResearchers: Record<string, TsoaRoute.ParameterSchema> = {
                page: {"in":"query","name":"page","required":true,"dataType":"double"},
                pageSize: {"in":"query","name":"pageSize","required":true,"dataType":"double"},
                name: {"in":"query","name":"name","dataType":"string"},
        };
        app.get('/neo/researchers',
            ...(fetchMiddlewares<RequestHandler>(NeoResearcherController)),
            ...(fetchMiddlewares<RequestHandler>(NeoResearcherController.prototype.getResearchers)),

            async function NeoResearcherController_getResearchers(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsNeoResearcherController_getResearchers, request, response });

                const controller = new NeoResearcherController();

              await templateService.apiHandler({
                methodName: 'getResearchers',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsMysqlResearcherController_getResearchers: Record<string, TsoaRoute.ParameterSchema> = {
                page: {"in":"query","name":"page","dataType":"double"},
                pageSize: {"in":"query","name":"pageSize","dataType":"double"},
                name: {"in":"query","name":"name","dataType":"string"},
        };
        app.get('/mysql/researchers',
            ...(fetchMiddlewares<RequestHandler>(MysqlResearcherController)),
            ...(fetchMiddlewares<RequestHandler>(MysqlResearcherController.prototype.getResearchers)),

            async function MysqlResearcherController_getResearchers(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsMysqlResearcherController_getResearchers, request, response });

                const controller = new MysqlResearcherController();

              await templateService.apiHandler({
                methodName: 'getResearchers',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsMssqlResearcherController_getResearchers: Record<string, TsoaRoute.ParameterSchema> = {
                page: {"in":"query","name":"page","dataType":"double"},
                pageSize: {"in":"query","name":"pageSize","dataType":"double"},
                name: {"in":"query","name":"name","dataType":"string"},
        };
        app.get('/mssql/researchers',
            ...(fetchMiddlewares<RequestHandler>(MssqlResearcherController)),
            ...(fetchMiddlewares<RequestHandler>(MssqlResearcherController.prototype.getResearchers)),

            async function MssqlResearcherController_getResearchers(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsMssqlResearcherController_getResearchers, request, response });

                const controller = new MssqlResearcherController();

              await templateService.apiHandler({
                methodName: 'getResearchers',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsMongoResearcherController_getResearchers: Record<string, TsoaRoute.ParameterSchema> = {
                page: {"in":"query","name":"page","required":true,"dataType":"double"},
                pageSize: {"in":"query","name":"pageSize","required":true,"dataType":"double"},
                name: {"in":"query","name":"name","dataType":"string"},
        };
        app.get('/mongo/researchers',
            ...(fetchMiddlewares<RequestHandler>(MongoResearcherController)),
            ...(fetchMiddlewares<RequestHandler>(MongoResearcherController.prototype.getResearchers)),

            async function MongoResearcherController_getResearchers(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsMongoResearcherController_getResearchers, request, response });

                const controller = new MongoResearcherController();

              await templateService.apiHandler({
                methodName: 'getResearchers',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsMariaResearcherController_getResearchers: Record<string, TsoaRoute.ParameterSchema> = {
                page: {"in":"query","name":"page","dataType":"double"},
                pageSize: {"in":"query","name":"pageSize","dataType":"double"},
                name: {"in":"query","name":"name","dataType":"string"},
        };
        app.get('/maria/researchers',
            ...(fetchMiddlewares<RequestHandler>(MariaResearcherController)),
            ...(fetchMiddlewares<RequestHandler>(MariaResearcherController.prototype.getResearchers)),

            async function MariaResearcherController_getResearchers(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsMariaResearcherController_getResearchers, request, response });

                const controller = new MariaResearcherController();

              await templateService.apiHandler({
                methodName: 'getResearchers',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsInfluxResearcherController_getResearchers: Record<string, TsoaRoute.ParameterSchema> = {
                page: {"in":"query","name":"page","required":true,"dataType":"double"},
                pageSize: {"in":"query","name":"pageSize","required":true,"dataType":"double"},
                name: {"in":"query","name":"name","dataType":"string"},
        };
        app.get('/influx/researchers',
            ...(fetchMiddlewares<RequestHandler>(InfluxResearcherController)),
            ...(fetchMiddlewares<RequestHandler>(InfluxResearcherController.prototype.getResearchers)),

            async function InfluxResearcherController_getResearchers(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsInfluxResearcherController_getResearchers, request, response });

                const controller = new InfluxResearcherController();

              await templateService.apiHandler({
                methodName: 'getResearchers',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsElasticResearcherController_getResearchers: Record<string, TsoaRoute.ParameterSchema> = {
                page: {"in":"query","name":"page","required":true,"dataType":"double"},
                pageSize: {"in":"query","name":"pageSize","required":true,"dataType":"double"},
                name: {"in":"query","name":"name","dataType":"string"},
        };
        app.get('/elastic/researchers',
            ...(fetchMiddlewares<RequestHandler>(ElasticResearcherController)),
            ...(fetchMiddlewares<RequestHandler>(ElasticResearcherController.prototype.getResearchers)),

            async function ElasticResearcherController_getResearchers(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsElasticResearcherController_getResearchers, request, response });

                const controller = new ElasticResearcherController();

              await templateService.apiHandler({
                methodName: 'getResearchers',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsDuckResearcherController_getResearchers: Record<string, TsoaRoute.ParameterSchema> = {
                page: {"in":"query","name":"page","dataType":"double"},
                pageSize: {"in":"query","name":"pageSize","dataType":"double"},
                name: {"in":"query","name":"name","dataType":"string"},
        };
        app.get('/duck/researchers',
            ...(fetchMiddlewares<RequestHandler>(DuckResearcherController)),
            ...(fetchMiddlewares<RequestHandler>(DuckResearcherController.prototype.getResearchers)),

            async function DuckResearcherController_getResearchers(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsDuckResearcherController_getResearchers, request, response });

                const controller = new DuckResearcherController();

              await templateService.apiHandler({
                methodName: 'getResearchers',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsCockroachResearcherController_getResearchers: Record<string, TsoaRoute.ParameterSchema> = {
                page: {"in":"query","name":"page","dataType":"double"},
                limit: {"in":"query","name":"limit","dataType":"double"},
                name: {"in":"query","name":"name","dataType":"string"},
        };
        app.get('/cockroach/researchers',
            ...(fetchMiddlewares<RequestHandler>(CockroachResearcherController)),
            ...(fetchMiddlewares<RequestHandler>(CockroachResearcherController.prototype.getResearchers)),

            async function CockroachResearcherController_getResearchers(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsCockroachResearcherController_getResearchers, request, response });

                const controller = new CockroachResearcherController();

              await templateService.apiHandler({
                methodName: 'getResearchers',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsCassandraResearcherController_getResearchers: Record<string, TsoaRoute.ParameterSchema> = {
                page: {"in":"query","name":"page","dataType":"double"},
                pageSize: {"in":"query","name":"pageSize","dataType":"double"},
                name: {"in":"query","name":"name","dataType":"string"},
        };
        app.get('/cassandra/researchers',
            ...(fetchMiddlewares<RequestHandler>(CassandraResearcherController)),
            ...(fetchMiddlewares<RequestHandler>(CassandraResearcherController.prototype.getResearchers)),

            async function CassandraResearcherController_getResearchers(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsCassandraResearcherController_getResearchers, request, response });

                const controller = new CassandraResearcherController();

              await templateService.apiHandler({
                methodName: 'getResearchers',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
