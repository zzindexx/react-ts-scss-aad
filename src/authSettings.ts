export class AuthSettings {
    tenantId: string;
    clientId: string;
    redirectUrl: string;
}

export const authSettings: AuthSettings = {
    tenantId: "",
    clientId: "",
    redirectUrl: "http://localhost:4200"
};