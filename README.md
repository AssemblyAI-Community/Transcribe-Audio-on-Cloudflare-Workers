# Transcribe audio to text on Cloudflare Workers with AssemblyAI, Node.js, and TypeScript

This repository is the source code for following the guide to [Transcribe audio to text on Cloudflare Workers with AssemblyAI, Node.js, and TypeScript](https://www.assemblyai.com/blog).

You can deploy the project to Cloudflare Workers with the button below.

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/Swimburger/Transcribe-Audio-on-Cloudflare-Workers)

After deploying the Worker, you need to configure the AssemblyAI API key as an environment variable/secret, named `ASSEMBLYAI_API_KEY`. [Follow this guide to configure the secret using the Cloudflare Dashboard](https://developers.cloudflare.com/workers/configuration/environment-variables/#add-environment-variables-via-the-dashboard) or [use Wrangler](https://developers.cloudflare.com/workers/configuration/environment-variables/#secrets-on-deployed-workers).
