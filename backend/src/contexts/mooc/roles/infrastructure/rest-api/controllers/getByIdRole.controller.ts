import { Request, Response } from "express";
import { RoleGetterByIdUseCase } from "@contexts/mooc/roles/application";
import { getRoleRepository } from "../../dependencies";
import { http } from "@contexts/shared/infrastructure/plugins/http";

export default class GetByIdRoleController {
    private readonly _http: http;
    constructor( http: http ) {
        this._http = http;
    }

    run = async (req: Request, res: Response): Promise<void> => {
        try {
            const useCaseRoleGetterById = new RoleGetterByIdUseCase(
                getRoleRepository()
            );

            const role = await useCaseRoleGetterById.run(req.params.id);

            this._http.response.success.run(res, this._http.status.OK, role);
        } catch (error: any) {
            const status = error.status ??  this._http.status.INTERNAL_SERVER_ERROR;
            this._http.response.error.run(res, status, error);
        }
    };
}
