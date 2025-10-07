import sharp from 'sharp';

export const runtime = 'nodejs';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('image');

    if (!file) {
      return new Response(JSON.stringify({ error: 'Файл не знайдено' }), {
        status: 400,
      });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const metadata = await sharp(buffer).metadata();
    const originalWidth = metadata.width;

    if (!originalWidth) {
      return new Response(
        JSON.stringify({ error: 'Image width is note defined' }),
        {
          status: 400,
        }
      );
    }

    // 4️⃣ Створюємо дві версії — 1x (половина ширини) та 2x (оригінал)
    const width1x = Math.floor(originalWidth / 2);
    const width2x = originalWidth;

    const ext = 'webp';
    const baseName = file.name
      .split('.')
      .reverse()
      .slice(1)
      .reverse()
      .join('.');

    const image1x = await sharp(buffer)
      .resize({ width: width1x }) // можна задати потрібну ширину
      .toFormat(ext)
      .toBuffer();

    const image2x = await sharp(buffer)
      .resize({ width: width2x })
      .toFormat(ext)
      .toBuffer();

    const responsePayload = [
      {
        name: `${baseName}@1x.${ext}`,
        data: `data:image/jpeg;base64,${image1x.toString('base64')}`,
      },
      {
        name: `${baseName}@2x.${ext}`,
        data: `data:image/jpeg;base64,${image2x.toString('base64')}`,
      },
    ];

    // return NextResponse.json('Response OK');
    return new Response(JSON.stringify(responsePayload), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
    });
  }
}
