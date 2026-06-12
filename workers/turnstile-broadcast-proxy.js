const TURNSTILE_SITEVERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const ROD_BROADCAST_URL = "https://api.spacexpanse.org:1234/broadcast";
const REQUIRED_ACTION = "rod-broadcast";
const INDEX_PATHNAME = "/index.html";

export default {
	async fetch(request, env) {
		const requestUrl = new URL(request.url);

		if (requestUrl.pathname !== "/broadcast") {
			return serveStaticAsset(request, env);
		}

		const corsHeaders = buildCorsHeaders(request, env);

		if (request.method === "OPTIONS") {
			return new Response(null, {
				status: 204,
				headers: corsHeaders
			});
		}

		if (request.method !== "POST") {
			return jsonResponse({
				success: false,
				response: "Method not allowed"
			}, 405, corsHeaders);
		}

		if (!env.TURNSTILE_SECRET) {
			return jsonResponse({
				success: false,
				response: "Turnstile secret is not configured"
			}, 500, corsHeaders);
		}

		let payload;
		try {
			payload = await request.json();
		} catch (error) {
			return jsonResponse({
				success: false,
				response: "Invalid JSON body"
			}, 400, corsHeaders);
		}

		const token = typeof payload.token === "string" ? payload.token.trim() : "";
		const rawTransaction = typeof payload.raw === "string" ? payload.raw.trim() : "";
		const action = typeof payload.action === "string" ? payload.action.trim() : "";

		if (!token) {
			return jsonResponse({
				success: false,
				response: "Missing Turnstile token"
			}, 400, corsHeaders);
		}

		if (!rawTransaction) {
			return jsonResponse({
				success: false,
				response: "Missing raw transaction"
			}, 400, corsHeaders);
		}

		if (action && action !== REQUIRED_ACTION) {
			return jsonResponse({
				success: false,
				response: "Invalid Turnstile action"
			}, 400, corsHeaders);
		}

		const turnstileResult = await validateTurnstileToken(token, request, env);
		if (!turnstileResult.success) {
			return jsonResponse({
				success: false,
				response: formatTurnstileFailure(turnstileResult)
			}, 403, corsHeaders);
		}

		if (turnstileResult.action && turnstileResult.action !== REQUIRED_ACTION) {
			return jsonResponse({
				success: false,
				response: "Turnstile action mismatch"
			}, 403, corsHeaders);
		}

		let broadcastResponse;
		try {
			broadcastResponse = await fetch(ROD_BROADCAST_URL, {
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				},
				body: `raw=${encodeURIComponent(rawTransaction)}`
			});
		} catch (error) {
			return jsonResponse({
				success: false,
				response: "ROD broadcast upstream is unreachable"
			}, 502, corsHeaders);
		}

		const broadcastText = await broadcastResponse.text();
		return new Response(broadcastText, {
			status: broadcastResponse.status,
			headers: {
				"Content-Type": broadcastResponse.headers.get("content-type") || "application/json",
				...corsHeaders
			}
		});
	}
};

async function serveStaticAsset(request, env) {
	if (!env.ASSETS || typeof env.ASSETS.fetch !== "function") {
		return new Response("Cloudflare static assets binding \"ASSETS\" is unavailable. Deploy this Worker with [`wrangler.jsonc`](wrangler.jsonc) so the assets binding is attached.", {
			status: 500,
			headers: {
				"Content-Type": "text/plain; charset=utf-8"
			}
		});
	}

	const assetResponse = await env.ASSETS.fetch(request);
	if (assetResponse.status !== 404 || !shouldServeSpaShell(request)) {
		return assetResponse;
	}

	const spaUrl = new URL(request.url);
	spaUrl.pathname = INDEX_PATHNAME;
	spaUrl.search = "";

	const spaRequest = new Request(spaUrl.toString(), {
		method: "GET",
		headers: request.headers
	});

	return env.ASSETS.fetch(spaRequest);
}

function shouldServeSpaShell(request) {
	if (request.method !== "GET" && request.method !== "HEAD") {
		return false;
	}

	const requestUrl = new URL(request.url);
	if (requestUrl.pathname === "/broadcast") {
		return false;
	}

	return !pathLooksLikeStaticFile(requestUrl.pathname);
}

function pathLooksLikeStaticFile(pathname) {
	const lastSegment = pathname.split("/").pop() || "";
	return lastSegment.includes(".");
}

async function validateTurnstileToken(token, request, env) {
	const formData = new FormData();
	formData.append("secret", env.TURNSTILE_SECRET);
	formData.append("response", token);

	const clientIpAddress = request.headers.get("CF-Connecting-IP");
	if (clientIpAddress) {
		formData.append("remoteip", clientIpAddress);
	}

	const response = await fetch(TURNSTILE_SITEVERIFY_URL, {
		method: "POST",
		body: formData
	});

	return response.json();
}

function buildCorsHeaders(request, env) {
	const requestOrigin = request.headers.get("Origin") || "";
	const allowedOrigin = env.ALLOWED_ORIGIN || requestOrigin || "*";

	return {
		"Access-Control-Allow-Origin": allowedOrigin,
		"Access-Control-Allow-Methods": "POST, OPTIONS",
		"Access-Control-Allow-Headers": "Content-Type",
		"Vary": "Origin"
	};
}

function formatTurnstileFailure(turnstileResult) {
	const errorCodes = Array.isArray(turnstileResult["error-codes"]) ? turnstileResult["error-codes"].join(", ") : "verification failed";
	return `Turnstile validation failed: ${errorCodes}`;
}

function jsonResponse(payload, status, corsHeaders) {
	return new Response(JSON.stringify(payload), {
		status,
		headers: {
			"Content-Type": "application/json",
			...corsHeaders
		}
	});
}
