// pages/api/chapter/[hash]/[imageName].ts

import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

export type GetParams = {
  params: {
    hash: string;
    imageName: string;
  };
};

export async function GET(_: NextRequest, { params }: GetParams) {
  const { hash, imageName } = params;
  const url = `https://uploads.mangadex.org/data/${hash}/${imageName}`;

  try {
    const fetchResponse = await fetch(url);

    if (!fetchResponse.ok) {
      throw new Error("Failed to fetch the image");
    }

    // Read the image data into a buffer
    const arrayBuffer = await fetchResponse.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Transform the image to WebP format using sharp
    const transformedBuffer = await sharp(buffer).webp().toBuffer();

    return new NextResponse(transformedBuffer, {
      headers: {
        "Content-Type": "image/webp",
        "Content-Length": transformedBuffer.length.toString(),
      },
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: (error as any).message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
