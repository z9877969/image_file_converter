export const runtime = 'nodejs';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('image');

    if (!file) {
      return new Response(JSON.stringify({ error: 'File not found' }), {
        status: 400,
      });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { Transformer } = await import('@napi-rs/image');

    const image = new Transformer(buffer);

    const metadata = await image.metadata();
    const originalWidth = metadata.width;

    if (!originalWidth) {
      return new Response(
        JSON.stringify({ error: 'Image width is not defined' }),
        { status: 400 }
      );
    }

    const ext = 'webp';
    const baseName = file.name
      .split('.')
      .reverse()
      .slice(1)
      .reverse()
      .join('.');
    const width1x = Math.floor(originalWidth / 2);
    const width2x = originalWidth;

    const image1xBuffer = await image.resize({ width: width1x })[ext]();

    const image2xBuffer = await image.resize({ width: width2x })[ext]();
    const contentType = `image/${ext}`;

    const responsePayload = [
      {
        name: `${baseName}@1x.${ext}`,
        data: `data:${contentType};base64,${image1xBuffer.toString('base64')}`,
      },
      {
        name: `${baseName}@2x.${ext}`,
        data: `data:${contentType};base64,${image2xBuffer.toString('base64')}`,
      },
    ];

    return new Response(JSON.stringify(responsePayload), {
      status: 200,
      headers: { 'Content-Type': `${contentType}` },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message ?? 'Server error' }),
      {
        status: error.status ?? 500,
      }
    );
  }
}
