import { DataProvider, fetchUtils } from "ra-core";

export default (
    apiUrl: string,
    httpClient = fetchUtils.fetchJson
): DataProvider["update"] => async (resource, params) => {
    if (resource === "users") {
        const id = params.data.id;
        delete params.data.id;

        await httpClient(`${apiUrl}/users/${params.id}`, {
            method: "PUT",
            body: JSON.stringify(params.data),
            headers: new Headers({}),
        });

        return {
            data: {
                ...params.previousData,
                ...params.data,
                id: id,
            },
        };
    }

    if (resource === "cases") {
        const id = params.data.id;
        delete params.data.id;

        const variables = params.data.variables;

        await httpClient(`${apiUrl}/cases/${params.id}/variable`, {
            method: "PUT",
            body: JSON.stringify(variables),
            headers: new Headers({}),
        });

        return {
            data: {
                ...params.previousData,
                ...params.data,
                id: id,
            },
        };
    }

    throw new Error(`Endpoint '${resource}' not found!`);
};
