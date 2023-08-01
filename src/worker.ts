import { IRequest, Router, json, html, error, text } from 'itty-router';
import { AssemblyAiClient } from './assemblyai';

const router = Router();

export interface Env {
  ASSEMBLYAI_API_KEY: string;
}

router.get('/', () => html(`<!DOCTYPE html>
<body>
  <form action="/upload-file" method="post" enctype="multipart/form-data">
    <label for="file">Upload an audio or video file:</label> <br>
    <input type="file" name="file" id="file" /><br>
    <button type="submit">Submit</button>
  </form>
</body>`))
  .post('/upload-file', async (request, env: Env) => {
    const formData = await request.formData();
    const file = formData.get('file') as unknown as File;

    const client = new AssemblyAiClient(env.ASSEMBLYAI_API_KEY);
    const uploadUrl = await client.uploadFile(file);
    let transcript = await client.createTranscript({ audio_url: uploadUrl });

    const newUrl = new URL(`/transcript/${transcript.id}`, request.url);
    return Response.redirect(newUrl.toString(), 303);
  })
  .get('/transcript/:id', async (request: IRequest, env: Env) => {
    const id = request.params.id;
    const client = new AssemblyAiClient(env.ASSEMBLYAI_API_KEY);
    const transcript = await client.getTranscript(id);
    if (transcript.status === 'completed') {
      return text(transcript.text);
    } else {
      return text(transcript.status, {
        headers: {
          'Refresh': '3' // refreshes the browser every 3 seconds
        }
      });
    }
  });

export default {
  fetch: (req: IRequest, ...args: any) => router
    .handle(req, ...args)
    .then(json)
    .catch(error)
};