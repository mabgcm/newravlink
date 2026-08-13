import { getVercelOidcToken } from "@vercel/oidc";
import { applicationDefault, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import { rename, writeFile } from "node:fs/promises";
import process from "node:process";

const credentialsPath = `/tmp/ravlink-google-credentials-${process.pid}.json`;
const tokenPath = `/tmp/ravlink-vercel-oidc-${process.pid}.jwt`;

async function firebaseApp() {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const storageBucket = process.env.FIREBASE_STORAGE_BUCKET;
  const projectNumber = process.env.GCP_PROJECT_NUMBER;
  const serviceAccountEmail = process.env.GCP_SERVICE_ACCOUNT_EMAIL;
  const poolId = process.env.GCP_WORKLOAD_IDENTITY_POOL_ID;
  const providerId = process.env.GCP_WORKLOAD_IDENTITY_POOL_PROVIDER_ID;
  if (![projectId, storageBucket, projectNumber, serviceAccountEmail, poolId, providerId].every(Boolean)) {
    throw new Error("Firebase OIDC configuration is incomplete");
  }

  const providerResource = `//iam.googleapis.com/projects/${projectNumber}/locations/global/workloadIdentityPools/${poolId}/providers/${providerId}`;
  const tokenAudience = `https:${providerResource}`;
  const token = await getVercelOidcToken({ audience: tokenAudience });
  const nextTokenPath = `${tokenPath}.next`;
  await writeFile(nextTokenPath, token, { mode: 0o600 });
  await rename(nextTokenPath, tokenPath);

  if (getApps().length) return getApps()[0];
  await writeFile(credentialsPath, JSON.stringify({
    type: "external_account",
    audience: providerResource,
    subject_token_type: "urn:ietf:params:oauth:token-type:jwt",
    token_url: "https://sts.googleapis.com/v1/token",
    service_account_impersonation_url: `https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts/${serviceAccountEmail}:generateAccessToken`,
    credential_source: {
      file: tokenPath,
      format: { type: "text" },
    },
  }), { mode: 0o600 });
  process.env.GOOGLE_APPLICATION_CREDENTIALS = credentialsPath;
  process.env.GOOGLE_CLOUD_PROJECT = projectId;
  return initializeApp({ credential: applicationDefault(), projectId, storageBucket });
}

export const db = async () => getFirestore(await firebaseApp());
export const bucket = async () => getStorage(await firebaseApp()).bucket();
