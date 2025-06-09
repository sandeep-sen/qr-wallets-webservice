export interface ValidationResult {
    isValid: boolean;
    error?: string;
    data?: any;
}

export class DataValidator {

    /**
     * Validates that a string parameter exists and is not empty
     */
    static validateNotEmpty(value: string, parameterName: string = 'parameter'): ValidationResult {
        if (!value || value.trim() === '') {
            return {
                isValid: false,
                error: `Parameter ${parameterName} is required but is missing or empty`,
            };
        }

        return {
            isValid: true,
            data: value.trim()
        };
    }

    /**
     * Validates that a string is valid base64 format
     */
    static validateBase64(value: string, parameterName: string = 'parameter'): ValidationResult {
        const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;

        if (!base64Regex.test(value)) {
            return {
                isValid: false,
                error: `Parameter ${parameterName} must be a valid base64 encoded string`,
            };
        }

        return {
            isValid: true,
            data: value
        };
    }

    /**
     * Converts base64 string to JSON object
     */
    static base64ToJson(base64String: string, parameterName: string = 'parameter'): ValidationResult {
        try {
            const decodedString = Buffer.from(base64String, 'base64').toString('utf8');
            const jsonData = JSON.parse(decodedString);

            return {
                isValid: true,
                data: jsonData
            };
        } catch (error) {
            return {
                isValid: false,
                error: `Failed to decode base64 or parse JSON from the provided parameter ${parameterName}`
            };
        }
    }

    /**
     * Validates that the decoded data is a valid JSON object
     */
    static validateJsonObject(data: any, parameterName: string = 'parameter'): ValidationResult {
        if (!data || typeof data !== 'object') {
            return {
                isValid: false,
                error: `Decoded parameter ${parameterName} is not a valid JSON object`
            };
        }

        return {
            isValid: true,
            data: data
        };
    }

    /**
     * Combined validation for base64 encoded JSON data
     */
    static validateBase64JsonData(data: string, parameterName: string = 'data'): ValidationResult {
        // Check if parameter exists and is not empty
        const notEmptyResult = this.validateNotEmpty(data, parameterName);
        if (!notEmptyResult.isValid) {
            return notEmptyResult;
        }

        // Check if it's valid base64
        const base64Result = this.validateBase64(data, parameterName);
        if (!base64Result.isValid) {
            return base64Result;
        }

        // Convert base64 to JSON
        const jsonResult = this.base64ToJson(data, parameterName);
        if (!jsonResult.isValid) {
            return jsonResult;
        }

        // Validate that it's a proper JSON object
        const objectResult = this.validateJsonObject(jsonResult.data, parameterName);
        if (!objectResult.isValid) {
            return objectResult;
        }

        return {
            isValid: true,
            data: objectResult.data
        };
    }
}