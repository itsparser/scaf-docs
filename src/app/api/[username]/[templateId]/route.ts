import { NextResponse } from "next/server";
import { TemplateService } from "@/services/template.service";
import { InfoService } from "@/services/info.service";

export async function GET(
  request: Request,
  { params }: { params: { username: string; templateId: string } }
) {
  try {
    const { username, templateId } = await params;

    // Get templates with pagination
    const template = await TemplateService.getTemplateById(
      `${username}/${templateId}`
    );
    console.log("template", template);
    const info = await InfoService.getInfoById(
      `${username}/${templateId}:latest`
    );

    return NextResponse.json(
      {
        template,
        info,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching templates with info:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: { username: string; templateId: string } }
) {
  try {
    const { username, templateId } = await params;

    const template = await TemplateService.getTemplateById(
      `${username}/${templateId}`
    );
    if (!template) {
      return NextResponse.json(
        { error: "Template not found" },
        { status: 404 }
      );
    }
    const body = await request.json();

    const infos = await InfoService.updateInfo(
      `${username}/${templateId}:latest`,
      body
    );

    return NextResponse.json(infos, { status: 200 });
  } catch (error) {
    console.error("Error fetching template info:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
