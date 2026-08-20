import assert from "node:assert/strict";
import test from "node:test";
import { externalRequestUrl } from "./http.js";

test("externalRequestUrl restores Twilio callback encoding and parameter order", () => {
  const req = {
    headers: {
      "x-forwarded-proto": "https",
      "x-forwarded-host": "ravlink.ca",
    },
    query: {
      callId: "95d1e084-ed8e-44be-bd70-071457e18586",
      to: "+14372196444",
      agent: "tdelainemedel@gmail.com",
    },
  };

  assert.equal(
    externalRequestUrl(req, "/api/caller/status", ["callId", "to", "agent"]),
    "https://ravlink.ca/api/caller/status?callId=95d1e084-ed8e-44be-bd70-071457e18586&to=%2B14372196444&agent=tdelainemedel%40gmail.com",
  );
});

test("externalRequestUrl does not double-encode Vercel query values", () => {
  const req = {
    headers: {
      "x-forwarded-proto": "https",
      "x-forwarded-host": "ravlink.ca",
    },
    query: {
      callId: "95d1e084-ed8e-44be-bd70-071457e18586",
      to: "%2B14372196444",
      agent: "tdelainemedel%40gmail.com",
    },
  };

  assert.equal(
    externalRequestUrl(req, "/api/caller/recording", ["callId", "to", "agent"]),
    "https://ravlink.ca/api/caller/recording?callId=95d1e084-ed8e-44be-bd70-071457e18586&to=%2B14372196444&agent=tdelainemedel%40gmail.com",
  );
});

test("externalRequestUrl uses the first forwarded proxy value", () => {
  const req = {
    headers: {
      "x-forwarded-proto": "https, http",
      "x-forwarded-host": "ravlink.ca, internal.vercel.app",
    },
    query: {},
  };

  assert.equal(externalRequestUrl(req, "/api/caller/recording"), "https://ravlink.ca/api/caller/recording");
});
