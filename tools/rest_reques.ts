/*
	This file would be saved at src\functions\OpalToolFunction.ts in a repo forked from https://github.com/ZaiusInc/opal-tool-sample-app/tree/main/src
	the public discovery of this tool can be found at: 	https://function.zaius.app/opal_rest_tools/opal_tool/ef01315c-f417-49b5-a8f2-2fa9bbc9721b/discovery
	published with npm run publish ("deploy": "yarn build && ocp app prepare --bump-dev-version --publish") after installing and authenticating with ocp cli
*/

import { logger } from "@zaiusinc/app-sdk";
import {
	ToolFunction,
	tool,
	ParameterType,
} from "@optimizely-opal/opal-tool-ocp-sdk";

interface RestRequestParameters {
	url: string;
	method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
	headers?: Record<string, string>;
	body?: string | Record<string, any>;
	authType?: "bearer" | "basic" | "none";
	bearerToken?: string;
	basicUsername?: string;
	basicPassword?: string;
}

/**
 * OpalToolFunction class that implements REST API request tools
 */
export class OpalToolFunction extends ToolFunction {
	/**
	 * Generic REST API request tool
	 */
	@tool({
		name: "rest_request",
		description:
			// eslint-disable-next-line max-len
			"Make HTTP REST API requests with various methods (GET, POST, PUT, PATCH, DELETE), custom headers, and authentication options",
		endpoint: "/rest-request",
		parameters: [
			{
				name: "url",
				type: ParameterType.String,
				description: "The full URL to make the request to",
				required: true,
			},
			{
				name: "method",
				type: ParameterType.String,
				description:
					"HTTP method to use (GET, POST, PUT, PATCH, DELETE)",
				required: true,
			},
			{
				name: "headers",
				type: "object" as any,
				description:
					"Additional headers to include in the request (key-value pairs)",
				required: false,
			},
			{
				name: "body",
				type: "object" as any,
				description:
					"Request body for POST, PUT, PATCH requests. Can be a JSON object or string",
				required: false,
			},
			{
				name: "authType",
				type: ParameterType.String,
				description:
					'Authentication type: "bearer", "basic", or "none"',
				required: false,
			},
			{
				name: "bearerToken",
				type: ParameterType.String,
				description:
					'Bearer token for authentication (when authType is "bearer")',
				required: false,
			},
			{
				name: "basicUsername",
				type: ParameterType.String,
				description:
					'Username for basic authentication (when authType is "basic")',
				required: false,
			},
			{
				name: "basicPassword",
				type: ParameterType.String,
				description:
					'Password for basic authentication (when authType is "basic")',
				required: false,
			},
		],
	})
	public async restRequest(params: RestRequestParameters) {
		logger.info("REST request called with parameters:", params);

		const {
			url,
			method,
			headers = {},
			body,
			authType = "none",
			bearerToken,
			basicUsername,
			basicPassword,
		} = params;

		try {
			new URL(url);
		} catch (error) {
			logger.error("Invalid URL provided:", url);
			return {
				success: false,
				error: "Invalid URL format",
				details:
					error instanceof Error ? error.message : "Unknown error",
			};
		}

		const requestHeaders: Record<string, string> = { ...headers };

		if (authType === "bearer" && bearerToken) {
			requestHeaders["Authorization"] = `Bearer ${bearerToken}`;
		} else if (authType === "basic" && basicUsername && basicPassword) {
			const credentials = Buffer.from(
				`${basicUsername}:${basicPassword}`
			).toString("base64");
			requestHeaders["Authorization"] = `Basic ${credentials}`;
		}

		let requestBody: string | undefined;
		if (body) {
			if (typeof body === "object") {
				requestHeaders["Content-Type"] =
					requestHeaders["Content-Type"] || "application/json";
				requestBody = JSON.stringify(body);
			} else {
				requestBody = String(body);
			}
		}

		try {
			logger.info(`Making ${method} request to ${url}`);

			const response = await fetch(url, {
				method,
				headers: requestHeaders,
				body: requestBody,
			});

			const contentType = response.headers.get("content-type");
			let responseData: any;

			if (contentType?.includes("application/json")) {
				try {
					responseData = await response.json();
				} catch (e) {
					logger.warn(e);
					responseData = await response.text();
				}
			} else {
				responseData = await response.text();
			}

			const result = {
				success: response.ok,
				status: response.status,
				statusText: response.statusText,
				headers: Object.fromEntries(response.headers.entries()),
				data: responseData,
			};

			logger.info(`Request completed with status ${response.status}`);
			return result;
		} catch (error) {
			logger.error("REST request failed:", error);
			return {
				success: false,
				error:
					error instanceof Error
						? error.message
						: "Unknown error occurred",
				details: error,
			};
		}
	}

	/**
	 * Simple GET request tool (convenience method)
	 */
	@tool({
		name: "get_request",
		description: "Make a simple GET request to retrieve data from an API",
		endpoint: "/get-request",
		parameters: [
			{
				name: "url",
				type: ParameterType.String,
				description: "The full URL to GET",
				required: true,
			},
			{
				name: "headers",
				type: "object" as any,
				description: "Optional headers to include",
				required: false,
			},
			{
				name: "bearerToken",
				type: ParameterType.String,
				description: "Optional bearer token for authentication",
				required: false,
			},
		],
	})
	public async getRequest(params: {
		url: string;
		headers?: Record<string, string>;
		bearerToken?: string;
	}) {
		return this.restRequest({
			url: params.url,
			method: "GET",
			headers: params.headers,
			authType: params.bearerToken ? "bearer" : "none",
			bearerToken: params.bearerToken,
		});
	}

	/**
	 * Simple POST request tool (convenience method)
	 */
	@tool({
		name: "post_request",
		description: "Make a POST request to send data to an API",
		endpoint: "/post-request",
		parameters: [
			{
				name: "url",
				type: ParameterType.String,
				description: "The full URL to POST to",
				required: true,
			},
			{
				name: "body",
				type: "object" as any,
				description: "The data to send in the request body",
				required: true,
			},
			{
				name: "headers",
				type: "object" as any,
				description: "Optional headers to include",
				required: false,
			},
			{
				name: "bearerToken",
				type: ParameterType.String,
				description: "Optional bearer token for authentication",
				required: false,
			},
		],
	})
	public async postRequest(params: {
		url: string;
		body: any;
		headers?: Record<string, string>;
		bearerToken?: string;
	}) {
		return this.restRequest({
			url: params.url,
			method: "POST",
			body: params.body,
			headers: params.headers,
			authType: params.bearerToken ? "bearer" : "none",
			bearerToken: params.bearerToken,
		});
	}
}
