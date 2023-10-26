import { RoleCreateUseCase } from "@contexts/mooc/roles/application";
import { Request, Response } from "express";
import { getRoleRepository } from "../../dependencies";
import { http } from "@contexts/shared/infrastructure/plugins/http";
import { uuid } from "@contexts/shared/infrastructure/plugins/uuid";

export class CreateRoleController {
    private readonly _http: http;
    constructor( http: http ) {
        this._http = http;
    }

    run = async (req: Request, res: Response): Promise<void> => {
        try {
            const useCaseRoleCreate = new RoleCreateUseCase(
                getRoleRepository(),
                uuid
            );

            const roleCreate = await useCaseRoleCreate.run(req.body);

            this._http.response.success.run(res, this._http.status.CREATED, roleCreate);
        } catch (error: any) {
            const status = error.status ?? this._http.status.INTERNAL_SERVER_ERROR;
            this._http.response.error.run(res, status, error);
        }
    };
}
