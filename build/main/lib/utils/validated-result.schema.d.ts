export declare class ValidatedResult {
    property: string;
    message: string;
}
export declare class Result {
    status: 'success' | 'error';
    data: ValidatedResult[];
}
