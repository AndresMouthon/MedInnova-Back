export function sanitizeResponse<T>(data: T, keysToRemove: string[]): T {
    if (Array.isArray(data)) {
        return data.map(item => sanitizeResponse(item, keysToRemove)) as any;
    }

    if (typeof data === 'object' && data !== null) {
        const result: any = {};
        for (const key in data) {
            if (!keysToRemove.includes(key)) {
                const value = (data as any)[key];
                result[key] = sanitizeResponse(value, keysToRemove);
            }
        }
        return result;
    }

    return data;
}