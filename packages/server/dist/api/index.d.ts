/// <reference types="node" />
import { RootValueParams } from "./rootValue";
export declare const api: (rootValueParams: RootValueParams) => (request: import("http").IncomingMessage, response: import("http").ServerResponse & {
    json?: ((data: unknown) => void) | undefined;
}) => Promise<void>;
//# sourceMappingURL=index.d.ts.map